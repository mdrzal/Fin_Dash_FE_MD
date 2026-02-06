
<template>
  <div v-if="spinning" class="backdrop-blur-sm fixed inset-0 flex items-center justify-center bg-black/30 z-50">
    <div class="d-flex justify-content-center align-items-center" style="height: 100vh;">
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Spinner',
  setup(_, { expose }) {
    const spinning = ref(true);

    function stop() {
      spinning.value = false;
    }

    // Expose the stop method to parent components
    expose({ stop });

    return { spinning };
  },
});
</script>

<style scoped>

</style>
