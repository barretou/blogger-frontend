<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'

const router = useRouter()

const items = ref([
  {
    label: 'Posts',
    icon: 'pi pi-home',
    command: () => router.push('/')
  },
  {
    label: 'Ferramentas',
    icon: 'pi pi-info-circle',
    command: () => router.push('/tools')
  }
])
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <strong class="ml-2">Blogger</strong>
    </template>
  </Menubar>
</template>