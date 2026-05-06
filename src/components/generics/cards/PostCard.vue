<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import AutoComplete from 'primevue/autocomplete';


import { type PostDto } from '@/constants/dto/PostType'
import { CategoryEnum } from '@/constants/enums/CategoryEnum'
import { useAuthStore } from '@/stores/auth/AuthStore'
import { usePostStore } from '@/stores/post/PostStore'
import { useToastStore } from '@/stores/toast/ToastStore'

const authStore = useAuthStore()
const postStore = usePostStore()
const toast = useToastStore()

const props = defineProps<{
  post: PostDto
}>()

const editDialog = ref(false)
const filteredCategories = ref<typeof categoryOptions>([])
const categoryOptions = [
  { name: 'Frontend', type: CategoryEnum.Frontend },
  { name: 'Backend', type: CategoryEnum.Backend },
  { name: 'Logic', type: CategoryEnum.Logic },
  { name: 'Infrastructure', type: CategoryEnum.Infrastructure },
  { name: 'Languages', type: CategoryEnum.Languages },
  { name: 'Database', type: CategoryEnum.Database }
]

const form = reactive({
  id: 0,
  title: '',
  content: '',
  authorId: 0,
  category: null as { name: string; type: CategoryEnum } | null
})

const isTheSameAuthor = computed(() => {
  return authStore.userId === props.post.author.id
})

const OpenEditDialog = () => {
  Object.assign(form, {
    id: props.post.id,
    title: props.post.title,
    content: props.post.content,
    authorId: authStore.userId,
    category: categoryOptions.find(
      c => c.type === props.post.category.type
    ) || null
  })

  editDialog.value = true

}

const SearchCategory = (event: any) => {
  const query = event.query.toLowerCase()

  filteredCategories.value = categoryOptions.filter(c =>
    c.name.toLowerCase().includes(query)
  )
}

const UpdatePost = async () => {
  try {
    await postStore.updatePost(form.id, {
      title: form.title,
      content: form.content,
      authorId: form.authorId,
      category: form.category
    })

    toast.success('Post atualizado com sucesso!')
  } catch (e: unknown) {
    toast.error(e)
  }
  finally {
    editDialog.value = false
    ResetForm()
  }
}

const ResetForm = () => {
  form.id = 0
  form.title = ''
  form.content = ''
  form.authorId = 0
  form.category = null
}

const DeletePost = async (id: number) => {
  try {
    await postStore.deletePost(id)
    toast.success('Post deletado com sucesso!')
  } catch (e: unknown) {
    toast.error(e)
  }
}

const GetTagSeverity = (type: number) => {
  switch (type) {
    case CategoryEnum.Frontend: return 'success'
    case CategoryEnum.Backend: return 'info'
    case CategoryEnum.Logic: return 'warning'
    case CategoryEnum.Infrastructure: return 'secondary'
    case CategoryEnum.Languages: return 'danger'
    case CategoryEnum.Database: return 'contrast'
  }
}
</script>

<template>
  <Card class="mb-3">
    <template #title>
      <div class="flex justify-content-between align-items-center">
        <h1>{{ post.title }}</h1>

        <div v-if="authStore.isAuthenticated && isTheSameAuthor" class="flex gap-2">
          <Button
            icon="pi pi-pencil"
            variant="text"
            rounded
            aria-label="Edit post"
            v-tooltip.top="'Edit post'"
            @click="OpenEditDialog"
          />

          <Button
            icon="pi pi-trash"
            variant="text"
            rounded
            severity="danger"
            aria-label="Delete post"
            v-tooltip.top="'Delete post'"
            @click="DeletePost(post.id)"
          />
        </div>
      </div>
    </template>

    <template #subtitle>
      <span class="text-color-secondary my-2">
        Autor: {{ post.author.name }} |
        Postado: {{ new Date(post.createdAt).toLocaleString() }}
        <span v-if="post.updatedAt">
          | Atualizado: {{ new Date(post.updatedAt).toLocaleString() }}
        </span>
      </span>
    </template>

    <template #content>
      <div class="my-2 flex align-items-center gap-2">
        <Tag
          :value="post.category.name"
          :severity="GetTagSeverity(post.category.type)"
        />
      </div>

      <p class="mt-2">
        {{ post.content }}
      </p>
    </template>
  </Card>

  <Dialog
    v-model:visible="editDialog"
    modal
    header="Editar Post"
    :style="{ width: '500px' }"
  >
    <div class="flex flex-column gap-3">

      <div>
        <label>Título</label>
        <InputText v-model="form.title" class="w-full" />
      </div>

      <div>
        <label>Categoria</label>

        <AutoComplete
          v-model="form.category"
          :suggestions="filteredCategories"
          optionLabel="name"
          dropdown
          placeholder="Selecione uma categoria"
          class="w-full"
          @complete="SearchCategory"
        />
      </div>

      <div>
        <label>Conteúdo</label>
        <Textarea v-model="form.content" rows="6" class="w-full" />
      </div>

      <div class="flex justify-content-end gap-2 mt-3">
        <Button
          label="Cancelar"
          severity="secondary"
          @click="editDialog = false"
        />

        <Button
          label="Salvar"
          icon="pi pi-check"
          @click="UpdatePost"
        />
      </div>

    </div>
  </Dialog>
</template>