import Link from 'next/link'
import { buttonVariants } from '@/ui/button'

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-5xl leading-tight font-bold tracking-tight md:text-6xl">
        Build your next product
        <br />
        <span className="text-primary">faster</span>
      </h1>
      <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg">
        A production-ready Next.js 16 boilerplate with everything you need to ship in 2026.
      </p>
      <div className="mt-10 flex justify-center gap-4">
        <Link href="/register" className={buttonVariants({ size: 'lg' })}>
          Get started
        </Link>
        <Link href="/pricing" className={buttonVariants({ size: 'lg', variant: 'outline' })}>
          See pricing
        </Link>
      </div>
    </section>
  )
}
