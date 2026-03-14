<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth/AuthStore'

const router = useRouter()
const authStore = useAuthStore()

const items = computed(() => {
  const baseItems = [
    {
      label: 'Posts',
      icon: 'pi pi-home',
      command: () => router.push('/')
    }
  ]

  if (authStore.isAuthenticated) {
    baseItems.push({
      label: 'Gerenciar Posts',
      icon: 'pi pi-info-circle',
      command: () => router.push('/tools')
    })
  }

  return baseItems
})

const HandleLoginClick = () => {
  if (authStore.isAuthenticated) {
    authStore.logout()
    router.push('/login')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <Menubar :model="items">
    <template #start>
      <strong class="ml-2">Blogger</strong>
    </template>

    <template #end>
      <Button 
        :label="authStore.isAuthenticated ? 'Logout' : 'Login'"
        :severity="authStore.isAuthenticated? 'secondary' : 'primary'"
        @click="HandleLoginClick"
      />
    </template>
  </Menubar>
</template>