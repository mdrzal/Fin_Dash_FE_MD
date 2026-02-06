<template>
    <div v-if="optionsResponse">

        <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-blue-400 text-xl">blur_on</span>
            <h3 class="text-white text-xs font-bold uppercase tracking-wider">MA Window</h3>
        </div>

        <div class="flex items-center gap-6">

            <div class="relative flex-shrink-0">
                <!-- Outer animated doughnut -->
                <div class="w-24 h-24 rounded-full flex items-center justify-center relative" :style="maCircleStyle">

                    <!-- Inner cutout -->
                    <div class="absolute w-16 h-16 rounded-full bg-[#0d1321]"></div>

                    <!-- Text content -->
                    <div class="absolute flex flex-col items-center justify-center">
                        <span class="text-2xl font-black text-white">{{ selectedMAWindow }}</span>
                        <span class="text-[10px] text-[#9da6b9] font-bold">DAYS</span>
                    </div>

                </div>

                <div class="absolute inset-0 rounded-full border-[6px] border-[#181f32] pointer-events-none">
                </div>
            </div>

            <div class="grid grid-cols-2 gap-2 flex-1">
                <button v-for="option in optionsResponse.ma_windows" :key="option"
                    class="py-2 text-xs font-bold rounded-lg border transition-all"
                    :class="option === selectedMAWindow ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'border-[#181f32] text-[#9da6b9] hover:border-blue-600'"
                    @click="$emit('update:selectedMAWindow', option)">
                    {{ option }}
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
    optionsResponse: {
        ma_windows: number[];
    } | null;
    selectedMAWindow: number;
}>();
const emit = defineEmits<{
    (e: 'update:selectedMAWindow', value: number): void;
}>();

const maCircleStyle = computed(() => {
    if (!props.optionsResponse) return {};
    const max = Math.max(...props.optionsResponse.ma_windows);
    const percent = Math.max(0, Math.min(1, props.selectedMAWindow / max));
    const deg = percent * 360;
    return {
        background: `conic-gradient(#2563eb ${deg}deg, #181f32 ${deg}deg 360deg)`
    };
});
</script>