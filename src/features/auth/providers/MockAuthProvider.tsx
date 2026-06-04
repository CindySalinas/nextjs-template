'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { createContext, useCallback, useContext, useState } from 'react'
import { toast } from 'sonner'

import type { AuthUser, SessionState } from '@/lib/auth/types'
import { MOCK_SESSION_COOKIE } from '@/lib/auth/types'

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

  // Initialize from cookie to prevent hydration flash on protected pages
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof document === 'undefined') return null
    return document.cookie.includes(MOCK_SESSION_COOKIE) ? MOCK_USER : null
  })

  const signIn = useCallback(
    async (_email: string, _password: string) => {
      // ⚠️ INSECURE MOCK — replace before production.
      // This cookie is readable by JavaScript (no HttpOnly flag) and unencrypted.
      // Real auth must set cookies server-side: HttpOnly; Secure; SameSite=Lax; Path=/
      document.cookie = `${MOCK_SESSION_COOKIE}=mock-token; path=/`
      setUser(MOCK_USER)
      toast.success('Signed in successfully')

      // Validate ?from= to prevent open redirect
      const from = searchParams.get('from') ?? ''
      const destination = from.startsWith('/') && !from.startsWith('//') ? from : '/dashboard'
      router.replace(destination)
    },
    [router, searchParams]
  )

  const signOut = useCallback(async () => {
    document.cookie = `${MOCK_SESSION_COOKIE}=; path=/; max-age=0`
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
