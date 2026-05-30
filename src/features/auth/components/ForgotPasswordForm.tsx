'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // Replace: call your auth provider password reset API
    await new Promise((r) => setTimeout(r, 1000))
    setSent(true)
    setIsLoading(false)
  }

  if (sent) {
    return (
      <p className="text-muted-foreground text-center text-sm">
        If that email exists, a reset link has been sent.{' '}
        <Link href="/login" className="underline">
          Back to sign in
        </Link>
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" required />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Sending...' : 'Send reset link'}
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        <Link href="/login" className="underline">
          Back to sign in
        </Link>
      </p>
    </form>
  )
}
