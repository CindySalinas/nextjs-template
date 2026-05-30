import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Sign in' }

export default function LoginPage() {
  return (
    <div className="border-border bg-background rounded-lg border p-8">
      <h1 className="mb-6 text-2xl font-bold">Sign in</h1>
      <p className="text-muted-foreground text-sm">
        Connect your auth provider — see features/auth/components/LoginForm.tsx
      </p>
    </div>
  )
}
