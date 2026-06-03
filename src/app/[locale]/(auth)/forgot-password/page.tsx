import type { Metadata } from 'next'

import { ForgotPasswordForm } from '@/features/auth'
import { generatePageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = generatePageMetadata({
  title: 'Forgot password',
  description: 'Reset your password.',
  path: '/forgot-password',
  noIndex: true,
})

export default function ForgotPasswordPage() {
  return (
    <div className="border-border bg-background rounded-lg border p-8">
      <h1 className="mb-6 text-2xl font-bold">Forgot password</h1>
      <ForgotPasswordForm />
    </div>
  )
}
