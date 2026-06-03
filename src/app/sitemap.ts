import type { MetadataRoute } from 'next'

import { routing } from '@/lib/i18n/routing'

const LAST_MODIFIED = new Date('2026-01-01')

const EXCLUDED_ROUTES = ['/dashboard', '/settings', '/login', '/register', '/forgot-password']

function resolveLocalePath(
  pathname: string,
  locale: string,
  pathnames: typeof routing.pathnames
): string {
  const entry = pathnames[pathname as keyof typeof pathnames]
  if (!entry) return pathname
  if (typeof entry === 'string') return entry
  // eslint-disable-next-line security/detect-object-injection
  return (entry as Record<string, string>)[locale] ?? pathname
}

function buildUrl(baseUrl: string, locale: string, localizedPath: string): string {
  const isDefault = locale === routing.defaultLocale
  if (isDefault) return `${baseUrl}${localizedPath}`
  // Avoid trailing slash for root: /es (not /es/)
  return localizedPath === '/' ? `${baseUrl}/${locale}` : `${baseUrl}/${locale}${localizedPath}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
  const publicRoutes = Object.keys(routing.pathnames).filter((r) => !EXCLUDED_ROUTES.includes(r))

  return routing.locales.flatMap((locale) =>
    publicRoutes.map((route) => {
      const localizedPath = resolveLocalePath(route, locale, routing.pathnames)
      const url = buildUrl(baseUrl, locale, localizedPath)

      const alternates = Object.fromEntries(
        routing.locales.map((l) => {
          const altPath = resolveLocalePath(route, l, routing.pathnames)
          return [l, buildUrl(baseUrl, l, altPath)]
        })
      )

      return {
        url,
        lastModified: LAST_MODIFIED,
        changeFrequency: 'monthly' as const,
        priority: route === '/' ? 1 : 0.8,
        alternates: { languages: alternates },
      }
    })
  )
}
