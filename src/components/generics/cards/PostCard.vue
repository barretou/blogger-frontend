<script setup lang="ts">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { type PostDto } from '@/constants/dto/PostType'
import { CategoryEnum } from '@/constants/enums/CategoryEnum'



defineProps<{
  post: PostDto
}>()

const getTagSeverity = (type: number) => {
  switch(type) {
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
      <h1>{{ post.title }}</h1>
    </template>

    <template #subtitle>
      <span class="text-color-secondary my-2">
        Por {{ post.author.name }} |
        Postado: {{ new Date(post.createdAt).toLocaleString() }}
        <span v-if="post.updatedAt">
          | Atualizado: {{ new Date(post.updatedAt).toLocaleString() }}
        </span>
      </span>
    </template>

    <template #content>
      <div class="my-2 flex align-items-center gap-2">
        <Tag :value="post.category.name" :severity="getTagSeverity(post.category.type)" />
      </div>

      <p class="mt-2">
        {{ post.content }}
      </p>
    </template>
  </Card>
</template>