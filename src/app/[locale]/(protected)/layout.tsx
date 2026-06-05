'use client'

import { useAuthContext } from '@/features/auth'
import { Link } from '@/lib/i18n/navigation'
import { LogoutButton } from '@/shared/LogoutButton'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuthContext()

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
