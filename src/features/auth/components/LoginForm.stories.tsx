import type { Meta, StoryObj } from '@storybook/nextjs'

import { LoginForm } from '@/features/auth/components/LoginForm'

const meta: Meta<typeof LoginForm> = {
  title: 'Features/Auth/LoginForm',
  component: LoginForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
