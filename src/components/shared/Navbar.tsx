import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { buttonVariants } from '@/ui/button'

export async function Navbar() {
  const t = await getTranslations('nav')

  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm">
            {t('about')}
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground text-sm">
            {t('pricing')}
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className={buttonVariants({ size: 'sm' })}>
            {t('signIn')}
          </Link>
        </div>
      </div>
    </header>
  )
}
