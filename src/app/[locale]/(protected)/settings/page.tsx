'use client'

import { useAuthContext, useSession } from '@/features/auth'
import { SettingsShell } from '@/features/settings'

export default function SettingsPage() {
  const { user } = useSession()
  const { signOut } = useAuthContext()
  return <SettingsShell user={user} signOut={signOut} />
}
