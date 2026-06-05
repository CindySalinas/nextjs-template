import type { Meta, StoryObj } from '@storybook/nextjs'

import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

const meta: Meta<typeof ForgotPasswordForm> = {
  title: 'Features/Auth/ForgotPasswordForm',
  component: ForgotPasswordForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
