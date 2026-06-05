import { MOCK_JWT_TOKEN } from './types'

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(MOCK_JWT_TOKEN)
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(MOCK_JWT_TOKEN, token)
  } catch {
    // silent failure — private browsing or quota exceeded
  }
}

export function removeToken(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(MOCK_JWT_TOKEN)
  } catch {
    // silent failure
  }
}
