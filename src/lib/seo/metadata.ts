import type { Metadata } from 'next'

import { seoDefaults } from './defaults'

interface PageMetadataOptions {
  title: string
  description: string
  locale: string
  path?: string
  image?: string
  noIndex?: boolean
  alternateUrls?: Record<string, string>
}

export function generatePageMetadata({
  title,
  description,
  locale,
  path = '',
  image,
  noIndex = false,
  alternateUrls,
}: PageMetadataOptions): Metadata {
  const isDefault = locale === seoDefaults.defaultLocale
  const localePath = isDefault ? path : `/${locale}${path}`
  const url = `${seoDefaults.siteUrl}${localePath}`
  const ogImage = image ?? seoDefaults.defaultOgImage

  return {
    title,
    description,
    metadataBase: new URL(seoDefaults.siteUrl),
    alternates: {
      canonical: url,
      ...(alternateUrls ? { languages: alternateUrls } : {}),
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
