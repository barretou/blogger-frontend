import { apiRequest } from '@/utils/httpUtils'
import { type PostDto } from '@/constants/dto/PostType'

export const PostService = {
  getAll() : Promise<PostDto[]> {
    return apiRequest({
      method: 'GET',
      url: '/post'
    })
  },

  getById(id: number) {
    return apiRequest({
      method: 'GET',
      url: `/post/${id}`
    })
  },

  create(data: unknown) {
    return apiRequest({
      method: 'POST',
      url: '/post',
      data
    })
  },

  update(id: number, data: unknown) {
    return apiRequest({
      method: 'PUT',
      url: `/post/${id}`,
      data
    })
  },

  delete(id: number) {
    return apiRequest({
      method: 'DELETE',
      url: `/post/${id}`
    })
  }
}