import { apiRequest } from '@/utils/ApiUtils'

export const AuthorService = {
  getById(id: number) {
    return apiRequest({
      method: 'GET',
      url: `/author/${id}`
    })
  },

  create(data: unknown) {
    return apiRequest({
      method: 'POST',
      url: '/author',
      data
    })
  },
}