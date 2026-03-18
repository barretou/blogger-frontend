<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useAuthorStore } from '@/stores/author/AuthorStore'
import { useToastStore } from '@/stores/toast/ToastStore'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Skeleton from 'primevue/skeleton'

const authorStore = useAuthorStore()
const toast = useToastStore()

const dialogVisible = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: ''
})

onMounted(async () => {
  try {
    await authorStore.fetchAll()
  } catch (e) {
    toast.error(e)
  }
})

function OpenNewAuthorDialog() {
  form.name = ''
  form.email = 'ex: novo_autor@email.com'
  form.password = ''

  dialogVisible.value = true
}

async function SaveAuthor() {
  try {
    await authorStore.createAuthor({
      name: form.name,
      email: form.email,
      password: form.password
    })
    toast.success('Autor criado com sucesso!')
  } catch (e) {
    toast.error(e)
  } finally {
    dialogVisible.value = false
  }
}

async function DeleteAuthor(id: number) {
  try {
    await authorStore.deleteAuthor(id)
    toast.success('Autor deletado com sucesso!')
  } catch (e) {
    toast.error(e)
  }
}
</script>

<template>
  <div>
    <Button label="Novo Autor" icon="pi pi-plus" @click="OpenNewAuthorDialog" />

    <template v-if="authorStore.isAuthorLoading">
      <Skeleton height="4rem" class="mb-2" />
    </template>

    <DataTable
      v-else
      :value="authorStore.getAll"
      style="margin-top: 1rem"
    >
      <Column field="name" header="Nome" />
      <Column field="email" header="Email" />

      <Column header="Ações">
        <template #body="{ data }">
          <Button
            icon="pi pi-trash"
            text
            severity="danger"
            @click="DeleteAuthor(data.id)"
          />
        </template>
      </Column>
    </DataTable>

    <Dialog v-model:visible="dialogVisible" header="Autor" modal>
      <div class="p-fluid">
        <div class="field">
          <label class="mr-2">Nome</label>
          <InputText v-model="form.name" />
        </div>

        <div class="field">
          <label class="mr-2">Email</label>
          <InputText v-model="form.email" />
        </div>

        <div class="field">
          <label class="mr-2">Senha</label>
          <InputText v-model="form.password" type="password" />
        </div>
      </div>

      <template #footer>
        <Button
          severity="danger"
          label="Cancelar"
          text
          @click="dialogVisible = false"
        />
        <Button
          label="Salvar"
          :loading="authorStore.isAuthorLoading"
          @click="SaveAuthor"
        />
      </template>
    </Dialog>
  </div>
</template>