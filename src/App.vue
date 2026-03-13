<script setup lang="ts">
import TopBar from '@/components/layout/TopBar.vue'
import GlobalToast from "@/components/generics/GlobalToast.vue"
</script>

<template>
  <TopBar />
  <div class="app-container">
    <router-view />
    <GlobalToast />
  </div>
</template>
