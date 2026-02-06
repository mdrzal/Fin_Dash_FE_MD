import { defineStore } from 'pinia';

export const useSearchBarStore = defineStore('searchBar', {
  state: () => ({
    search: '',
    selectedTicker: null as null | { symbol: string; name: string },
    isSelected: false,
  }),
  actions: {
    setSearch(value: string) {
      this.search = value;
    },
    selectTicker(ticker: { symbol: string; name: string }) {
      this.selectedTicker = ticker;
      this.isSelected = true;
      this.search = `${ticker.symbol} - ${ticker.name}`;
    },
    clearSelection() {
      this.selectedTicker = null;
      this.isSelected = false;
      this.search = '';
    },
  },
  persist: true,
});