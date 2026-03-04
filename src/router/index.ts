import { createRouter, createWebHistory } from 'vue-router'
import PostsPage from '@/components/pages/PostsPage.vue'
import ToolsPage from '@/components/pages/ToolsPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/', name: 'posts', component: PostsPage },
  { path: '/tools', name: 'tools', component: ToolsPage }
  ],
})

export default router
