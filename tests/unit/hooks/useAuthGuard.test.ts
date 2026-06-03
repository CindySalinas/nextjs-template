import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard'

vi.mock('@/features/auth/providers/MockAuthProvider', () => ({
  useAuthContext: () => ({ user: null, isLoading: false, signIn: vi.fn(), signOut: vi.fn() }),
}))

describe('useAuthGuard', () => {
  it('returns session state from useSession', () => {
    const { result } = renderHook(() => useAuthGuard())
    expect(result.current).toEqual({ user: null, isLoading: false })
  })
})
