<template>
    <!-- Period Months Slider -->
    <div v-if="optionsResponse">
        <div class="flex items-center justify-between mb-2">
            
            <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-400 text-xl">date_range</span>
                <h3 class="text-white text-xs font-bold uppercase tracking-wider">Period Months</h3>
            </div>

            <span class="text-[#2dd4bf] font-bold text-sm bg-[#2dd4bf]/10 px-2 py-0.5 rounded">
                {{ periodMonths }}m
            </span>

        </div>
        <input 
            type="range" 
            :min="optionsResponse?.period_months.min" 
            :max="optionsResponse?.period_months.max"
            :value="periodMonths" @input="handleInput" 
            class="w-full h-1.5 bg-[#181f32] rounded-lg accent-blue-600" 
        />

        <div class="flex justify-between text-[10px] text-[#9da6b9] mt-2 font-medium">
            <span v-for="m in periodMonthLabels" :key="m">{{ m }}M</span>
        </div>
        
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { ValidParameterOptionsResponse } from '../../models/network/ValidParameterOptionsResponse';
const props = defineProps<{
    optionsResponse: ValidParameterOptionsResponse | null;
    periodMonths: number;
}>()

const emit = defineEmits<{
    (e: 'update:periodMonths', value: number): void;
}>()

const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement | null;
    if (target) emit('update:periodMonths', Number(target.value));
};

const periodMonthLabels = computed(() => {
    if (!props.optionsResponse) return [];
    const min = props.optionsResponse.period_months.min;
    const max = props.optionsResponse.period_months.max;
    const step = Math.max(1, Math.floor((max - min) / 4));
    const labels = [];
    for (let m = min; m <= max; m += step) {
        labels.push(m);
    }
    if (labels[labels.length - 1] !== max) labels.push(max);
    return labels;
});

</script>