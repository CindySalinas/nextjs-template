import type { Meta, StoryObj } from '@storybook/nextjs'

import { RegisterForm } from '@/features/auth/components/RegisterForm'

const meta: Meta<typeof RegisterForm> = {
  title: 'Features/Auth/RegisterForm',
  component: RegisterForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
