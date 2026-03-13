<script setup lang="ts">
import { watch } from "vue"
import { useToast } from "primevue/usetoast"
import Toast from "primevue/toast"

import { useToastStore } from "@/stores/toast/ToastStore"

const toast = useToast()
const toastStore = useToastStore()

watch(
  () => toastStore.queue,
  (messages) => {
    messages.forEach((msg) => {
      toast.add({
        severity: msg.severity,
        summary: msg.summary,
        detail: msg.detail,
        life: msg.life
      })

      toastStore.remove(msg.id)
    })
  },
  { deep: true }
)
</script>

<template>
  <Toast position="bottom-right" />
</template>