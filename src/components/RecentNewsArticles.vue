<template>
    <div>
        <h3 class="card-heading">Recent News Articles</h3>
        <ul v-if="sentiment?.articles_last_24h" class="space-y-4 overflow-y-auto max-h-96">
            <li v-for="article in sentiment.articles_last_24h" :key="article.title" class="news-item">
                <h4 class="font-semibold text-white">{{ article.title }}</h4>
                <p class="news-text">{{ article.summary }}</p>
                <div class="vader-score">
                    VADER Score:
                    <span
                        :class="article.vader_compound > 0 ? 'vader-positive' : (article.vader_compound < 0 ? 'vader-negative' : 'vader-neutral')">
                        {{ article.vader_compound }}
                    </span>
                </div>
                <a v-if="article.previewUrl?.url" :href="article.previewUrl.url" target="_blank"
                    class="news-link">
                    Read More
                </a>
            </li>
        </ul>
        <p v-else class="vader-neutral text-center">No recent news articles available.</p>
    </div>
</template>

<script setup lang="ts">
import type { SentimentResponse } from '../models/network/SentimentResponse';
const props = defineProps<{ sentiment: SentimentResponse | null }>();
</script>