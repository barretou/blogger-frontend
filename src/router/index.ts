import { createRouter, createWebHistory } from 'vue-router'
import PostsPage from '@/components/pages/PostsPage.vue'
import AuthorsPage from '@/components/pages/AuthorsPage.vue'
import LoginPage from '@/components/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  { path: '/', name: 'posts', component: PostsPage },
  { path: '/authors', name: 'authors', component: AuthorsPage },
  { path: '/login', name: 'login', component: LoginPage }
  ],
})

export default router
