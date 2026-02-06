<template>
    <aside
        class="w-80 min-w-[20rem] max-w-[20rem] min-h-full bg-gray-900/50 backdrop-blur-sm flex flex-col p-6 shadow-xl sticky top-0 h-screen overflow-y-auto">
        <Spinner v-if="sidebarVars.isUpdating" />
        <div v-if="!optionsResponse" class="text-white text-center mt-4">
            No data available for sidebar options.
        </div>
        <div v-else class="mb-8">
            <h1 class="text-white text-xl font-bold">Analysis Controls</h1>
        </div>
        <div v-if="optionsResponse" class="space-y-8">

            <!-- Interval Selector -->
            <Intervals :intervals="intervals" v-model:selectedInterval="sidebarVars.selectedInterval" />

            <!-- Period Months Slider -->
            <PeriodMonths :optionsResponse="optionsResponse" v-model:periodMonths="sidebarVars.periodMonths" />

            <!-- MA Window -->
            <MAWindow :optionsResponse="optionsResponse" v-model:selectedMAWindow="sidebarVars.selectedMAWindow" />

            <button
                class="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-4"
                :disabled="sidebarVars.isUpdating" @click="emit('update', sidebarVars)">

                <span class="material-symbols-outlined">refresh</span>
                Update Analysis
            </button>

        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { validParameterOptionsService } from '../network';
import type { ValidParameterOptionsResponse } from '../models/network/ValidParameterOptionsResponse';
import Intervals from './Sidebar/Intervals.vue';
import PeriodMonths from './Sidebar/PeriodMonths.vue';
import MAWindow from './Sidebar/MAWindow.vue';
import Spinner from './Spinner.vue';
import { notification } from '../services/notification';

const intervals = ref<string[]>([]);

const optionsResponse = ref<ValidParameterOptionsResponse | null>(null);

export interface SidebarVars {
    selectedInterval: string;
    periodMonths: number;
    selectedMAWindow: number;
    isUpdating: boolean;
}

const sidebarVars = ref<SidebarVars>({
    isUpdating: false,
    selectedInterval: '',
    periodMonths: 12,
    selectedMAWindow: 50,
});

const emit = defineEmits<{
    (e: 'update', sidebarVars: SidebarVars): void;
}>()

onMounted(async () => {
    await updateSidebarValues();
});

async function updateSidebarValues() {
    if (sidebarVars.value?.isUpdating) {
        return;
    }
    try {
        optionsResponse.value = await validParameterOptionsService.get();

        if (sidebarVars.value) {
            intervals.value = optionsResponse.value?.intervals || [];
            sidebarVars.value.isUpdating = true;
            sidebarVars.value.selectedInterval = intervals.value[0] || '1d';
            sidebarVars.value.periodMonths = sidebarVars.value.periodMonths < (optionsResponse.value?.period_months?.max ?? 12) ? sidebarVars.value.periodMonths : (optionsResponse.value?.period_months?.max ?? 12);
            sidebarVars.value.selectedMAWindow = optionsResponse.value?.ma_windows?.[0] || 50;
        }

        emit('update', sidebarVars.value);
    } catch (err) {
        notification.error(`Failed to load sidebar options. ${err}.`);
    }
    finally {
        if (sidebarVars.value) sidebarVars.value.isUpdating = false;
    }
}
</script>