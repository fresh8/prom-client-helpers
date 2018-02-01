import * as PromClient from 'prom-client'

declare function startTimer(
  metric: PromClient.Histogram | PromClient.Gauge | PromClient.Summary,
  factor?: number,
  labels?: PromClient.labelValues
): stopTimer
declare function stopTimer(
  labels?: PromClient.labelValues
): void

declare namespace startTimer {
}
export  = startTimer
