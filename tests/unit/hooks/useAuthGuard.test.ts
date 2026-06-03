import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAuthGuard } from '@/features/auth/hooks/useAuthGuard'
import type { AuthUser } from '@/lib/auth/types'

const mockReplace = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
}))

const mockUseSession = vi.fn()

vi.mock('@/features/auth/hooks/useSession', () => ({
  useSession: () => mockUseSession(),
}))

const mockUser: AuthUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'member',
}

describe('useAuthGuard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects to /login when not authenticated', async () => {
    mockUseSession.mockReturnValue({ user: null, isLoading: false })
    renderHook(() => useAuthGuard())
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/login'))
  })

  it('does not redirect while session is loading', () => {
    mockUseSession.mockReturnValue({ user: null, isLoading: true })
    renderHook(() => useAuthGuard())
    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('does not redirect when authenticated', () => {
    mockUseSession.mockReturnValue({ user: mockUser, isLoading: false })
    renderHook(() => useAuthGuard())
    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('accepts a custom redirect path', async () => {
    mockUseSession.mockReturnValue({ user: null, isLoading: false })
    renderHook(() => useAuthGuard('/sign-in'))
    await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/sign-in'))
  })

  it('returns user and isLoading from session', () => {
    mockUseSession.mockReturnValue({ user: mockUser, isLoading: false })
    const { result } = renderHook(() => useAuthGuard())
    expect(result.current.user).toEqual(mockUser)
    expect(result.current.isLoading).toBe(false)
  })
})
