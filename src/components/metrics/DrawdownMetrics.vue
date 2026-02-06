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
import type { DrawdownMetricsResponse } from 'models/network/DrawdownMetricsResponse';

const props = defineProps<{ metrics: DrawdownMetricsResponse; periodMonths?: number | undefined }>();

function formatKey(key: string): string {
    const labels: Record<string, string> = {
        max_drawdown_pct: `Max Drawdown (${props.periodMonths ?? ''}m)`,
        recovery_days: 'Recovery Days',
    };
    return labels[key] ?? key;
}

function formatValue(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'N/A';
    if(key === 'max_drawdown_pct' && typeof value === 'number') {
        return `${(value).toFixed(2)}%`;
    }
    if(key === 'recovery_days' && typeof value === 'number') {
        return `${value.toFixed(0)}`;
    }
    if (typeof value !== 'number') return String(value);
    return value.toFixed(2);
}

function getValueColor(key: string, value: number | string | undefined): string {
    return 'text-white';
}

function getCommentary(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'No commentary available.';
    const v = typeof value === 'number' ? value : parseFloat(String(value));
    const commentary: Record<string, string> = {
        max_drawdown_pct: 'Percentage loss from the peak.',
        recovery_days: `It took ${v.toFixed(0)} days to recover from the maximum drawdown.`,
    };
    return commentary[key] ?? `The ${key} is ${value}`;
}

function getCalculationExplanation(key: string): string {
    const explanations: Record<string, string> = {
        max_drawdown_pct: 'Max Drawdown is calculated as the largest drop from a peak to a trough during the selected period. It is expressed as a percentage of the peak value.',
        recovery_days: 'Recovery Days is the duration required to return to the previous peak value after a drawdown.',
    };
    return explanations[key] || 'No calculation explanation available.';
}
</script>

<style scoped>
</style>