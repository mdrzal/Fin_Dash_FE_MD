<template>
  <div class="min-h-screen relative text-white flex flex-col">

    <div class="w-full flex bg-transparent" style="padding-top: 10%;">
      <SearchBar />
    </div>

    <div class="flex flex-1 items-center justify-center min-[padding-top:0.5rem]">
      <div class="bg-white/5 rounded-2xl p-10 max-w-2xl text-center shadow-xl backdrop-blur-sm">
        <h1 class="text-4xl font-extrabold mb-4">Welcome to Financial Analysis Dashboard</h1>
        <p class="text-lg mb-6 text-gray-200">
          This platform consists of tools for analyzing stocks and financial markets. It allows you to explore price
          charts, sentiment, trends, and more! <br><br>
          To get started, use the search bar at the top to look up a stock symbol and view its analytics.
        </p>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import SearchBar from '../components/SearchBar.vue';
</script>
