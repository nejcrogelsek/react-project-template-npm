import { ForgotPasswordFields } from 'lib/hooks/react-hook-form/useForgotPasswordForm'
import { LoginFields } from 'lib/hooks/react-hook-form/useLoginForm'
import { RegisterFields } from 'lib/hooks/react-hook-form/useRegisterForm'
import { ResetPasswordFields } from 'lib/hooks/react-hook-form/useResetPasswordForm'

import { apiRequest } from './Api'

export interface RegisterInput extends RegisterFields {
  profile_image: string
}

export interface UpdateUserInput {
  email?: string
  first_name?: string
  last_name?: string
  password?: string
  new_password?: string
  confirm_password?: string
  profile_image?: string
}

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  profile_image: string
}

export const register = async (data: RegisterInput) => apiRequest<RegisterInput, void>('post', 'auth/register', data)

export const updateUser = async (data: UpdateUserInput, id: string) =>
  apiRequest<UpdateUserInput, User>('patch', `users/${id}`, data)

export const login = async (data: LoginFields) => apiRequest<LoginFields, User>('post', 'auth/login', data)

export const forgotPassword = async (data: ForgotPasswordFields) =>
  apiRequest<ForgotPasswordFields, User>('post', 'auth/forgot-password', data)

export const resetPassword = async (data: ResetPasswordFields, token: string) =>
  apiRequest<ResetPasswordFields, User>('post', `auth/reset-password?token=${token}`, data)

export const signout = async () => apiRequest<undefined, void>('post', 'auth/signout')

export const fetchUser = async () => apiRequest<undefined, User>('get', 'auth')

export const refreshTokens = async () => apiRequest<undefined, User>('get', 'auth/refresh')

export const resendEmailVerification = async (token: string) =>
  apiRequest<{ token: string }, void>('post', 'auth/resend-email-verification', { token })
