'use client'

import { createContext, useContext, useState, useCallback } from 'react'
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
  const [user, setUser] = useState<AuthUser | null>(null)

  const signIn = useCallback(async (_email: string, _password: string) => {
    // Replace with real auth logic
    document.cookie = `${MOCK_SESSION_COOKIE}=mock-token; path=/`
    setUser(MOCK_USER)
  }, [])

  const signOut = useCallback(async () => {
    document.cookie = `${MOCK_SESSION_COOKIE}=; path=/; max-age=0`
    setUser(null)
  }, [])

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
