export interface AuthUser {
  id: string
  email: string
  name: string
  role: 'admin' | 'member'
}

export interface SessionState {
  user: AuthUser | null
  isLoading: boolean
}

export const MOCK_JWT_TOKEN = 'mock-jwt'
export const MOCK_JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtb2NrLXVzZXItMSJ9.mock-signature'
export const PROTECTED_ROUTES = ['/dashboard', '/settings']
export const AUTH_ROUTES = ['/login', '/register', '/forgot-password']
