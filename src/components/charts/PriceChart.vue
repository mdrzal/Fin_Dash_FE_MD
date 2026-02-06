<template>
    <ChartContainer title="Price Chart">
        <template #chart>
            <Line v-if="chartData.datasets.length" ref="lineChartRef" :data="chartData" :options="chartOptions"
                class="w-full h-full" />
            <div v-else class="text-gray-400 text-center mt-10">
                No data available
            </div>

        </template>
    </ChartContainer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Line } from 'vue-chartjs';
import ChartContainer from './ChartContainer.vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import type { ChartOptions } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, zoomPlugin);

const props = defineProps<{
    prices: { prices: { price: number; date: string }[] } | null;
    movingAverage?: { moving_average: { price: number; date: string }[] | null } | null;
}>();

const lineChartRef = ref<any>(null);
const chartContainer = ref<HTMLElement | null>(null);

const chartData = computed(() => {
    if (!props.prices?.prices?.length) return { labels: [], datasets: [] };

    const labels = props.prices.prices.map(p => p.date);
    const datasets = [
        {
            label: 'Price (USD)',
            data: props.prices.prices.map(p => p.price),
            borderColor: '#2563eb',
            backgroundColor: 'rgba(37,99,235,0.2)',
            tension: 0.2,
            fill: true,
            pointRadius: 0
        }
    ];

    const ma = props.movingAverage?.moving_average ?? [];
    if (ma.length > 0) {
        const maMap = Object.fromEntries(ma.map(p => [p.date, p.price]));
        const maData = labels.map(date => (maMap.hasOwnProperty(date) ? maMap[date] : null));

        datasets.push({
            label: 'Moving Average (USD)',
            //@ts-ignore
            data: maData,
            borderColor: '#f59e42',
            backgroundColor: 'rgba(245,158,66,0.1)',
            tension: 0.2,
            fill: true,
            pointRadius: 0
        });
    }

    return { labels, datasets };
});

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: true,
            position: 'bottom',
            labels: {
                color: '#fff',
                font: { weight: 'bold', size: 14 },
                usePointStyle: true,
                pointStyle: 'circle',
                padding: 20,
                boxWidth: 16,
                boxHeight: 16
            }
        },
        tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
                label(context) {
                    let label = context.dataset.label || '';
                    if (label) label += ': ';
                    if (context.parsed.y != null) label += Number(context.parsed.y).toFixed(2);
                    return label;
                }
            }
        },
        zoom: {
            pan: {
                enabled: true,
                mode: 'x',
                modifierKey: 'ctrl'
            },
            zoom: {
                wheel: {
                    enabled: true
                },
                pinch: {
                    enabled: true
                },
                mode: 'x'
            }
        }
    },
    interaction: {
        mode: 'nearest',
        intersect: false
    },
    scales: {
        x: {
            ticks: { color: '#fff' },
            grid: { color: 'rgba(255,255,255,0.1)' }
        },
        y: {
            ticks: {
                color: '#fff',
                callback: function (value) {
                    return `$${value}`;
                }
            },
            grid: { color: 'rgba(255,255,255,0.1)' }
        }
    },
    layout: { padding: 0 },
    backgroundColor: '#181f32'
};

onMounted(() => {
    nextTick(() => {
        const chart = lineChartRef.value?.chart;
        if (!chart) return;

        chartContainer.value = chart.canvas.parentNode;
    });
});

onBeforeUnmount(() => {
    const chart = lineChartRef.value?.chart;
    if (!chart) return;

    chart.options.plugins.zoom.zoom.onZoomComplete = undefined;
    chart.options.plugins.zoom.pan.onPanComplete = undefined;
});
</script>

<style scoped>
.price-chart {
    margin: 0 auto;
    padding: 1rem;
}
</style>
