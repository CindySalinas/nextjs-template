import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from '@/features/auth/components/LoginForm'

import messages from '../../messages/en.json'

const mockSignIn = vi.fn()

vi.mock('@/features/auth/providers/MockAuthProvider', () => ({
  useAuthContext: () => ({ signIn: mockSignIn }),
}))

vi.mock('@/lib/i18n/navigation', () => ({
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

function renderLoginForm() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <LoginForm />
    </NextIntlClientProvider>
  )
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email and password fields', () => {
    renderLoginForm()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('calls signIn with email and password on submit', async () => {
    const user = userEvent.setup()
    mockSignIn.mockResolvedValueOnce(undefined)
    renderLoginForm()

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'secret123')
    })
    // Redirect is handled by MockAuthProvider — not asserted here
  })

  it('shows error message when signIn throws', async () => {
    const user = userEvent.setup()
    mockSignIn.mockRejectedValueOnce(new Error('Invalid'))
    renderLoginForm()

    await user.type(screen.getByLabelText(/email/i), 'bad@example.com')
    await user.type(screen.getByLabelText(/password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })

  it('announces error message to screen readers via role="alert"', async () => {
    const user = userEvent.setup()
    mockSignIn.mockRejectedValueOnce(new Error('Invalid'))
    renderLoginForm()

    await user.type(screen.getByLabelText(/email/i), 'bad@example.com')
    await user.type(screen.getByLabelText(/password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent(/invalid credentials/i)
    })
  })

  it('has an email input associated with a label', () => {
    renderLoginForm()
    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).toHaveAttribute('id', 'email')
  })

  it('has a password input associated with a label', () => {
    renderLoginForm()
    const passwordInput = screen.getByLabelText(/password/i)
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).toHaveAttribute('id', 'password')
  })
})
