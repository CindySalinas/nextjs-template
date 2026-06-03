import { describe, expect, it } from 'vitest'

import { generatePageMetadata } from '@/lib/seo/metadata'

describe('generatePageMetadata', () => {
  const base = {
    title: 'Test Page',
    description: 'Test description',
    locale: 'en',
  }

  it('returns title and description', () => {
    const meta = generatePageMetadata(base)
    expect(meta.title).toBe('Test Page')
    expect(meta.description).toBe('Test description')
  })

  it('sets canonical with locale prefix for non-default locale', () => {
    const meta = generatePageMetadata({ ...base, locale: 'es', path: '/sobre' })
    const canonical = meta.alternates?.canonical as string
    expect(canonical).toContain('/es/sobre')
    expect(canonical).not.toMatch(/^http:\/\/[^/]+\/about/)
  })

  it('sets canonical WITHOUT locale prefix for default locale (en)', () => {
    const meta = generatePageMetadata({ ...base, locale: 'en', path: '/about' })
    const canonical = meta.alternates?.canonical as string
    expect(canonical).toContain('/about')
    expect(canonical).not.toContain('/en/')
  })

  it('uses base URL when path is omitted', () => {
    const meta = generatePageMetadata(base)
    const canonical = meta.alternates?.canonical as string
    expect(canonical).not.toContain('undefined')
    expect(canonical).toMatch(/^http/)
  })

  it('sets hreflang alternates from alternateUrls', () => {
    const alternateUrls = {
      en: 'http://localhost:3000/about',
      es: 'http://localhost:3000/es/sobre',
    }
    const meta = generatePageMetadata({ ...base, alternateUrls })
    expect(meta.alternates?.languages).toEqual(alternateUrls)
  })

  it('omits alternates.languages when alternateUrls is not provided', () => {
    const meta = generatePageMetadata(base)
    expect(meta.alternates?.languages).toBeUndefined()
  })

  it('allows indexing by default', () => {
    const meta = generatePageMetadata(base)
    expect(meta.robots).toEqual({ index: true, follow: true })
  })

  it('disables indexing when noIndex is true', () => {
    const meta = generatePageMetadata({ ...base, noIndex: true })
    expect(meta.robots).toEqual({ index: false, follow: false })
  })

  it('uses provided og image', () => {
    const meta = generatePageMetadata({ ...base, image: 'https://example.com/img.png' })
    const images = meta.openGraph?.images
    expect(Array.isArray(images) && images[0]).toMatchObject({ url: 'https://example.com/img.png' })
  })

  it('falls back to default og image when image is omitted', () => {
    const meta = generatePageMetadata(base)
    const images = meta.openGraph?.images
    expect(Array.isArray(images) && images[0]).toMatchObject({ url: expect.any(String) })
  })

  it('includes twitter card metadata', () => {
    const meta = generatePageMetadata(base)
    const twitter = meta.twitter as Record<string, unknown>
    expect(twitter['card']).toBe('summary_large_image')
    expect(twitter['title']).toBe('Test Page')
  })

  it('sets openGraph siteName and type', () => {
    const meta = generatePageMetadata(base)
    const og = meta.openGraph as Record<string, unknown>
    expect(og['type']).toBe('website')
    expect(og['siteName']).toBeDefined()
  })
})
