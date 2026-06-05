'use client'

import { useAuthContext, useAuthGuard } from '@/features/auth'
import { SettingsShell } from '@/features/settings'

export default function SettingsPage() {
  const { user } = useAuthGuard()
  const { signOut } = useAuthContext()
  return <SettingsShell user={user} signOut={signOut} />
}
