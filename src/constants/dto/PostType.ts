import { type AuthorDto } from './AuthorDto'
import { type CategoryDto } from './CategoryDto'

export interface PostDto {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt?: string
  category: CategoryDto
  author: AuthorDto
}