import type { MetadataRoute } from 'next'

// Use a fixed date — new Date() would vary per request and break HTTP caching.
// Update this when you publish significant content changes.
const LAST_MODIFIED = new Date('2026-01-01')

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  return [
    { url: baseUrl, lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${baseUrl}/about`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}
