import { apiRequest } from '@/utils/ApiUtils'
import { type AuthorDto } from '@/constants/dto/AuthorDto'

export const AuthorService = {
  getById(id: number): Promise<AuthorDto> {
    return apiRequest({
      method: 'GET',
      url: `/author/${id}`
    })
  },

  getAll(): Promise<AuthorDto[]> {
    return apiRequest({
      method: 'GET',
      url: '/author'
    })
  },

  create(data: unknown): Promise<AuthorDto> {
    return apiRequest({
      method: 'POST',
      url: '/author',
      data
    })
  },

  delete(id: number) {
    return apiRequest({
      method: 'DELETE',
      url: `/author/${id}`
    })
  }
}