# prom-client-timer-unit

[![CircleCI](https://circleci.com/gh/fresh8/prom-client-timer-unit.svg?style=svg)](https://circleci.com/gh/fresh8/prom-client-timer-unit)
[![Coverage Status](https://coveralls.io/repos/github/fresh8/prom-client-timer-unit/badge.svg?branch=master)](https://coveralls.io/github/fresh8/prom-client-timer-unit?branch=master)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A helper function to help record time in other units than seconds. 
It really just divides the time measurment (in seconds) by whatever number you give it.

## Usage

### At a glance
#### Javascript
```js
const myMetric = require('prom-client').Histogram()
const startTimer = require('@fresh8/prom-client-timer-unit')

const stopTimer = startTimer(myMetric, 1e-3)
// [...] your code doing things
stopTimer() //will calculate the time elapsed and register it in `myMetric`
```

#### Typescript
```ts
import * as promClient from 'prom-client'
import * as startTimer from '@fresh8/prom-client-timer-unit'

const myMetric = promClient.Histogram()
const stopTimer = startTimer(myMetric, 1e-3)
// [...] your code doing things
stopTimer() //will calculate the time elapsed and register it in `myMetric`
```

### API
#### startTimer(metric, factor, labels)
* **metric** : your metric straight from `prom-client` (e.g: `new promClient.Histogram(opts)`)
* **factor** (optional): The factor to be applied to the observed number of seconds. Examples: `1e-3` for milliseconds, `60` for minutes. Defaults to `1`
* **labels** (optional): labels to apply to the observation. This is to follow the same signature as the original `startTimer` function in `prom-client`. Defaults to `{}`
* returns: stopTimer

Start counting time using `process.hrtime`.

#### stopTimer(labels)
* **labels** : labels to apply to the observation. They will be merged with the labels given to `startTimer` (if any). Defaults to `{}`

Stops the timer and record the elapsed time in the metric given to `startTimer`, dividing the default time (in seconds) by the provided `factor`.

## Credits
Implementation very heavily inspired from the [original in prom-client](https://github.com/siimon/prom-client/blob/4c5b6c73ca5bea6889e77f61ef4b99b5e0250d7a/lib/summary.js#L180)
