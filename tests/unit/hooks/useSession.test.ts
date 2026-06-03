import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useSession } from '@/features/auth/hooks/useSession'
import type { AuthUser } from '@/lib/auth/types'

const mockUser: AuthUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'member',
}

const mockUseAuthContext = vi.fn()

vi.mock('@/features/auth/providers/MockAuthProvider', () => ({
  useAuthContext: () => mockUseAuthContext(),
}))

describe('useSession', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns null user and isLoading true while loading', () => {
    mockUseAuthContext.mockReturnValue({ user: null, isLoading: true })
    const { result } = renderHook(() => useSession())
    expect(result.current).toEqual({ user: null, isLoading: true })
  })

  it('returns user when authenticated', () => {
    mockUseAuthContext.mockReturnValue({ user: mockUser, isLoading: false })
    const { result } = renderHook(() => useSession())
    expect(result.current).toEqual({ user: mockUser, isLoading: false })
  })

  it('returns null user when not authenticated', () => {
    mockUseAuthContext.mockReturnValue({ user: null, isLoading: false })
    const { result } = renderHook(() => useSession())
    expect(result.current).toEqual({ user: null, isLoading: false })
  })
})
