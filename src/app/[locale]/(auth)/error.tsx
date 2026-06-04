'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="from-background to-muted/20 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b p-4">
      <div className="border-border/50 bg-background/80 w-full max-w-md space-y-6 rounded-2xl border p-8 shadow-sm backdrop-blur-sm">
        <div className="bg-destructive/10 mx-auto flex h-14 w-14 items-center justify-center rounded-full">
          <svg
            className="text-destructive h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-xl font-semibold tracking-tight">Something went wrong</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {error.message || 'An unexpected error occurred.'}
          </p>
          {error.digest && (
            <p className="text-muted-foreground/60 font-mono text-xs">Error ID: {error.digest}</p>
          )}
        </div>
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
