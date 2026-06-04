'use client'

import { useState } from 'react'

import type { AuthUser } from '@/lib/auth/types'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { Separator } from '@/ui/separator'

interface SettingsShellProps {
  user: AuthUser | null
  signOut: () => Promise<void>
}

type Section = 'profile' | 'appearance' | 'account'

const SECTIONS: { id: Section; label: string }[] = [
  { id: 'profile', label: 'Profile' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'account', label: 'Account' },
]

function getInitials(name: string | undefined): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function SettingsShell({ user, signOut }: SettingsShellProps) {
  const [activeSection, setActiveSection] = useState<Section>('profile')

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-8">
        {/* Mobile: horizontal scroll tabs */}
        <div className="mb-6 flex gap-1 overflow-x-auto border-b pb-0 md:hidden">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={[
                'shrink-0 border-b-2 px-4 pb-3 text-sm font-medium transition-colors duration-150',
                activeSection === s.id
                  ? 'border-primary text-foreground'
                  : 'text-muted-foreground hover:text-foreground border-transparent',
              ].join(' ')}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Desktop: side nav */}
        <nav className="hidden w-48 shrink-0 md:block">
          <ul className="flex flex-col gap-1">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActiveSection(s.id)}
                  className={[
                    'w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-150',
                    activeSection === s.id
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                  ].join(' ')}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content panel */}
        <div className="flex-1">
          {activeSection === 'profile' && (
            <div className="border-border/50 rounded-xl border p-6 shadow-sm">
              <h2 className="mb-6 text-base font-semibold">Profile</h2>

              <div className="mb-6 flex items-center gap-4">
                <div className="from-primary to-primary/60 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-white shadow-sm">
                  {getInitials(user?.name)}
                </div>
                <div>
                  <p className="font-medium">{user?.name ?? '—'}</p>
                  <p className="text-muted-foreground text-sm">{user?.email ?? '—'}</p>
                </div>
              </div>

              <Separator className="mb-6" />

              <dl className="space-y-4">
                {[
                  { label: 'Full name', value: user?.name },
                  { label: 'Email address', value: user?.email },
                  { label: 'Role', value: user?.role },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <dt className="text-muted-foreground text-sm">{label}</dt>
                    <dd className="text-sm font-medium capitalize">{value ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="border-border/50 rounded-xl border p-6 shadow-sm">
              <h2 className="mb-6 text-base font-semibold">Appearance</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-muted-foreground mt-0.5 text-xs">
                    Switch between light and dark mode
                  </p>
                </div>
                <ThemeToggle />
              </div>
            </div>
          )}

          {activeSection === 'account' && (
            <div className="border-border/50 rounded-xl border p-6 shadow-sm">
              <h2 className="mb-6 text-base font-semibold">Account</h2>
              <div className="border-destructive/20 rounded-lg border p-4">
                <p className="text-sm font-medium">Sign out</p>
                <p className="text-muted-foreground mt-0.5 text-xs">
                  End your current session on this device.
                </p>
                <button
                  onClick={() => void signOut()}
                  className="text-destructive hover:bg-destructive/10 focus-visible:ring-destructive/50 mt-4 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
