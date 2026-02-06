export interface PreviewUrl {
  url: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
  previewUrl: PreviewUrl;
  vader_compound: number;
}

export interface SentimentResponse {
  mean_compound_last_24h: number;
  articles_last_24h: NewsArticle[];
}
