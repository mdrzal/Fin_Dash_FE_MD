export interface AvailableTicker {
	symbol: string;
	name: string;
}

export interface AvailableTickersResponse {
	tickers: AvailableTicker[];
}
