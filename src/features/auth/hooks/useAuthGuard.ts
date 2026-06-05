'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { useSession } from './useSession'

export function useAuthGuard() {
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!session.isLoading && session.user === null) {
      router.replace('/login')
    }
  }, [session.user, session.isLoading, router])

  return session
}
