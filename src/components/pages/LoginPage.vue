<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth/AuthStore'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useToastStore } from '@/stores/toast/ToastStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToastStore()

const email = ref('gustavobarreto@email.com')
const password = ref('')

const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

const showRegister = ref(false)

const LoginUser = async () => {
  try{
    await authStore.login({ email: email.value, password: password.value })
    toast.success()
    router.push('/tools')
  } catch (e: unknown) {
    toast.error(e)
    }
  }

const CreateUser = async () => {
  console.log('Create user', {
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value
  })
}
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen surface-ground">

    <!-- LOGIN CARD -->
    <Card style="width: 25rem">

      <template #title>
        Bem vindo ao blogger!
      </template>

      <template #content>
        <div class="flex flex-column gap-3">

          <div class="flex flex-column gap-2">
            <label>Email</label>
            <InputText v-model="email" />
          </div>

          <div class="flex flex-column gap-2">
            <label>Password</label>
            <Password v-model="password" :feedback="false" toggleMask />
          </div>

          <Button
            label="Login"
            icon="pi pi-sign-in"
            class="w-full"
            @click="LoginUser"
          />

          <Button
            label="Criar conta"
            icon="pi pi-user-plus"
            severity="secondary"
            class="w-full"
            @click="showRegister = true"
          />

        </div>
      </template>

    </Card>

    <Dialog
      v-model:visible="showRegister"
      modal
      header="Criar conta"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-column gap-3">

        <div class="flex flex-column gap-2">
          <label>Name</label>
          <InputText v-model="registerName" />
        </div>

        <div class="flex flex-column gap-2">
          <label>Email</label>
          <InputText v-model="registerEmail" />
        </div>

        <div class="flex flex-column gap-2">
          <label>Password</label>
          <Password v-model="registerPassword" toggleMask :feedback="false" />
        </div>

        <Button
          label="Registrar"
          icon="pi pi-check"
          class="w-full"
          @click="CreateUser"
        />

      </div>
    </Dialog>

  </div>
</template>