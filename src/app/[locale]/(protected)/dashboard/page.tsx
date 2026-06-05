'use client'

import { useAuthGuard } from '@/features/auth'
import { DashboardShell } from '@/features/dashboard'

export default function DashboardPage() {
  useAuthGuard()
  return <DashboardShell />
}
