import { SymbolRequest } from './SymbolRequest';

export interface PricesRequest extends SymbolRequest {
  period_months: number;
  interval: string;
}
