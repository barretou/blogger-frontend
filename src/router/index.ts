import { createRouter, createWebHistory } from 'vue-router'
import PostsPage from '@/components/pages/PostsPage.vue'
import ToolsPage from '@/components/pages/ToolsPage.vue'
import LoginPage from '@/components/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/', name: 'posts', component: PostsPage },
  { path: '/tools', name: 'tools', component: ToolsPage },
  { path: '/login', name: 'login', component: LoginPage }
  ],
})

export default router
