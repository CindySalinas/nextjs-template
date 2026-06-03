import type { Metadata } from 'next'

import { LoginForm } from '@/features/auth'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sign in',
  description: 'Sign in to your account.',
  locale: 'en',
  path: '/login',
  noIndex: true,
})

export default function LoginPage() {
  return (
    <div className="border-border bg-background rounded-lg border p-8">
      <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
      <LoginForm />
    </div>
  )
}
