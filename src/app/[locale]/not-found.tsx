import type { Metadata } from 'next'

import { Link } from '@/lib/i18n/navigation'
import { buttonVariants } from '@/ui/button'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-muted-foreground text-6xl font-bold">404</h1>
      <p className="text-xl">Page not found</p>
      <Link href="/" className={buttonVariants()}>
        Go home
      </Link>
    </div>
  )
}
