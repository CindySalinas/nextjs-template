import Link from 'next/link'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { buttonVariants } from '@/ui/button'

export function Navbar() {
  return (
    <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm">
            About
          </Link>
          <Link href="/pricing" className="text-muted-foreground hover:text-foreground text-sm">
            Pricing
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login" className={buttonVariants({ size: 'sm' })}>
            Sign in
          </Link>
        </div>
      </div>
    </header>
  )
}
