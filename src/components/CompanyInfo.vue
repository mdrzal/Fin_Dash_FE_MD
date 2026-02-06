<template>
    <div class="p-4 bg-black/95 backdrop-blur-sm shadow rounded-lg">
        <h2 class="text-xl font-extrabold mb-6">{{ company.name }}</h2>
        <div class="mb-6">
            <h3 class="text-lg font-semibold text-white">About:</h3>
            <p v-if="expanded" class="text-gray-300 text-justify">
                {{ company.description }}
            </p>
            <p v-else class="text-gray-300 truncate">
                {{ company.description }}
            </p>
            <button @click="expanded = !expanded" class="text-blue-500 underline text-sm mt-2">
                {{ expanded ? 'Show Less' : 'Show More' }}
            </button>
        </div>
        <ul class="text-sm text-gray-300 space-y-1">
            <li>
                <strong class="inline-block w-[150px] text-white">Symbol:</strong>
                {{ company.symbol }}
            </li>
            <li>
                <strong class="inline-block w-[150px] text-white">Sector:</strong>
                {{ company.sector }}
            </li>
            <li>
                <strong class="inline-block w-[150px] text-white">Industry:</strong>
                {{ company.industry }}
            </li>
            <li>
                <strong class="inline-block w-[150px] text-white">Market Cap:</strong>
                {{ formatMarketCap(company.market_cap) }}
            </li>
            <li>
                <strong class="inline-block w-[150px] text-white">Website:</strong>
                <a :href="company.website" target="_blank" class="text-blue-500 underline">
                    {{ company.website }}</a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { CompanyInfoResponse } from '../models/network/CompanyInfoResponse';

defineProps<{ company: CompanyInfoResponse }>();

const expanded = ref(false);

function formatMarketCap(value: number): string {
    if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(1)}M`;
    }
    return `$${value}`;
}
</script>

<style scoped></style>