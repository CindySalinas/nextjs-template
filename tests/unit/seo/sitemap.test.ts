import { describe, expect, it } from 'vitest'

import sitemap from '@/app/sitemap'

describe('sitemap()', () => {
  it('generates 6 entries — 3 public routes × 2 locales', () => {
    const entries = sitemap()
    expect(entries).toHaveLength(6)
  })

  it('excludes auth routes (/login, /register, /forgot-password)', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls.every((u) => !u.includes('/login'))).toBe(true)
    expect(urls.every((u) => !u.includes('/register'))).toBe(true)
    expect(urls.every((u) => !u.includes('/forgot-password'))).toBe(true)
  })

  it('excludes protected routes (/dashboard, /settings)', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls.every((u) => !u.includes('/dashboard'))).toBe(true)
    expect(urls.every((u) => !u.includes('/settings'))).toBe(true)
  })

  it('includes English routes without locale prefix', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('http://localhost:3000/')
    expect(urls).toContain('http://localhost:3000/about')
    expect(urls).toContain('http://localhost:3000/pricing')
  })

  it('includes Spanish localized routes with /es/ prefix', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).toContain('http://localhost:3000/es')
    expect(urls).toContain('http://localhost:3000/es/sobre')
    expect(urls).toContain('http://localhost:3000/es/precios')
  })

  it('does NOT use /es/about — uses the localized /es/sobre', () => {
    const entries = sitemap()
    const urls = entries.map((e) => e.url)
    expect(urls).not.toContain('http://localhost:3000/es/about')
    expect(urls).not.toContain('http://localhost:3000/es/pricing')
  })

  it('each entry has hreflang alternates for both locales', () => {
    const entries = sitemap()
    const homeEn = entries.find((e) => e.url === 'http://localhost:3000/')
    expect(homeEn?.alternates?.languages).toBeDefined()
    const langs = homeEn?.alternates?.languages as Record<string, string>
    expect(langs['en']).toBe('http://localhost:3000/')
    expect(langs['es']).toBe('http://localhost:3000/es')
  })

  it('about entry alternates point to correct localized URLs', () => {
    const entries = sitemap()
    const aboutEn = entries.find((e) => e.url === 'http://localhost:3000/about')
    const langs = aboutEn?.alternates?.languages as Record<string, string>
    expect(langs['en']).toBe('http://localhost:3000/about')
    expect(langs['es']).toBe('http://localhost:3000/es/sobre')
  })

  it('home page has priority 1', () => {
    const entries = sitemap()
    const home = entries.find((e) => e.url === 'http://localhost:3000/')
    expect(home?.priority).toBe(1)
  })

  it('non-home pages have priority 0.8', () => {
    const entries = sitemap()
    const about = entries.find((e) => e.url === 'http://localhost:3000/about')
    expect(about?.priority).toBe(0.8)
  })
})
