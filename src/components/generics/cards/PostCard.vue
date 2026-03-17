<script setup lang="ts">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button';
import { type PostDto } from '@/constants/dto/PostType'
import { CategoryEnum } from '@/constants/enums/CategoryEnum'
import { useAuthStore } from '@/stores/auth/AuthStore';
import { usePostStore } from '@/stores/post/PostStore';

const authStore = useAuthStore()
const postStore = usePostStore()

defineProps<{
  post: PostDto
}>()

const GetTagSeverity = (type: number) => {
  switch(type) {
    case CategoryEnum.Frontend: return 'success'
    case CategoryEnum.Backend: return 'info'
    case CategoryEnum.Logic: return 'warning'
    case CategoryEnum.Infrastructure: return 'secondary'
    case CategoryEnum.Languages: return 'danger'
    case CategoryEnum.Database: return 'contrast'
  }
}

const DeletePost = async (id: number) => {
  try {
    await postStore.deletePost(id)
  } catch (e: unknown) {
    console.error(e)
  }
} 
</script>

<template>
  <Card class="mb-3">
    <template #title>
      <div class="flex justify-content-between align-items-center">
        <h1>{{ post.title }}</h1>

        <div v-if="authStore.isAuthenticated" class="controls flex gap-2">
          <Button
            icon="pi pi-pencil"
            variant="text"
            rounded
            aria-label="Edit post"
            v-tooltip.top="'Edit post'"
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
        <Tag :value="post.category.name" :severity="GetTagSeverity(post.category.type)" />
      </div>

      <p class="mt-2">
        {{ post.content }}
      </p>
    </template>
  </Card>
</template>