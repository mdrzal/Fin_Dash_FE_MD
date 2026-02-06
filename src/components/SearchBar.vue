<template>
  <div class="w-full flex items-center justify-center bg-transparent relative">
    <form class="w-full max-w-2xl relative flex items-center">
      <input v-model="search" type="text" placeholder="Search stocks..." :readonly="isSelected"
        class="w-full rounded-full border border-white/30 bg-white/20 backdrop-blur-md px-6 py-3 pr-14 text-white placeholder-white/70 text-lg focus:outline-none focus:ring-1 focus:ring-[#6bb8ff] transition-all duration-300 shadow-lg"
        @focus="isFocused = true" @blur="onBlur" />
      <button v-if="search" type="button" @click="clearSelection"
        class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/10 transition"
        aria-label="Clear search">
        <span class="material-symbols-outlined text-white text-2xl">close</span>
      </button>
      <button v-else type="submit"
        class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center h-9 w-9 rounded-full hover:bg-white/10 transition">
        <span class="material-symbols-outlined text-white text-2xl">search</span>
      </button>
    </form>
    <div v-if="showDropdown"
      class="absolute left-0 right-0 top-full mt-2 max-w-2xl mx-auto bg-gray-900/95 backdrop-blur-lg rounded-2xl p-8 shadow-xl z-[9999] min-h-[48px] max-h-64 overflow-y-auto">
      <ul>
        <li v-for="item in results?.tickers || []" :key="item.symbol || item.name"
          class="hover:bg-gray-800 transition flex flex-col items-start rounded-xl px-4 py-3 text-white"
          @mousedown.prevent="selectTicker(item)">
          <span><span class="font-bold">{{ item.symbol }}</span> - <span>{{ item.name }}</span></span>
        </li>
        <li v-if="results && results.tickers && results.tickers.length === 0" class="px-4 py-2 text-white">No results
          found</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { tickersService } from '../network';
import { AvailableTickersResponse } from '../models/network/AvailableTickersResponse';
import { notification } from '../services/notification';
import router from '../router/index';
import { useSearchBarStore } from '../stores/searchBar';

const searchBarStore = useSearchBarStore();
const search = ref(searchBarStore.search);
const results = ref<AvailableTickersResponse | undefined>();
const isFocused = ref(false);
const isSelected = ref(false);

let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

const emit = defineEmits<{
  (e: 'stockSelected', symbol: string): void
}>();

watch(search, (newValue) => {
  searchBarStore.setSearch(newValue);
  if (isSelected.value) {
    return;
  }
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (!newValue) {
    results.value = undefined;
    return;
  }
  debounceTimeout = setTimeout(async () => {
    try {
      const response = await tickersService.get({ starts_with: newValue });
      console.log('Tickers API response:', response);
      results.value = response;
    } catch (e) {
      results.value = undefined;
      console.log('Error fetching tickers:', e);
      notification.error('Failed to fetch tickers. Please try again.');
    }
  }, 400);
});
function clearSelection() {
  search.value = '';
  isSelected.value = false;
  results.value = undefined;
}

function selectTicker(item: { symbol: string; name: string }) {
  isSelected.value = true;
  search.value = item.symbol + ' - ' + item.name;
  searchBarStore.selectTicker(item);
  results.value = undefined;
  isFocused.value = false; 
  router.push({ name: 'Dashboard', params: { symbol: item.symbol } });
  emit('stockSelected', item.symbol);
}

function onBlur() {
  setTimeout(() => {
    isFocused.value = false;
  }, 200);
}

const showDropdown = computed(() => {
  return isFocused.value && results.value && results.value.tickers && results.value.tickers.length > 0;
});
</script>