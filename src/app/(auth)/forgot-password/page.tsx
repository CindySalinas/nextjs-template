import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Forgot password' }

export default function ForgotPasswordPage() {
  return (
    <div className="border-border bg-background rounded-lg border p-8">
      <h1 className="mb-6 text-2xl font-bold">Forgot password</h1>
    </div>
  )
}
