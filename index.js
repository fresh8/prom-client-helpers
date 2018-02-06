const hrtime = require('process').hrtime

module.exports = function startTimer(metric, factor = 1, startLabels = {}) {
  if (!metric || !metric.startTimer || !metric.observe) {
    throw new Error(`Invalid metric provided to startTimer: ${metric}`)
  }

  const start = hrtime()

  return (endLabels = {}) => {
    const delta = hrtime(start)
    const elapsed = delta[0] / factor + delta[1] / factor / 1e9

    const labels = Object.assign({}, startLabels, endLabels)
    metric.observe(labels, elapsed)
    return { elapsed, labels }
  }
}
