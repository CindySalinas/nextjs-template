/**
 * Integration test: MockAuthProvider + LoginForm together.
 * Unlike the component test, this does NOT mock useAuthContext — it uses the
 * real provider to verify the full sign-in flow end-to-end in jsdom.
 * Only the navigation module is mocked because real routing requires a browser.
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from '@/features/auth/components/LoginForm'
import { MockAuthProvider } from '@/features/auth/providers/MockAuthProvider'
import { MOCK_SESSION_COOKIE } from '@/lib/auth/types'

import messages from '../../messages/en.json'

const mockPush = vi.fn()

vi.mock('@/lib/i18n/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
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
    document.cookie = `${MOCK_SESSION_COOKIE}=; max-age=0`
  })

  it('signs in with any credentials and redirects to /dashboard', async () => {
    const user = userEvent.setup()
    renderAuthFlow()

    await user.type(screen.getByLabelText(/email/i), 'cindy@example.com')
    await user.type(screen.getByLabelText(/password/i), 'any-password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('sets the session cookie on sign in', async () => {
    const user = userEvent.setup()
    renderAuthFlow()

    await user.type(screen.getByLabelText(/email/i), 'cindy@example.com')
    await user.type(screen.getByLabelText(/password/i), 'any-password')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(document.cookie).toContain(MOCK_SESSION_COOKIE)
    })
  })
})
