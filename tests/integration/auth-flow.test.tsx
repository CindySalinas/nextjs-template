/**
 * Integration test: MockAuthProvider + LoginForm together.
 * Unlike the component test, this does NOT mock useAuthContext — it uses the
 * real provider to verify the full sign-in flow end-to-end in jsdom.
 * Only navigation modules are mocked because real routing requires a browser.
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { MockAuthProvider } from '@/features/auth/providers/MockAuthProvider'
import { MOCK_JWT_TOKEN } from '@/lib/auth/types'

import messages from '../../messages/en.json'

const mockReplace = vi.fn()

// MockAuthProvider uses next/navigation for routing
vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => ({ get: () => null }),
}))

vi.mock('@/lib/i18n/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  Link: ({
    href,
    children,
    className,
  }: {
    href: string
    children: React.ReactNode
    className?: string
  }) => React.createElement('a', { href, className }, children),
}))

function renderAuthFlow() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <MockAuthProvider>
        <LoginForm />
      </MockAuthProvider>
    </NextIntlClientProvider>
  )
}

describe('Auth flow (integration)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('signs in with any credentials and redirects to /dashboard', async () => {
    const user = userEvent.setup()
    renderAuthFlow()

    await user.type(screen.getByLabelText(/email/i), 'cindy@example.com')
    await user.type(screen.getByLabelText(/password/i), 'any-password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('sets the JWT in localStorage on sign in', async () => {
    const user = userEvent.setup()
    renderAuthFlow()

    await user.type(screen.getByLabelText(/email/i), 'cindy@example.com')
    await user.type(screen.getByLabelText(/password/i), 'any-password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(localStorage.getItem(MOCK_JWT_TOKEN)).not.toBeNull()
    })
  })
})
