'use client'

import { useAuthContext } from '@/features/auth'
import { SettingsShell } from '@/features/settings'

export default function SettingsPage() {
  const { user, signOut } = useAuthContext()
  return <SettingsShell user={user} signOut={signOut} />
}
