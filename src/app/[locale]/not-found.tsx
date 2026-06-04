import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { Link } from '@/lib/i18n/navigation'
import { buttonVariants } from '@/ui/button'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default async function NotFound() {
  const t = await getTranslations('notFound')

  return (
    <div className="from-background to-muted/30 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4">
      <div className="border-border/50 bg-background/80 w-full max-w-sm space-y-6 rounded-2xl border p-10 text-center shadow-sm backdrop-blur-sm">
        <p className="from-primary to-primary/40 bg-gradient-to-br bg-clip-text text-8xl font-bold text-transparent">
          404
        </p>
        <div className="space-y-2">
          <p className="text-xl font-semibold tracking-tight">{t('title')}</p>
          <p className="text-muted-foreground text-sm leading-relaxed">{t('description')}</p>
        </div>
        <Link href="/" className={buttonVariants({ className: 'w-full' })}>
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}
