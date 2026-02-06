import { NewsArticle } from './NewsArticle';

export interface SentimentResponse {
  mean_compound_last_24h: number;
  articles_last_24h: NewsArticle[];
}
