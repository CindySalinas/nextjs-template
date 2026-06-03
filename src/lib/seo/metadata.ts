import type { Metadata } from 'next'

import { seoDefaults } from './defaults'

interface PageMetadataOptions {
  title: string
  description: string
  path?: string
  image?: string
  noIndex?: boolean
  // Provide locales to generate hreflang alternate links.
  // Example: locales: ['en', 'es'] adds <link rel="alternate" hreflang="..."> for each.
  locales?: string[]
}

export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  noIndex = false,
  locales,
}: PageMetadataOptions): Metadata {
  const url = `${seoDefaults.siteUrl}${path}`
  const ogImage = image ?? seoDefaults.defaultOgImage

  const languages =
    locales && locales.length > 0
      ? Object.fromEntries(
          locales.map((locale) => [locale, `${seoDefaults.siteUrl}/${locale}${path}`])
        )
      : undefined

  return {
    title,
    description,
    metadataBase: new URL(seoDefaults.siteUrl),
    alternates: {
      canonical: url,
      ...(languages ? { languages } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: seoDefaults.siteName,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: seoDefaults.twitterHandle,
    },
  }
}
