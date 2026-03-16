import { apiRequest } from '@/utils/ApiUtils'
import { type PostDto } from '@/constants/dto/PostType'

export const PostService = {
  getAll() : Promise<PostDto[]> {
    return apiRequest({
      method: 'GET',
      url: '/post'
    })
  },

  getById(id: number): Promise<PostDto> {
    return apiRequest({
      method: 'GET',
      url: `/post/${id}`
    })
  },

  create(data: unknown): Promise<PostDto> {
    return apiRequest({
      method: 'POST',
      url: '/post',
      data
    })
  },

  update(id: number, data: unknown): Promise<PostDto> {
    return apiRequest({
      method: 'PUT',
      url: `/post/${id}`,
      data
    })
  },

  delete(id: number): Promise<void> {
    return apiRequest({
      method: 'DELETE',
      url: `/post/${id}`
    })
  }
}