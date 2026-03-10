<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PostCard from '@/components/generics/cards/PostCard.vue'
import { PostService } from '@/services/httpServices/PostService'
import { type PostDto } from '@/constants/dto/PostType'

const posts = ref<PostDto[]>([])
onMounted(async () => {
  const postsData = await PostService.getAll()
  posts.value = postsData
})
</script>

<template>
  <div>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>