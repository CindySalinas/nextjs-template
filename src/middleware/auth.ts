import { NextRequest, NextResponse } from 'next/server'

import { AUTH_ROUTES, MOCK_SESSION_COOKIE, PROTECTED_ROUTES } from '@/lib/auth/types'

function stripLocale(pathname: string, locales: string[]): string {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || '/'
    }
  }
  return pathname
}

export function authMiddleware(request: NextRequest, locales: string[]): NextResponse | null {
  const { pathname } = request.nextUrl
  const bare = stripLocale(pathname, locales)
  const hasSession = request.cookies.has(MOCK_SESSION_COOKIE)

  const isProtected = PROTECTED_ROUTES.some((r) => bare === r || bare.startsWith(`${r}/`))
  const isAuthRoute = AUTH_ROUTES.some((r) => bare === r || bare.startsWith(`${r}/`))

  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  if (isAuthRoute && hasSession) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.searchParams.delete('from')
    return NextResponse.redirect(url)
  }

  return null
}
