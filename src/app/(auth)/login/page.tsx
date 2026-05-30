import type { Metadata } from 'next'
import { LoginForm } from '@/features/auth'

export const metadata: Metadata = { title: 'Sign in' }

export default function LoginPage() {
  return (
    <div className="border-border bg-background rounded-lg border p-8">
      <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
      <LoginForm />
    </div>
  )
}
