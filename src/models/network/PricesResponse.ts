export interface PricePoint {
  price: number;
  date: string;
}

export interface PricesResponse {
  prices: PricePoint[];
}
