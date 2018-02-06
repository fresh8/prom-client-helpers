const { assert, expect } = require('chai')

const startTimer = require('./index')

class MetricMock {
  constructor() {
    this.startTimer = 'truthy'
  }

  observe(...args) {
    this.observed = args
  }
}

describe('startTimer', () => {
  it('Is defined', () => {
    assert.isDefined(startTimer)
  })

  it('returns a function', () => {
    expect(startTimer).to.be.a('function')
  })

  it('throws when missing arguments', () => {
    expect(startTimer).to.throw('Invalid metric')
  })

  it('throws when first arguments is invalid', () => {
    expect(startTimer).to.throw('Invalid metric')
    expect(startTimer.bind(null, {})).to.throw('Invalid metric')
    expect(startTimer.bind(null, { startTimer: 'truthy' })).to.throw(
      'Invalid metric'
    )
    expect(startTimer.bind(null, { observe: 'truthy' })).to.throw(
      'Invalid metric'
    )
  })

  describe('stop', () => {
    it('is a function', () => {
      const stop = startTimer(new MetricMock())
      expect(stop).to.be.a('function')
    })

    it('observe elapsed time', () => {
      const metric = new MetricMock()
      const stop = startTimer(metric)
      stop()
      assert.isDefined(metric.observed)
      expect(metric.observed.length).to.equal(2)
      expect(metric.observed[1]).to.be.greaterThan(0)
    })

    it('defaults factor to seconds', done => {
      const metric = new MetricMock()
      const stop = startTimer(metric)
      setTimeout(() => {
        stop()
        expect(metric.observed[1])
          .to.be.above(0.28)
          .and.below(0.5)
        done()
      }, 300)
    })

    it('applies custom factors', done => {
      //test in milliseconds
      const metric = new MetricMock()
      const stop = startTimer(metric, 1e-3)
      setTimeout(() => {
        stop()
        expect(metric.observed[1])
          .to.be.above(280)
          .and.below(500)
        done()
      }, 300)
    })

    it('applies both start and end labels', () => {
      const metric = new MetricMock()
      const stop = startTimer(metric, undefined, { start: 'yup' })
      stop({ end: 'already' })
      expect(metric.observed[0]).to.deep.equal({ start: 'yup', end: 'already' })
    })

    it('returns the elapsed time and labels', () => {
      const metric = new MetricMock()
      const stop = startTimer(metric, undefined, { start: 'yup' })
      const result = stop({ end: 'already' })
      expect(result).to.deep.equal({
        elapsed: metric.observed[1],
        labels: metric.observed[0]
      })
    })
  })
})
