'use client'

import { MockAuthProvider, useAuthContext, useAuthGuard } from '@/features/auth'
import { Link } from '@/lib/i18n/navigation'
import { LogoutButton } from '@/shared/LogoutButton'

function ProtectedLayoutSkeleton() {
  return (
    <div className="flex min-h-screen">
      <aside className="border-border bg-muted/30 flex w-64 flex-col border-r p-4">
        <div className="flex flex-col gap-2">
          <div className="bg-muted h-8 animate-pulse rounded-md" />
          <div className="bg-muted h-8 animate-pulse rounded-md" />
        </div>
        <div className="mt-auto pt-4">
          <div className="bg-muted h-8 animate-pulse rounded-md" />
        </div>
      </aside>
      <main className="flex-1 p-8">
        <div className="bg-muted mb-4 h-8 w-48 animate-pulse rounded-md" />
        <div className="bg-muted h-4 w-full animate-pulse rounded-md" />
      </main>
    </div>
  )
}

function ProtectedShell({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuthContext()
  const { isLoading, user } = useAuthGuard()

  if (isLoading) return <ProtectedLayoutSkeleton />
  if (!user) return null

  return (
    <div className="flex min-h-screen">
      <aside className="border-border bg-muted/30 flex w-64 flex-col border-r p-4">
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="hover:bg-muted rounded-md px-3 py-2 text-sm">
            Dashboard
          </Link>
          <Link href="/settings" className="hover:bg-muted rounded-md px-3 py-2 text-sm">
            Settings
          </Link>
        </nav>
        <div className="mt-auto pt-4">
          <LogoutButton signOut={signOut} />
        </div>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <MockAuthProvider>
      <ProtectedShell>{children}</ProtectedShell>
    </MockAuthProvider>
  )
}
