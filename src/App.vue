<template>
  <div class="fixed inset-0 -z-10 w-full h-full">
    <img src="./assets/imaages/hexagon-bg.jpg" alt="background"
      class="w-full h-full object-cover object-center brightness-50 bg-black bg-fixed" />
  </div>
  <NotificationToast />
  <router-view />
</template>

<script setup lang="ts">
import NotificationToast from './components/NotificationToast.vue';
</script>
