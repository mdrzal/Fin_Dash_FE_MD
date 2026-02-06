<template>
    <ChartContainer title="Recommendations Chart">
        <template #chart>
            <Bar v-if="chartData.datasets.length" :data="chartData" :options="chartOptions" class="w-full h-full" />
            <div v-else class="text-gray-400 text-center mt-10">
                No data available
            </div>
        </template>
    </ChartContainer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import ChartContainer from './ChartContainer.vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import type { ChartOptions } from 'chart.js';
import type { RecommendationsResponse } from '../../models/network/RecommendationsResponse';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, zoomPlugin);

const props = defineProps<{ recommendations: RecommendationsResponse[] | null }>();
const chartData = computed(() => {
    const recs = props.recommendations || [];
    if (recs.length === 0) {
        return { labels: [], datasets: [] };
    }

    return {
        labels: recs.map((r) => r.period),
        datasets: [
            {
                label: 'Strong Buy',
                data: recs.map((r) => r.strongBuy),
                backgroundColor: 'rgba(75, 192, 192, 0.8)'
            },
            {
                label: 'Buy',
                data: recs.map((r) => r.buy),
                backgroundColor: 'rgba(54, 162, 235, 0.8)'
            },
            {
                label: 'Hold',
                data: recs.map((r) => r.hold),
                backgroundColor: 'rgba(255, 206, 86, 0.8)'
            },
            {
                label: 'Sell',
                data: recs.map((r) => r.sell),
                backgroundColor: 'rgba(255, 99, 132, 0.8)'
            },
            {
                label: 'Strong Sell',
                data: recs.map((r) => r.strongSell),
                backgroundColor: 'rgba(153, 102, 255, 0.8)'
            }
        ]
    };
});

const chartOptions: ChartOptions<'bar'> = {
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
            ticks: { color: '#fff' },
            grid: { color: 'rgba(255,255,255,0.1)' }
        }
    },
    layout: { padding: 0 },
    backgroundColor: '#181f32'
};
</script>

<style scoped>
.recommendations-chart {
    margin: 0 auto;
    padding: 1rem;
}
</style>
