import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pricing' }

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Pricing</h1>
    </div>
  )
}
