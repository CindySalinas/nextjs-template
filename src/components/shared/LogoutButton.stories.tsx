import type { Meta, StoryObj } from '@storybook/react'

import { LogoutButton } from '@/shared/LogoutButton'

const mockSignOut = async () => {
  await Promise.resolve()
}

const meta: Meta<typeof LogoutButton> = {
  title: 'Shared/LogoutButton',
  component: LogoutButton,
  tags: ['autodocs'],
  args: {
    signOut: mockSignOut,
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
