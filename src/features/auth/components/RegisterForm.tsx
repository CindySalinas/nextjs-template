'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const t = useTranslations('auth')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    // Replace: call your auth provider registration API
    await new Promise((r) => setTimeout(r, 1000))
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">{t('fullName')}</Label>
        <Input id="name" type="text" placeholder="Jane Doe" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">{t('email')}</Label>
        <Input id="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">{t('password')}</Label>
        <Input id="password" type="password" placeholder="••••••••" required />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? t('creatingAccount') : t('register')}
      </Button>
      <p className="text-muted-foreground text-center text-sm">
        {t('alreadyHaveAccount')}{' '}
        <Link href="/login" className="underline">
          {t('signIn')}
        </Link>
      </p>
    </form>
  )
}
