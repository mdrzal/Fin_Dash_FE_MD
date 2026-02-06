export interface CorrelationMetricsRequest {
  symbol: string;
  benchmark: string;
  period_months: number;
  interval: string;
}