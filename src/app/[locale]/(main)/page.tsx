import type { Metadata } from 'next'

import { HeroSection, TestimonialsSection } from '@/features/main'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Build your next product faster',
  description:
    'A production-ready Next.js 16 boilerplate with everything you need to ship in 2026.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TestimonialsSection />
    </>
  )
}
