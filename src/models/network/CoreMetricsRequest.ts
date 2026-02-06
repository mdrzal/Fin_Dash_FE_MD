export interface CoreMetricsRequest {
  symbol: string;
  period_months: number;
  interval: string;
  rsi_period: number;
  ma_window: number;
}