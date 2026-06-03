import { NextRequest } from 'next/server'
import { describe, expect, it } from 'vitest'

import { authMiddleware } from '@/middleware/auth'

const locales = ['en', 'es']

function makeRequest(pathname: string, withCookie = false): NextRequest {
  const url = `http://localhost${pathname}`
  const headers = new Headers()
  if (withCookie) {
    headers.set('cookie', 'mock-session=mock-token')
  }
  return new NextRequest(url, { headers })
}

describe('authMiddleware', () => {
  it('redirects unauthenticated user from protected route to /login?from=...', () => {
    const req = makeRequest('/dashboard', false)
    const res = authMiddleware(req, locales)

    expect(res).not.toBeNull()
    expect(res?.status).toBe(307)
    const location = res?.headers.get('location') ?? ''
    expect(location).toContain('/login')
    expect(location).toContain('from=%2Fdashboard')
  })

  it('strips locale prefix before protected route check', () => {
    const req = makeRequest('/es/settings', false)
    const res = authMiddleware(req, locales)

    expect(res).not.toBeNull()
    expect(res?.status).toBe(307)
    const location = res?.headers.get('location') ?? ''
    expect(location).toContain('/login')
    expect(location).toContain('from=')
  })

  it('redirects authenticated user from auth route to /dashboard', () => {
    const req = makeRequest('/login', true)
    const res = authMiddleware(req, locales)

    expect(res).not.toBeNull()
    expect(res?.status).toBe(307)
    const location = res?.headers.get('location') ?? ''
    expect(location).toContain('/dashboard')
    expect(location).not.toContain('from=')
  })

  it('returns null for unauthenticated user on public route', () => {
    const req = makeRequest('/about', false)
    const res = authMiddleware(req, locales)

    expect(res).toBeNull()
  })

  it('returns null for authenticated user on protected route', () => {
    const req = makeRequest('/dashboard', true)
    const res = authMiddleware(req, locales)

    expect(res).toBeNull()
  })

  it('returns null for unauthenticated user on locale-prefixed public route', () => {
    const req = makeRequest('/es/sobre', false)
    const res = authMiddleware(req, locales)

    expect(res).toBeNull()
  })
})
