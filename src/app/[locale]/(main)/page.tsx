import { getTranslations } from 'next-intl/server'

import { HeroSection, TestimonialsSection } from '@/features/main'
import { getPathname } from '@/lib/i18n/navigation'
import { routing } from '@/lib/i18n/routing'
import { generatePageMetadata } from '@/lib/seo/metadata'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

export const revalidate = 86400

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const path = getPathname({ locale, href: '/' })

  const alternateUrls = Object.fromEntries(
    routing.locales.map((l) => {
      const altPath = getPathname({ locale: l, href: '/' })
      const isDefault = l === routing.defaultLocale
      return [l, isDefault ? `${baseUrl}${altPath}` : `${baseUrl}/${l}${altPath}`]
    })
  )

  return generatePageMetadata({
    title: t('home.title'),
    description: t('home.description'),
    locale,
    path,
    alternateUrls,
  })
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TestimonialsSection />
    </>
  )
}
