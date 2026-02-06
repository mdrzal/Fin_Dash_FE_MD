<template>
  <div class="metric-grid grid gap-8" :class="gridClasses">
    <div
      v-for="(value, key) in metrics"
      :key="key"
      class="p-6 flex flex-col items-center justify-center backdrop-blur-sm bg-gray-800/90 hover:bg-gray-700 cursor-pointer transition relative"
      :class="{ 'rounded-lg': tooltipKey !== key, 'rounded-b-lg': tooltipKey === key }"
      @click="toggleExplanation(key)"
      @mouseenter="showTooltip(key)"
      @mouseleave="hideTooltip"
    >
      <div class="text-center">
        <div v-if="activeExplanation === key">
          <p class="mt-4 text-xs text-gray-300">
            {{ calcExplanationFor(key) }}
          </p>
        </div>

        <div v-else>
          <h3 class="text-base font-semibold text-gray-600 uppercase tracking-wide text-white">
            {{ formatKeyFor(key) }}
          </h3>

          <p class="text-3xl font-extrabold mt-2" :class="valueColorFor(key, value)">
            {{ formatValueFor(key, value) }}
          </p>

          <p class="mt-2 text-sm text-gray-400">
            {{ commentaryFor(key, value) }}
          </p>
        </div>
      </div>

      <div
        v-if="tooltipKey === key"
        class="absolute top-0 left-0 w-full transform -translate-y-full bg-gray-600 text-white text-xs px-2 py-1 text-center rounded-t-lg"
      >
        {{ activeExplanation === key ? 'Click to see indicator' : 'Click to see explanation' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

type FormatterFn = (key: string, value?: number | string) => string;
type KeyFormatterFn = (key: string) => string;
type ColorFn = (key: string, value?: number | string) => string;
type ExplanationFn = (key: string) => string;

const props = defineProps<{
  metrics: Record<string, any>;
  gridCols?: '2' | '3' | 'default';
  formatKey?: KeyFormatterFn;
  formatValue?: FormatterFn;
  getValueColor?: ColorFn;
  getCommentary?: FormatterFn;
  getCalculationExplanation?: ExplanationFn;
}>();

// defaults
const formatKeyDefault: KeyFormatterFn = (k) => k;
const formatValueDefault: FormatterFn = (k, v) => (typeof v === 'number' ? v.toFixed(2) : String(v));
const getValueColorDefault: ColorFn = () => 'text-white';
const getCommentaryDefault: FormatterFn = () => '';
const getCalcExplanationDefault: ExplanationFn = () => 'No calculation explanation available.';

const activeExplanation = ref<string | null>(null);
const tooltipKey = ref<string | null>(null);

function toggleExplanation(key: string) {
  activeExplanation.value = activeExplanation.value === key ? null : key;
}
function showTooltip(key: string) {
  tooltipKey.value = key;
}
function hideTooltip() {
  tooltipKey.value = null;
}

const formatKeyFor = (key: string) => (props.formatKey ?? formatKeyDefault)(key);
const formatValueFor = (key: string, value?: number | string) => (props.formatValue ?? formatValueDefault)(key, value);
const valueColorFor = (key: string, value?: number | string) => (props.getValueColor ?? getValueColorDefault)(key, value);
const commentaryFor = (key: string, value?: number | string) => (props.getCommentary ?? getCommentaryDefault)(key, value);
const calcExplanationFor = (key: string) => (props.getCalculationExplanation ?? getCalcExplanationDefault)(key);

const gridClasses = computed(() => {
  switch (props.gridCols) {
    case '2':
      return 'grid-cols-1 sm:grid-cols-2';
    case '3':
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    default:
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-2';
  }
});
</script>