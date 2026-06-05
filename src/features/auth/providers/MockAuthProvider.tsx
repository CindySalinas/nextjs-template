'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { createContext, useCallback, useContext, useState } from 'react'
import { toast } from 'sonner'

import { getToken, removeToken, setToken } from '@/lib/auth/storage'
import type { AuthUser, SessionState } from '@/lib/auth/types'
import { MOCK_JWT } from '@/lib/auth/types'

interface AuthContextValue extends SessionState {
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

const MOCK_USER: AuthUser = {
  id: 'mock-user-1',
  email: 'user@example.com',
  name: 'Demo User',
  role: 'member',
}

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [user, setUser] = useState<AuthUser | null>(() => (getToken() ? MOCK_USER : null))

  const signIn = useCallback(
    async (_email: string, _password: string) => {
      setToken(MOCK_JWT)
      setUser(MOCK_USER)
      toast.success('Signed in successfully')

      const from = searchParams.get('from') ?? ''
      const destination = from.startsWith('/') && !from.startsWith('//') ? from : '/dashboard'
      router.replace(destination)
    },
    [router, searchParams]
  )

  const signOut = useCallback(async () => {
    removeToken()
    setUser(null)
    toast.success('Signed out')
    router.replace('/login')
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isLoading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext must be used within MockAuthProvider')
  return ctx
}
