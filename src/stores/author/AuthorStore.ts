import { defineStore } from 'pinia'
import { AuthorService } from '@/services/httpServices/AuthorService'
import { type AuthorDto } from '@/constants/dto/AuthorDto'

export const useAuthorStore = defineStore('author', {
  state: () => ({
    authors: [] as AuthorDto[],
    currentAuthor: null as AuthorDto | null,
    isAuthorLoading: false
  }),

  getters: {
    getAll: (state) => state.authors,
    getById: (state) => {
      return (id: number) => state.authors.find(a => a.id === id)
    }
  },

  actions: {
    async fetchAll() {
      this.isAuthorLoading = true

      const response = await AuthorService.getAll()
      this.authors = response

      this.isAuthorLoading = false
      return response
    },

    async fetchById(id: number) {
      this.isAuthorLoading = true

      const response = await AuthorService.getById(id)
      this.currentAuthor = response

      this.isAuthorLoading = false
      return response
    },

    async createAuthor(data: unknown) {
      this.isAuthorLoading = true

      const response = await AuthorService.create(data)
      this.authors.push(response)

      this.isAuthorLoading = false
      return response
    },

    async deleteAuthor(id: number) {
      this.isAuthorLoading = true

      await AuthorService.delete(id)
      this.authors = this.authors.filter(a => a.id !== id)

      this.isAuthorLoading = false
    }
  }
})