import type { Meta, StoryObj } from '@storybook/react'

import { ThemeToggle } from '@/shared/ThemeToggle'

const meta: Meta<typeof ThemeToggle> = {
  title: 'Shared/ThemeToggle',
  component: ThemeToggle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
