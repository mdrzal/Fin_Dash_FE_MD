<template>
    <div class="min-h-screen flex flex-col text-white">

        <div class="relative w-full flex py-6 px-8 backdrop-blur-sm bg-gray-900/50 z-20">
            <SearchBar @stockSelected="refreshPage" />
        </div>


        <div class="flex flex-1 flex-row min-w-0">
            <Sidebar @update="handleSidebarUpdate" />
            <Spinner v-if="loading || sidebarVars?.isUpdating == true" />
            <main v-else class="flex-1 p-8 min-w-0">

                <!-- Company Info -->
                <div class="relative z-10 mb-8">
                    <CompanyInfo v-if="companyInfo" :company="companyInfo" />
                </div>

                <!-- Price Chart and Recommendations -->
                <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 mb-8 height-[200px]">
                    <div>
                        <PriceChart :prices="prices" :moving-average="movingAverage" />
                    </div>

                    <div>
                        <Recommendations :recommendations="recommendations" />
                    </div>
                </div>

                <!-- Sentiment -->
                <NewsSection :sentiment="sentiment" />

                <!-- Core Metrics -->
                <div class="card-container">
                    <div>
                        <h3 class="card-heading">Core Metrics</h3>
                        <div v-if="coreMetrics">
                            <CoreMetrics :metrics="coreMetrics" :periodMonths="sidebarVars?.periodMonths" />
                        </div>
                        <div v-else class="text-center text-gray-400">
                            No data available for Core Metrics.
                        </div>
                    </div>
                </div>

                <!-- Trend Metrics -->
                <div class="card-container">
                    <div>
                        <h3 class="card-heading">Trend Metrics</h3>
                        <div v-if="trendMetrics">
                            <TrendMetrics :metrics="trendMetrics" />
                        </div>
                        <div v-else class="text-center text-gray-400">
                            No data available for Trend Metrics.
                        </div>
                    </div>
                </div>

                <!-- Correlation Metrics -->
                <div class="card-container">
                    <div>
                        <h3 class="card-heading">Correlation Metrics</h3>
                        <div v-if="correlationMetrics">
                            <CorrelationMetrics :metrics="correlationMetrics" :periodMonths="sidebarVars?.periodMonths" />
                        </div>
                        <div v-else class="text-center text-gray-400">
                            No data available for Correlation Metrics.
                        </div>
                    </div>
                </div>

                <!-- Drawdown Metrics -->
                <div class="card-container">
                    <div>
                        <h3 class="card-heading">Drawdown Metrics</h3>
                        <div v-if="drawdownMetrics">
                            <DrawdownMetrics :metrics="drawdownMetrics" :periodMonths="sidebarVars?.periodMonths" />
                        </div>
                        <div v-else class="text-center text-gray-400">
                            No data available for Drawdown Metrics.
                        </div>
                    </div>
                </div>

            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NewsSection from '../components/metrics/NewsSection.vue';
import Sidebar, { SidebarVars } from '../components/Sidebar.vue';
import Spinner from '../components/Spinner.vue';
import { pricesService, sentimentService, movingAverageService, coreMetricsService, trendMetricsService, correlationMetricsService, drawdownMetricsService, companyInfoService, recommendationsService } from '../network';
import type { PricesResponse } from '../models/network/PricesResponse';
import type { SentimentResponse } from '../models/network/SentimentResponse';
import type { MovingAverageResponse } from '../models/network/MovingAverage';
import PriceChart from '../components/charts/PriceChart.vue';
import CompanyInfo from '../components/CompanyInfo.vue';
import CoreMetrics from '../components/metrics/CoreMetrics.vue';
import { useRouter } from 'vue-router';
import { notification } from '../services/notification';
import TrendMetrics from '../components/metrics/TrendMetrics.vue';
import CorrelationMetrics from '../components/metrics/CorrelationMetrics.vue';
import DrawdownMetrics from '../components/metrics/DrawdownMetrics.vue';
import Recommendations from '../components/charts/Recommendations.vue';
import SearchBar from '../components/SearchBar.vue';

const loading = ref(false);
const router = useRouter();
const symbol = ref('');
const sidebarInitiated = ref(false);
const sidebarVars = ref<SidebarVars>();
const prices = ref<PricesResponse | null>(null);
const sentiment = ref<SentimentResponse | null>(null);
const movingAverage = ref<MovingAverageResponse | null>(null);
const trendMetrics = ref<TrendMetricsResponse | null>(null);
const correlationMetrics = ref<CorrelationMetricsResponse | null>(null);
const drawdownMetrics = ref<DrawdownMetricsResponse | null>(null);
const recommendations = ref<RecommendationsResponse[] | null>(null);
import type { CompanyInfoResponse } from '../models/network/CompanyInfoResponse';
import type { CoreMetricsResponse } from '../models/network/CoreMetricsResponse';
import type { DrawdownMetricsResponse } from '../models/network/DrawdownMetricsResponse';
import type { CorrelationMetricsResponse } from '../models/network/CorrelationMetricsResponse';
import type { TrendMetricsResponse } from '../models/network/TrendMetricsResponse';
import type { RecommendationsResponse } from '../models/network/RecommendationsResponse';

