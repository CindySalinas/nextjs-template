import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/lib/i18n/routing'

const intlMiddleware = createMiddleware(routing)

function buildCsp(nonce: string, isDev: boolean): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ''} https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://www.google-analytics.com",
    "frame-ancestors 'none'",
  ].join('; ')
}

export function proxy(request: NextRequest): NextResponse {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const isDev = process.env.NODE_ENV === 'development'

  // Inject nonce into request headers so Server Components can read it via headers()
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-nonce', nonce)

  const { pathname } = request.nextUrl

  // With localePrefix: 'as-needed', next-intl passes through unprefixed paths
  // instead of rewriting them for the [locale] App Router segment.
  // We rewrite them manually so /about → /en/about, / → /en, etc.
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  let response: NextResponse

  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone()
    // Avoid trailing slash on root to prevent 308 redirect loops: "/" → "/en" (not "/en/")
    url.pathname =
      pathname === '/' ? `/${routing.defaultLocale}` : `/${routing.defaultLocale}${pathname}`
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  } else {
    // Clone request with modified headers — preserves cookies, method, body
    response = intlMiddleware(new NextRequest(request, { headers: requestHeaders })) as NextResponse
  }

  response.headers.set('Content-Security-Policy', buildCsp(nonce, isDev))
  return response
}

export const config = {
  // next-intl recommended matcher: exclude _next internals and files with extensions
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
