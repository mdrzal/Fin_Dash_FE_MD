<template>
    <div style="position: fixed; top: 1rem; right: 1rem; z-index: 1055;">
        <div v-for="n in notifications" :key="n.id" class="toast show align-items-center text-white border-0 mb-2"
            :class="{
                'bg-danger': n.type === 'error',
                'bg-success': n.type === 'success',
                'bg-info': n.type === 'info',
                'bg-warning': n.type === 'warning',
            }" role="alert" aria-live="assertive" aria-atomic="true" style="min-width: 250px;">
            <div class="d-flex">
                <div class="toast-body">
                    {{ n.message }}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="notification.close(n.id)"
                    aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { notification, notifications } from '../services/notification';
</script>