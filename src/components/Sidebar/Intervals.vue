<template>
    <div>

        <div class="flex items-center gap-2 mb-2">
            <span class="material-symbols-outlined text-blue-400 text-xl">schedule</span>
            <h3 class="text-white text-xs font-bold uppercase tracking-wider">
                Interval Selector
            </h3>
        </div>

        <div class="flex h-11 items-center rounded-lg bg-[#181f32] p-1 gap-2">
            <button v-for="option in intervals" :key="option"
                class="flex-1 h-full rounded-md text-xs font-bold transition-all"
                :class="option === selectedInterval ? 'bg-blue-600 text-white' : 'bg-[#181f32] text-[#9da6b9]'"
                @click="emit('update:selectedInterval', option)">
                {{ option }}
            </button>
        </div>

    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    intervals: string[];
    selectedInterval: string;
}>()

const emit = defineEmits<{
    (e: 'update:selectedInterval', value: string): void
}>()
</script>