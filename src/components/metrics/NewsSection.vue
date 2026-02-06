<template>
    <div class="card-container grid grid-cols-1 lg:grid-cols-2 gap-0">
        <div>
            <h2 class="card-heading">VADER News 24h Sentiment Score</h2>
            <SentimentGauge v-if="sentiment" :sentimentScore="sentiment.mean_compound_last_24h" />
            <div v-else class="text-center text-gray-400">
                No sentiment data available.
            </div>  
        </div>

        <RecentNewsArticles :sentiment="sentiment" />
    </div>
</template>

<script setup lang="ts">
import SentimentGauge from '../charts/SentimentGauge.vue';
import RecentNewsArticles from '../RecentNewsArticles.vue';
import type { SentimentResponse } from 'models/network/SentimentResponse';

const props = defineProps<{ sentiment: SentimentResponse | null }>();
</script>