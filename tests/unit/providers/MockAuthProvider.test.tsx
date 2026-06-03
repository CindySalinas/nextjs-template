import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock next/navigation BEFORE importing MockAuthProvider
const mockReplace = vi.fn()
let mockSearchParamsValue: Record<string, string> = {}

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => ({
    // eslint-disable-next-line security/detect-object-injection
    get: (key: string) => mockSearchParamsValue[key] ?? null,
  }),
}))

import { MockAuthProvider, useAuthContext } from '@/features/auth/providers/MockAuthProvider'

function TestConsumer() {
  const { user, signIn, signOut } = useAuthContext()
  return (
    <div>
      <span data-testid="user">{user ? user.name : 'null'}</span>
      <button onClick={() => void signIn('a@b.com', 'pass')}>Sign In</button>
      <button onClick={() => void signOut()}>Sign Out</button>
    </div>
  )
}

function renderProvider() {
  return render(
    <MockAuthProvider>
      <TestConsumer />
    </MockAuthProvider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
  mockSearchParamsValue = {}
  document.cookie = 'mock-session=; path=/; max-age=0'
})

describe('MockAuthProvider', () => {
  it('initializes as null when no session cookie is present', () => {
    renderProvider()
    expect(screen.getByTestId('user').textContent).toBe('null')
  })

  it('initializes user from existing session cookie', () => {
    document.cookie = 'mock-session=mock-token; path=/'
    renderProvider()
    expect(screen.getByTestId('user').textContent).toBe('Demo User')
  })

  it('redirects to /dashboard after sign in when no ?from= param', async () => {
    renderProvider()
    await userEvent.click(screen.getByText('Sign In'))
    expect(mockReplace).toHaveBeenCalledWith('/dashboard')
  })

  it('redirects to valid ?from= path after sign in', async () => {
    mockSearchParamsValue = { from: '/settings' }
    renderProvider()
    await userEvent.click(screen.getByText('Sign In'))
    expect(mockReplace).toHaveBeenCalledWith('/settings')
  })

  it('blocks open redirect — absolute URL falls back to /dashboard', async () => {
    mockSearchParamsValue = { from: 'https://evil.com' }
    renderProvider()
    await userEvent.click(screen.getByText('Sign In'))
    expect(mockReplace).toHaveBeenCalledWith('/dashboard')
  })

  it('blocks open redirect — protocol-relative URL falls back to /dashboard', async () => {
    mockSearchParamsValue = { from: '//evil.com' }
    renderProvider()
    await userEvent.click(screen.getByText('Sign In'))
    expect(mockReplace).toHaveBeenCalledWith('/dashboard')
  })

  it('redirects to /login and clears user on sign out', async () => {
    document.cookie = 'mock-session=mock-token; path=/'
    renderProvider()
    await userEvent.click(screen.getByText('Sign Out'))
    expect(mockReplace).toHaveBeenCalledWith('/login')
    expect(screen.getByTestId('user').textContent).toBe('null')
  })
})
