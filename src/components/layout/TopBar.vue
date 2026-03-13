<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import { useAuthStore } from '@/stores/auth/AuthStore'

const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => authStore.isAuthenticated)

const items = computed(() => {
  const baseItems = [
    {
      label: 'Posts',
      icon: 'pi pi-home',
      command: () => router.push('/')
    }
  ]

  if (isLoggedIn.value) {
    baseItems.push({
      label: 'Gerenciar Posts',
      icon: 'pi pi-info-circle',
      command: () => router.push('/tools')
    })
  }

  return baseItems
})

const HandleLoginClick = () => {
  if (isLoggedIn.value) {
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
        :label="isLoggedIn ? 'Logout' : 'Login'"
        :severity="isLoggedIn? 'secondary' : 'primary'"
        @click="HandleLoginClick"
      />
    </template>
  </Menubar>
</template>