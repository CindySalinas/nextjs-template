import { getTranslations } from 'next-intl/server'

import { getPathname } from '@/lib/i18n/navigation'
import { routing } from '@/lib/i18n/routing'
import { generatePageMetadata } from '@/lib/seo/metadata'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const path = getPathname({ locale, href: '/about' })

  const alternateUrls = Object.fromEntries(
    routing.locales.map((l) => {
      const altPath = getPathname({ locale: l, href: '/about' })
      const isDefault = l === routing.defaultLocale
      return [l, isDefault ? `${baseUrl}${altPath}` : `${baseUrl}/${l}${altPath}`]
    })
  )

  return generatePageMetadata({
    title: t('about.title'),
    description: t('about.description'),
    locale,
    path,
    alternateUrls,
  })
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">About</h1>
    </div>
  )
}
