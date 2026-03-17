<script setup lang="ts">
import { onMounted } from 'vue'
import { useToastStore } from '@/stores/toast/ToastStore'
import { usePostStore } from '@/stores/post/PostStore';

import PostCard from '@/components/generics/cards/PostCard.vue'
import Skeleton from 'primevue/skeleton';

const toast = useToastStore()
const postStore = usePostStore()

const getPosts = async () => {
  try {
    await postStore.fetchPosts();
  } catch (e: unknown) {
    toast.error(e)
  }
}

onMounted(async () => {
  if (!postStore.posts.length) {
    await getPosts()
  }
})
</script>

<template>
  <div>
    <template v-if="postStore.isPostsLoading">
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
      <Skeleton height="2rem" class="mb-2"></Skeleton>
    </template>
    <template v-else>
      <PostCard v-for="post in postStore.posts" :key="post.id" :post="post" />
    </template>
  </div>
</template>