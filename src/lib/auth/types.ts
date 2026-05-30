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

export const MOCK_SESSION_COOKIE = 'mock-session'
export const PROTECTED_ROUTES = ['/dashboard', '/settings']
export const AUTH_ROUTES = ['/login', '/register', '/forgot-password']
