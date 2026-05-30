'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations('auth')

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
        {t('resetSent')}{' '}
        <Link href="/login" className="underline">
          {t('backToSignIn')}
        </Link>
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" placeholder="you@example.com" required />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('sending') : t('sendResetLink')}
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        <Link href="/login" className="underline">
          {t('backToSignIn')}
        </Link>
      </p>
    </form>
  )
}