const companyInfo = ref<CompanyInfoResponse | null>(null);
const coreMetrics = ref<CoreMetricsResponse | null>(null);

onMounted(async () => {
    try {
        checkSymbolAndRedirect();
    } catch (err) {
        notification.error(`Failed to load dashboard data. ${err}.`);
    }
});

function checkSymbolAndRedirect() {
    try {
        symbol.value = router.currentRoute.value.params.symbol as string;
        if (!symbol.value || symbol.value.trim() === '') {
            router.push('/error');
        }
    } catch (error) {
        router.push('/error');
    }
}

async function refreshPage(selectedSymbol?: string) {
    if (selectedSymbol) {
        symbol.value = selectedSymbol;
    } else {
        symbol.value = router.currentRoute.value.params.symbol as string;
    }
    sidebarInitiated.value = false;
    await handleSidebarUpdate({
        selectedInterval: sidebarVars.value?.selectedInterval || '1d',
        periodMonths: sidebarVars.value?.periodMonths || 12,
        selectedMAWindow: sidebarVars.value?.selectedMAWindow || 50,
        isUpdating: false,
    });
}

async function handleSidebarUpdate(updatedVars: SidebarVars) {
    if (loading.value) return;
    try {
        loading.value = true;
        sidebarVars.value = updatedVars;
        if (!sidebarInitiated.value) {
            await getNonControllableElements();
        }
        await updateControllableAnalysis();
        sidebarInitiated.value = true;
    } catch (err) {
        notification.error(`Failed to update analysis data. ${err}.`);
    } finally {
        loading.value = false;
    }
}

async function updateControllableAnalysis() {
    await updatePrice();
    await updateMA();
    await fetchCoreMetrics();
    await fetchTrendMetrics();
    await fetchCorrelationMetrics();
    await fetchDrawdownMetrics();
}

async function getNonControllableElements() {
    await updateSentiment();
    await fetchCompanyInfo();
    await fetchRecommendations();
    await fetchTrendMetrics();
}

// Controllable elements
async function updatePrice() {
    if (!sidebarVars.value) return;
    try {
        prices.value = await pricesService.get({
            symbol: symbol.value,
            period_months: sidebarVars.value.periodMonths,
            interval: sidebarVars.value.selectedInterval
        });
    } catch (err) {
        notification.error(`Failed to fetch price data: ${err}`);
    }
}

async function updateMA() {
    if (!sidebarVars.value) return;
    try {
        movingAverage.value = await movingAverageService.get({
            symbol: symbol.value,
            period_months: sidebarVars.value.periodMonths,
            interval: sidebarVars.value.selectedInterval,
            window: sidebarVars.value.selectedMAWindow
        });
    } catch (err) {
        notification.error(`Failed to fetch moving average data: ${err}`);
    }
}

async function fetchCoreMetrics() {
    if (!sidebarVars.value) return;
    try {
        coreMetrics.value = await coreMetricsService.get({
            symbol: symbol.value,
            period_months: sidebarVars.value.periodMonths,
            interval: sidebarVars.value.selectedInterval,
            rsi_period: 14, // Fixed to 14 for now
            ma_window: sidebarVars.value.selectedMAWindow
        });
    } catch (err) {
        notification.error(`Failed to fetch core metrics: ${err}`);
    }
}

async function fetchCorrelationMetrics() {
    try {
        correlationMetrics.value = await correlationMetricsService.get({
            symbol: symbol.value,
            benchmark: '^GSPC', // Default benchmark
            period_months: sidebarVars.value?.periodMonths || 12,
            interval: sidebarVars.value?.selectedInterval || '1d'
        });
    } catch (err) {
        notification.error(`Failed to fetch correlation metrics: ${err}`);
    }
}

// Non-controllable elements
async function updateSentiment() {
    try {
        sentiment.value = await sentimentService.get({ symbol: symbol.value });
    } catch (err) {
        notification.error(`Failed to fetch sentiment data: ${err}`);
    }
}

async function fetchRecommendations() {
    try {
        recommendations.value = await recommendationsService.get({
            symbol: symbol.value
        });
    } catch (err) {
        notification.error(`Failed to fetch recommendations: ${err}`);
    }
}

async function fetchCompanyInfo() {
    try {
        companyInfo.value = await companyInfoService.get({
            symbol: symbol.value
        });
    } catch (err) {
        notification.error(`Failed to fetch company info: ${err}`);
    }
}

async function fetchTrendMetrics() {
    try {
        trendMetrics.value = await trendMetricsService.get({
            symbol: symbol.value,
        });
    } catch (err) {
        notification.error(`Failed to fetch trend metrics: ${err}`);
    }
}

async function fetchDrawdownMetrics() {
    try {
        drawdownMetrics.value = await drawdownMetricsService.get({
            symbol: symbol.value,
            period_months: sidebarVars.value?.periodMonths || 12,
            interval: sidebarVars.value?.selectedInterval || '1d'
        });
    } catch (err) {
        notification.error(`Failed to fetch drawdown metrics: ${err}`);
    }
}
</script>
