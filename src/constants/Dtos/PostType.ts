import { type AuthorDto } from './AuthorDto'
import { CategoryEnum } from '../enums/CategoryEnum'

export interface PostDto {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt?: string
  type: CategoryEnum
  author: AuthorDto
}