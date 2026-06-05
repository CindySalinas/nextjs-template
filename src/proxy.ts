import { NextRequest, NextResponse } from 'next/server'

import { buildCsp } from '@/lib/csp'
import { routing } from '@/lib/i18n/routing'
import { authMiddleware } from '@/middleware/auth'
import { intlMiddleware } from '@/middleware/intl'

export function proxy(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  // Auth check runs first — redirect immediately if needed
  const authResponse = authMiddleware(request, [...routing.locales])
  if (authResponse) {
    authResponse.headers.set('Content-Security-Policy', buildCsp(nonce, isDev))
    return authResponse
  }

  // Clone request with nonce header so Server Components can read it via headers()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const response = intlMiddleware(
    new NextRequest(request, { headers: requestHeaders })
  ) as NextResponse

  response.headers.set('Content-Security-Policy', buildCsp(nonce, isDev))
  return response
}

export const config = {
  matcher: ['/((?!_next|_vercel|api|.*\\..*).*)'],
}
