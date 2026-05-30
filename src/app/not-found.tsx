import Link from 'next/link'

import { buttonVariants } from '@/ui/button'

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
