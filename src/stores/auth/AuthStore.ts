import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { AuthService } from '@/services/httpServices/AuthService'
import { type AuthRequestDto } from '@/constants/dto/auth/AuthDto'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: AuthRequestDto) {
    const response = await AuthService.login(credentials)
    debugger;
    token.value = response.token
    localStorage.setItem('token', response.token)
  }

  function logout() {
    token.value = null
    localStorage.removeItem('token')
  }

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  return {
    token,
    isAuthenticated,
    login,
    logout,
    setToken
  }
})