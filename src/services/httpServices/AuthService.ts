import type { AuthRequestDto, AuthResponseDto } from '@/constants/dto/auth/AuthDto'
import { apiRequest } from '@/utils/ApiUtils'

export const AuthService = {
  login(data: AuthRequestDto): Promise<AuthResponseDto> {
    return apiRequest({
      method: 'POST',
      url: '/auth/login',
      data
    })
  }
}