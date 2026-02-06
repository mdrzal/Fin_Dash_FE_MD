export interface MovingAverageRequest {
  symbol: string;
  period_months: number;
  interval: string; // '1d', '1h', '1wk'
  window: number;   // 10, 20, 50, 200
}

export interface MovingAveragePoint {
  price: number;
  date: string;
}

export interface MovingAverageResponse {
  moving_average: MovingAveragePoint[] | null;
}
