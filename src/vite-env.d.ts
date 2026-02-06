declare interface ImportMetaEnv {
  VITE_API_AVAILABLE_TICKERS: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TICKERS_ENDPOINT: string;
  readonly VITE_API_PRICES: string;
  readonly VITE_API_SENTIMENT: string;
  readonly VITE_API_VALID_PARAMETER_OPTIONS: string;
  readonly VITE_API_MOVING_AVERAGE: string;
  readonly VITE_API_CORE_METRICS: string;
  readonly VITE_API_TREND_METRICS: string;
  readonly VITE_API_CORRELATION_METRICS: string;
  readonly VITE_API_DRAWDOWN_METRICS: string;
  readonly VITE_API_COMPANY_INFO: string;
  readonly VITE_API_RECOMMENDATIONS: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
