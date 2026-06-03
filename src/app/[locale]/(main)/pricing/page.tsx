import type { Metadata } from 'next'

import { PricingTable } from '@/features/main'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing',
  description: 'Simple, transparent pricing for teams of all sizes.',
  path: '/pricing',
})

export default function PricingPage() {
  return <PricingTable />
}
