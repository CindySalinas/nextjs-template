import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { buildCsp } from '@/lib/csp'
import { routing } from '@/lib/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const { pathname } = request.nextUrl
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  let response: NextResponse

  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone()
    url.pathname =
      pathname === '/' ? `/${routing.defaultLocale}` : `/${routing.defaultLocale}${pathname}`
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  } else {
    response = intlMiddleware(new NextRequest(request, { headers: requestHeaders })) as NextResponse
  }

  response.headers.set('Content-Security-Policy', buildCsp(nonce, isDev))
  return response
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
