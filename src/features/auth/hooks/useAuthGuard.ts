'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from './useSession'

export function useAuthGuard(redirectTo = '/login') {
  const { user, isLoading } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(redirectTo)
    }
  }, [user, isLoading, router, redirectTo])

  return { user, isLoading }
}
