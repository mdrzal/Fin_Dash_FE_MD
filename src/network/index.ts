import { BaseApiService } from "./api";
import { AvailableTickersQuery } from "../models/network/AvailableTickersQuerry";
import { AvailableTickersResponse } from "../models/network/AvailableTickersResponse";
import { ValidParameterOptionsResponse } from "../models/network/ValidParameterOptionsResponse";
import type { PricesRequest } from '../models/network/PricesRequest';
import type { PricesResponse } from '../models/network/PricesResponse';
import type { SentimentRequest } from '../models/network/SentimentRequest';
import type { SentimentResponse } from '../models/network/SentimentResponse';
import type { MovingAverageRequest, MovingAverageResponse } from '../models/network/MovingAverage';
import type { CoreMetricsRequest } from '../models/network/CoreMetricsRequest';
import type { CoreMetricsResponse } from '../models/network/CoreMetricsResponse';
import type { TrendMetricsRequest } from '../models/network/TrendMetricsRequest';
import type { TrendMetricsResponse } from '../models/network/TrendMetricsResponse';
import type { CorrelationMetricsRequest } from '../models/network/CorrelationMetricsRequest';
import type { CorrelationMetricsResponse } from '../models/network/CorrelationMetricsResponse';
import type { DrawdownMetricsRequest } from '../models/network/DrawdownMetricsRequest';
import type { DrawdownMetricsResponse } from '../models/network/DrawdownMetricsResponse';
import type { CompanyInfoRequest } from '../models/network/CompanyInfoRequest';
import type { CompanyInfoResponse } from '../models/network/CompanyInfoResponse';
import type { RecommendationsRequest } from '../models/network/RecommendationsRequest';
import type { RecommendationsResponse } from '../models/network/RecommendationsResponse';

const AVAILABLE_TICKERS_ENDPOINT = import.meta.env.VITE_API_AVAILABLE_TICKERS as string;
const PRICES_ENDPOINT = import.meta.env.VITE_API_PRICES as string;
const SENTIMENT_ENDPOINT = import.meta.env.VITE_API_SENTIMENT as string;
const VALID_PARAMETER_OPTIONS_ENDPOINT = import.meta.env.VITE_API_VALID_PARAMETER_OPTIONS as string;
const MOVING_AVERAGE_ENDPOINT = import.meta.env.VITE_API_MOVING_AVERAGE as string;
const CORE_METRICS_ENDPOINT = import.meta.env.VITE_API_CORE_METRICS as string;
const TREND_METRICS_ENDPOINT = import.meta.env.VITE_API_TREND_METRICS as string;
const CORRELATION_METRICS_ENDPOINT = import.meta.env.VITE_API_CORRELATION_METRICS as string;
const DRAWDOWN_METRICS_ENDPOINT = import.meta.env.VITE_API_DRAWDOWN_METRICS as string;
const COMPANY_INFO_ENDPOINT = import.meta.env.VITE_API_COMPANY_INFO as string;
const RECOMMENDATIONS_ENDPOINT = import.meta.env.VITE_API_RECOMMENDATIONS as string;

export const tickersService = new BaseApiService<AvailableTickersQuery, AvailableTickersResponse>(
  AVAILABLE_TICKERS_ENDPOINT
);

export const pricesService = new BaseApiService<PricesRequest, PricesResponse>(
    PRICES_ENDPOINT
);

export const sentimentService = new BaseApiService<SentimentRequest, SentimentResponse>(
    SENTIMENT_ENDPOINT
);

export const validParameterOptionsService = new BaseApiService<null, ValidParameterOptionsResponse>(
  VALID_PARAMETER_OPTIONS_ENDPOINT
);

export const movingAverageService = new BaseApiService<MovingAverageRequest, MovingAverageResponse>(
  MOVING_AVERAGE_ENDPOINT
);

export const coreMetricsService = new BaseApiService<CoreMetricsRequest, CoreMetricsResponse>(
  CORE_METRICS_ENDPOINT
);

export const trendMetricsService = new BaseApiService<TrendMetricsRequest, TrendMetricsResponse>(
  TREND_METRICS_ENDPOINT
);

export const correlationMetricsService = new BaseApiService<CorrelationMetricsRequest, CorrelationMetricsResponse>(
  CORRELATION_METRICS_ENDPOINT
);

export const drawdownMetricsService = new BaseApiService<DrawdownMetricsRequest, DrawdownMetricsResponse>(
  DRAWDOWN_METRICS_ENDPOINT
);

export const companyInfoService = new BaseApiService<CompanyInfoRequest, CompanyInfoResponse>(
  COMPANY_INFO_ENDPOINT
);

export const recommendationsService = new BaseApiService<RecommendationsRequest, RecommendationsResponse[]>(
  RECOMMENDATIONS_ENDPOINT
);