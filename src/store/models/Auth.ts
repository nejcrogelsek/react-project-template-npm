export interface LoginRequest {
  email: string
  password: string
}

export interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  full_name: string
  profile_image: string
  token?: string | null
}
