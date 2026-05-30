import type { Metadata } from 'next'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="border-border bg-muted/30 w-64 border-r p-4">
        <nav className="flex flex-col gap-2">
          <a href="/dashboard" className="hover:bg-muted rounded-md px-3 py-2 text-sm">
            Dashboard
          </a>
          <a href="/settings" className="hover:bg-muted rounded-md px-3 py-2 text-sm">
            Settings
          </a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
