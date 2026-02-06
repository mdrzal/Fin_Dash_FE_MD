<template>
    <MetricGrid 
        :metrics="metrics as unknown as Record<string, any>" 
        grid-cols="3" 
        :formatKey="formatKey"
        :formatValue="formatValue" 
        :getValueColor="getValueColor" 
        :getCommentary="getCommentary"
        :getCalculationExplanation="getCalculationExplanation" />
</template>

<script setup lang="ts">
import MetricGrid from './MetricGrid.vue';
import type { CoreMetricsResponse } from '../../models/network/CoreMetricsResponse';
const props = defineProps<{ metrics: CoreMetricsResponse; periodMonths?: number }>();

function formatKey(key: string): string {
    const labels: Record<string, string> = {
        return_: `Return (${props.periodMonths ?? ''}m)`,
        volatility: `Volatility (${props.periodMonths ?? ''}m)`,
        rsi: 'RSI (14 days)',
        return_1m: '1-Month Return',
        return_3m: '3-Month Return',
        pe_ratio: 'P/E Ratio',
    };
    return labels[key] ?? key;
}

function formatValue(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'N/A';
    if (typeof value !== 'number') return String(value);
    if (key.startsWith('return')) return `${(value * 100).toFixed(2)}%`;
    return value.toFixed(2);
}

function getValueColor(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'text-gray-400';
    if (key.startsWith('return')) {
        return (value as number) >= 0 ? 'text-green-600' : 'text-red-600';
    }
    return 'text-white';
}

function getCommentary(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'No commentary available.';
    const v = typeof value === 'number' ? value : parseFloat(String(value));
    const commentary: Record<string, string> = {
        return_: v >= 0
            ? 'The overall return is positive, indicating growth in value.'
            : 'The overall return is negative, indicating a decline in value.',
        volatility: `Volatility of ${v.toFixed(2)} indicates how widely the price has fluctuated.`,
        rsi:
            v < 30
                ? 'The RSI indicates the asset is oversold, possibly a buying opportunity.'
                : v > 70
                    ? 'The RSI indicates the asset is overbought, possibly a selling opportunity.'
                    : 'The RSI is in a neutral range.',
        return_1m:
            v >= 0
                ? 'Short-term (1-month) performance is positive.'
                : 'Short-term (1-month) performance is negative.',
        return_3m:
            v >= 0
                ? 'Medium-term (3-month) performance is positive.'
                : 'Medium-term (3-month) performance is negative.',
        pe_ratio: `A P/E ratio of ${v.toFixed(2)} indicates how much investors are willing to pay per unit of earnings.`,
    };
    return commentary[key] ?? '';
}

function getCalculationExplanation(key: string): string {
    const explanations: Record<string, string> = {
        return_: 'Calculated as the percentage change in price over the selected period.',
        volatility:
            'Volatility is the standard deviation of price returns. It measures how much returns fluctuate; higher values imply greater risk and variability.',
        rsi:
            'RSI compares average gains and losses over 14 days to indicate overbought or oversold conditions. RSI = 100 − (100 / (1 + RS)), where RS = avg gain / avg loss.',
        return_1m: '1-month return represents the percentage price change over the last month.',
        return_3m: '3-month return represents the percentage price change over the last three months.',
        pe_ratio:
            'Price-to-Earnings ratio is calculated as current price divided by earnings per share, indicating how highly the market values the company’s earnings.',
    };
    return explanations[key] ?? 'No explanation available for this metric.';
}
</script>
