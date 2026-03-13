<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth/AuthStore'
import { useToastStore } from '@/stores/toast/ToastStore'
import { useRouter } from 'vue-router'
import { AuthorService } from '@/services/httpServices/AuthorService'

import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

const authStore = useAuthStore()
const router = useRouter()
const toast = useToastStore()

const showRegisterDialog = ref(false)

const loginForm = reactive({
  email: '',
  password: ''
})

const registerForm = reactive({
  name: 'Joao da Silva',
  email: 'exemplo@email.com',
  password: ''
})

const LoginAuthor = async () => {
  try {
    await authStore.login(loginForm)
    toast.success()
    router.push('/posts')
  } catch (e: unknown) {
    toast.error(e)
  }
}

const CreateAuthor = async () => {
  try {
    await AuthorService.create(registerForm)
    toast.success('Conta criada com sucesso!')
  } catch (e: unknown) {
    toast.error(e)
  }
  finally {
    showRegisterDialog.value = false
  }
  console.log('Create author', registerForm)
}
</script>

<template>
  <div class="flex align-items-center justify-content-center min-h-screen surface-ground">

    <Card style="width: 25rem">

      <template #title>
        Bem vindo ao blogger!
      </template>

      <template #content>
        <div class="flex flex-column gap-3">

          <div class="flex flex-column gap-2">
            <label>Email</label>
            <InputText v-model="loginForm.email" />
          </div>

          <div class="flex flex-column gap-2">
            <label>Password</label>
            <Password v-model="loginForm.password" :feedback="false" toggleMask />
          </div>

          <Button
            label="Login"
            icon="pi pi-sign-in"
            class="w-full"
            @click="LoginAuthor"
          />

          <Button
            label="Criar conta"
            icon="pi pi-user-plus"
            severity="secondary"
            class="w-full"
            @click="showRegisterDialog = true"
          />

        </div>
      </template>

    </Card>

    <Dialog
      v-model:visible="showRegisterDialog"
      modal
      header="Criar conta"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-column gap-3">

        <div class="flex flex-column gap-2">
          <label>Name</label>
          <InputText v-model="registerForm.name" />
        </div>

        <div class="flex flex-column gap-2">
          <label>Email</label>
          <InputText v-model="registerForm.email" />
        </div>

        <div class="flex flex-column gap-2">
          <label>Password</label>
          <Password v-model="registerForm.password" toggleMask :feedback="false" />
        </div>

        <Button
          label="Registrar"
          icon="pi pi-check"
          class="w-full"
          @click="CreateAuthor"
        />

      </div>
    </Dialog>

  </div>
</template>