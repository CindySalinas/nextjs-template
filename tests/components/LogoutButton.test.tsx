import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import { LogoutButton } from '@/shared/LogoutButton'

describe('LogoutButton', () => {
  it('renders a sign out button', () => {
    render(<LogoutButton signOut={vi.fn()} />)
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
  })

  it('opens confirmation dialog on click', async () => {
    const user = userEvent.setup()
    render(<LogoutButton signOut={vi.fn()} />)

    await user.click(screen.getByRole('button', { name: /sign out/i }))

    expect(screen.getByRole('alertdialog')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /sign out\?/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('calls signOut when confirming the dialog', async () => {
    const user = userEvent.setup()
    const mockSignOut = vi.fn().mockResolvedValue(undefined)
    render(<LogoutButton signOut={mockSignOut} />)

    await user.click(screen.getByRole('button', { name: /sign out/i }))
    await user.click(screen.getByRole('button', { name: /^sign out$/i }))

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledOnce()
    })
  })

  it('does not call signOut when cancelling the dialog', async () => {
    const user = userEvent.setup()
    const mockSignOut = vi.fn()
    render(<LogoutButton signOut={mockSignOut} />)

    await user.click(screen.getByRole('button', { name: /sign out/i }))
    await user.click(screen.getByRole('button', { name: /cancel/i }))

    expect(mockSignOut).not.toHaveBeenCalled()
  })
})
