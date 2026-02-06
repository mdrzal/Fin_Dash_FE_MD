<template>
  <div class="flex justify-center w-full">
    <div
      class="chart-container bg-gradient-to-br from-[#232946] to-[#181f32] rounded-2xl p-8 shadow-2xl flex flex-col items-center w-full max-w-full">
      <div class="text-3xl font-extrabold text-white text-center mb-6 tracking-wide">
        {{ title }}
      </div>

      <div class="w-full flex-1 min-h-[200px]">
        <slot name="chart"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ title: string }>();
</script>

<style scoped>
.chart-container {
  margin: 0 auto;
  padding: 1rem;
}
</style>
