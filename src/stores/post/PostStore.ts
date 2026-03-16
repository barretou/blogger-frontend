import { defineStore } from 'pinia'
import { PostService } from '@/services/httpServices/PostService'
import { type PostDto } from '@/constants/dto/PostType'

interface PostState {
  posts: PostDto[]
  selectedPost: PostDto | null
  isPostsLoading: boolean
}

export const usePostStore = defineStore('post', {
  state: (): PostState => ({
    posts: [],
    selectedPost: null,
    isPostsLoading: false
  }),

  actions: {
    async fetchPosts() {
      this.isPostsLoading = true
      const data = await PostService.getAll()
      this.posts = data
      this.isPostsLoading = false
      return data
    },

    async fetchPostById(id: number) {
      this.isPostsLoading = true
      const data = await PostService.getById(id)
      this.selectedPost = data
      this.isPostsLoading = false
      return data
    },

    async createPost(payload: unknown) {
      this.isPostsLoading = true
      const newPost = await PostService.create(payload)
      this.posts.push(newPost)
      this.isPostsLoading = false
      return newPost
    },

    async updatePost(id: number, payload: unknown) {
      this.isPostsLoading = true
      const updatedPost = await PostService.update(id, payload)

      const index = this.posts.findIndex(p => p.id === id)
      if (index !== -1) {
        this.posts[index] = updatedPost
      }

      if (this.selectedPost?.id === id) {
        this.selectedPost = updatedPost
      }

      this.isPostsLoading = false
      return updatedPost
    },

    async deletePost(id: number) {
      this.isPostsLoading = true
      await PostService.delete(id)

      this.posts = this.posts.filter(p => p.id !== id)

      this.isPostsLoading = false
    }
  }
})