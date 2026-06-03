import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard'
import type { AuthUser } from '@/lib/auth/types'

const mockUseAuthContext = vi.fn()

vi.mock('@/features/auth/providers/MockAuthProvider', () => ({
  useAuthContext: () => mockUseAuthContext(),
}))

const mockUser: AuthUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'member',
}

describe('useAuthGuard', () => {
  it('returns user and isLoading from session when authenticated', () => {
    mockUseAuthContext.mockReturnValue({
      user: mockUser,
      isLoading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
    })
    const { result } = renderHook(() => useAuthGuard())
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isLoading).toBe(false)
  })

  it('returns null user and isLoading:false when unauthenticated', () => {
    mockUseAuthContext.mockReturnValue({
      user: null,
      isLoading: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
    })
    const { result } = renderHook(() => useAuthGuard())
    expect(result.current.user).toBeNull()
    expect(result.current.isLoading).toBe(false)
  })

  it('returns isLoading:true while session is resolving', () => {
    mockUseAuthContext.mockReturnValue({
      user: null,
      isLoading: true,
      signIn: vi.fn(),
      signOut: vi.fn(),
    })
    const { result } = renderHook(() => useAuthGuard())
    expect(result.current.isLoading).toBe(true)
  })
})
