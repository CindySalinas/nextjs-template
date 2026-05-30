import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginForm } from '@/features/auth/components/LoginForm'

const mockSignIn = vi.fn()
const mockPush = vi.fn()

vi.mock('@/features/auth/providers/MockAuthProvider', () => ({
  useAuthContext: () => ({ signIn: mockSignIn }),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}))

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders email and password fields', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('calls signIn with email and password on submit', async () => {
    const user = userEvent.setup()
    mockSignIn.mockResolvedValueOnce(undefined)
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/email/i), 'test@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secret123')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com', 'secret123')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('shows error message when signIn throws', async () => {
    const user = userEvent.setup()
    mockSignIn.mockRejectedValueOnce(new Error('Invalid credentials'))
    render(<LoginForm />)

    await user.type(screen.getByLabelText(/email/i), 'bad@example.com')
    await user.type(screen.getByLabelText(/password/i), 'wrong')
    await user.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument()
    })
  })
})
