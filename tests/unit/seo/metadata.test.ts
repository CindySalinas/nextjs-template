import { describe, expect, it } from 'vitest'

import { generatePageMetadata } from '@/lib/seo/metadata'

describe('generatePageMetadata', () => {
  const base = {
    title: 'Test Page',
    description: 'Test description',
  }

  it('returns title and description', () => {
    const meta = generatePageMetadata(base)
    expect(meta.title).toBe('Test Page')
    expect(meta.description).toBe('Test description')
  })

  it('sets canonical URL from path', () => {
    const meta = generatePageMetadata({ ...base, path: '/about' })
    expect(meta.alternates?.canonical).toContain('/about')
  })

  it('sets canonical URL to base url when path is omitted', () => {
    const meta = generatePageMetadata(base)
    const canonical = meta.alternates?.canonical as string
    expect(canonical).not.toContain('undefined')
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
    // Cast needed: Next.js Twitter type is a discriminated union
    const twitter = meta.twitter as Record<string, unknown>
    expect(twitter['card']).toBe('summary_large_image')
    expect(twitter['title']).toBe('Test Page')
  })

  it('sets openGraph siteName and type', () => {
    const meta = generatePageMetadata(base)
    // Cast needed: Next.js OpenGraph type is a discriminated union
    const og = meta.openGraph as Record<string, unknown>
    expect(og['type']).toBe('website')
    expect(og['siteName']).toBeDefined()
  })
})
