import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { authMiddleware } from '@/middleware/auth'

const locales = ['en', 'es']

function makeRequest(pathname: string): NextRequest {
  return new NextRequest(`http://localhost${pathname}`)
}

describe('authMiddleware', () => {
  it('returns null for protected routes (auth guard is client-side)', () => {
    expect(authMiddleware(makeRequest('/dashboard'), locales)).toBeNull()
    expect(authMiddleware(makeRequest('/settings'), locales)).toBeNull()
    expect(authMiddleware(makeRequest('/es/dashboard'), locales)).toBeNull()
  })

  it('returns null for auth routes', () => {
    expect(authMiddleware(makeRequest('/login'), locales)).toBeNull()
    expect(authMiddleware(makeRequest('/register'), locales)).toBeNull()
  })

  it('returns null for public routes', () => {
    expect(authMiddleware(makeRequest('/about'), locales)).toBeNull()
    expect(authMiddleware(makeRequest('/es/sobre'), locales)).toBeNull()
  })
})
