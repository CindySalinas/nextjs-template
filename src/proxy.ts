import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { routing } from '@/lib/i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // With localePrefix: 'as-needed', next-intl passes through unprefixed paths
  // instead of rewriting them for the [locale] App Router segment.
  // We rewrite them manually so /about → /en/about, / → /en, etc.
  const hasLocalePrefix = routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone()
    // Avoid trailing slash on root to prevent 308 redirect loops:
    // "/" → "/en" (not "/en/")
    url.pathname =
      pathname === '/' ? `/${routing.defaultLocale}` : `/${routing.defaultLocale}${pathname}`
    return NextResponse.rewrite(url)
  }

  return intlMiddleware(request)
}

export const config = {
  // next-intl recommended matcher: exclude _next internals and files with extensions
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
}
