import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="from-background to-muted/30 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4">
      <div className="border-border/50 bg-background/80 w-full max-w-sm space-y-6 rounded-2xl border p-10 text-center shadow-sm backdrop-blur-sm">
        <p className="from-primary to-primary/40 bg-gradient-to-br bg-clip-text text-8xl font-bold text-transparent">
          404
        </p>
        <div className="space-y-2">
          <p className="text-xl font-semibold tracking-tight">Page not found</p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The page you&#39;re looking for doesn&#39;t exist.
          </p>
        </div>
        <Link
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}
