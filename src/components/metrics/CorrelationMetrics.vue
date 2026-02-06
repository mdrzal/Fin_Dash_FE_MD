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
import type { CorrelationMetricsResponse } from 'models/network/CorrelationMetricsResponse';
const props = defineProps<{ metrics: CorrelationMetricsResponse; periodMonths?: number | undefined }>();

function formatKey(key: string): string {
    const labels: Record<string, string> = {
        correlation: `Correlation (${props.periodMonths ?? ''}m)`,
        beta: 'Beta',
    };
    return labels[key] ?? key;
}

function formatValue(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'N/A';
    if (typeof value !== 'number') return String(value);
    return value.toFixed(2);
}

function getValueColor(): string {
    return 'text-white';
}

function getCommentary(key: string, value: number | string | undefined): string {
    if (value === undefined) return 'No commentary available.';
    const v = typeof value === 'number' ? value : parseFloat(String(value));
    const commentary: Record<string, string> = {
        correlation: v > 0.5
            ? `The correlation is strong, indicating a significant relationship between the variables.`
            : v < -0.5
                ? `The correlation is negative, indicating an inverse relationship between the variables.`
                : `The correlation is weak or negligible.`,
        beta:
            v > 1
                ? 'The beta indicates the asset is more volatile than the market.'
                : v < 1
                    ? 'The beta indicates the asset is less volatile than the market.'
                    : 'The beta indicates the asset has similar volatility to the market.'
    };
    return commentary[key] ?? `The ${key} is ${value}`;
}



function getCalculationExplanation(key: string): string {
    const explanations: Record<string, string> = {
        correlation: 'Correlation measures the strength and direction of the relationship between the asset and the benchmark (S&P500).',
        beta: 'Beta measures the stock\'s sensitivity to benchmark movements.\n\nFormula:\nβ = Cov(stock returns, benchmark returns) / Var(benchmark returns)\n\nInterpretation:\n- Beta > 1: More volatile than the market\n- Beta < 1: Less volatile than the market'
    };
    return explanations[key] || 'No explanation available.';
}
</script>