export interface PeriodMonthsRange {
    min: number;
    max: number;
}

export interface ValidParameterOptionsResponse {
    intervals: string[];
    period_months: PeriodMonthsRange;
    ma_windows: number[];
}