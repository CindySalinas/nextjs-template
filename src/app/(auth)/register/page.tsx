import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Create account' }

export default function RegisterPage() {
  return (
    <div className="border-border bg-background rounded-lg border p-8">
      <h1 className="mb-6 text-2xl font-bold">Create account</h1>
    </div>
  )
}
