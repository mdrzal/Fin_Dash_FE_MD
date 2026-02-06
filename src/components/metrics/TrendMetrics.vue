<template>
    <MetricGrid 
        :metrics="metrics as unknown as Record<string, any>" 
        grid-cols="2" 
        :formatKey="formatKey"
        :formatValue="formatValue" 
        :getValueColor="getValueColor" 
        :getCommentary="getCommentary"
        :getCalculationExplanation="getCalculationExplanation" />
</template>

<script setup lang="ts">
import MetricGrid from './MetricGrid.vue';
import type { TrendMetricsResponse } from '../../models/network/TrendMetricsResponse';

const props = defineProps<{ metrics: TrendMetricsResponse; periodMonths?: number | undefined }>();

function formatKey(key: string): string {
    const labels: Record<string, string> = {
        momentum_20d: 'Momentum (20 DAYS)',
        sma_gap: 'SMA Gap',
    };
    return labels[key] ?? key;
}

function formatValue(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'N/A';
    if (typeof value !== 'number') return String(value);
    return value.toFixed(2);
}

function getValueColor(key: string, value: number | string | undefined): string {
    if (key === 'momentum_20d') {
        return (value as number) >= 0 ? 'text-green-600' : 'text-red-600';
    }
    return 'text-white';
}

function getCommentary(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'No commentary available.';
    const v = typeof value === 'number' ? value : parseFloat(String(value));
    const commentary: Record<string, string> = {
        momentum_20d: v >= 0
            ? `The momentum is positive, indicating upward movement over the last 20 days.`
            : `The momentum is negative, indicating downward movement over the last 20 days.`,
        sma_gap: v >= 0
            ? `The SMA gap is ${v.toFixed(2)}, showing that the price is higher than the simple moving average.`
            : `The SMA gap is ${v.toFixed(2)}, showing that the price is lower than the simple moving average.`,
    };
    return commentary[key] ?? `The ${key} is ${value}`;
}

function getCalculationExplanation(key: string): string {
    const explanations: Record<string, string> = {
        momentum_20d: '20-day momentum measures the change in price over the last 20 days. It is calculated as the difference between the current price and the price 20 days ago.',
        sma_gap: 'SMA Gap is the difference between the current price and the simple moving average.',
    };
    return explanations[key] || 'No explanation available.';
}
</script>

<style scoped>
</style>