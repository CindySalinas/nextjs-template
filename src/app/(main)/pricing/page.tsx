import type { Metadata } from 'next'
import { PricingTable } from '@/features/main'

export const metadata: Metadata = { title: 'Pricing' }

export default function PricingPage() {
  return <PricingTable />
}
