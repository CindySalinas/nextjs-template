import type { Meta, StoryObj } from '@storybook/nextjs'

import { Navbar } from '@/shared/Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Shared/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
