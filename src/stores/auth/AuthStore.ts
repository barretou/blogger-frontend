import { defineStore } from 'pinia'
import { AuthService } from '@/services/httpServices/AuthService'
import { type AuthRequestDto } from '@/constants/dto/auth/AuthDto'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') as string | null,
    userId: localStorage.getItem('userId')
      ? Number(localStorage.getItem('userId'))
      : null as number | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    async login(credentials: AuthRequestDto) {
      const response = await AuthService.login(credentials)

      this.token = response.token
      this.userId = response.userId

      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId.toString())
    },

    logout() {
      this.token = null
      this.userId = null

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    },

    setToken(newToken: string) {
      this.token = newToken
      localStorage.setItem('token', newToken)
    }
  }
})