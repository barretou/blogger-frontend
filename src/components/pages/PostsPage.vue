<script setup lang="ts">
import { onMounted, ref } from 'vue'
import PostCard from '@/components/generics/cards/PostCard.vue'
import Skeleton from 'primevue/skeleton';
import { PostService } from '@/services/httpServices/PostService'
import { type PostDto } from '@/constants/dto/PostType'
import { useToastStore } from '@/stores/toast/ToastStore'

const toast = useToastStore()

const posts = ref<PostDto[]>([])
const isLoading = ref(false)
const getPosts = async () => {
  try {
    isLoading.value = true
    const postsData = await PostService.getAll()
    posts.value = postsData
  } catch (e: unknown) {
    toast.error(e)
  }
  finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  await getPosts()
})
</script>

<template>
  <div>
    <template v-if="isLoading">
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
    </template>
    <template v-else>
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </template>
  </div>
</template>