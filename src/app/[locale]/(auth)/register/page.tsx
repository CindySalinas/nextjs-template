import type { Metadata } from 'next'

import { RegisterForm } from '@/features/auth'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Create account',
  description: 'Create a new account.',
  locale: 'en',
  path: '/register',
  noIndex: true,
})

export default function RegisterPage() {
  return (
    <div className="border-border bg-background rounded-lg border p-8">
      <h1 className="mb-6 text-2xl font-bold">Create account</h1>
      <RegisterForm />
    </div>
  )
}
