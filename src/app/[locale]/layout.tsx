import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'

import { routing } from '@/lib/i18n/routing'
import { JsonLd } from '@/shared/JsonLd'
import { Toaster } from '@/ui/sonner'

const appName = process.env.NEXT_PUBLIC_APP_NAME ?? 'My App'
const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: appName,
    template: `%s | ${appName}`,
  },
  description: 'A production-ready Next.js boilerplate',
  openGraph: {
    siteName: appName,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: appName,
          url: appUrl,
          logo: {
            '@type': 'ImageObject',
            url: `${appUrl}/og-image.png`,
          },
          sameAs: [],
        }}
      />
      <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      <Toaster position="bottom-right" richColors />
    </>
  )
}
