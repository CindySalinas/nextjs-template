import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'About',
  description: 'Learn more about us',
  path: '/about',
})

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">About</h1>
    </div>
  )
}
