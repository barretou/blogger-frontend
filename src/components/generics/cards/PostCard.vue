<script setup lang="ts">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { type PostDto } from '@/constants/Dtos/PostType'
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
  <Card class="p-mb-3 p-card">
    <template #title>{{ post.title }}</template>
    <template #subtitle>
        <span class="p-text-secondary">
            Por {{ post.author.name }} ({{ post.author.email }}) <br />
            Criado: {{ new Date(post.createdAt).toLocaleString() }}
            <span v-if="post.updatedAt"> | Updated: {{ new Date(post.updatedAt).toLocaleString() }}</span>
        </span>
    </template>
    <template #content>
        <div class="p-mb-2">
          <Tag :value="post.type" :severity="getTagSeverity(post.type)" class="p-mr-2" />
        </div>
    
        <p class="p-mt-2">{{ post.content }}</p>
    </template>
  </Card>
</template>