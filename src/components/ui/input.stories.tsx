import type { Meta, StoryObj } from '@storybook/nextjs'

import { Input } from '@/ui/input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { placeholder: 'Enter text...' } }
export const Email: Story = { args: { type: 'email', placeholder: 'you@example.com' } }
export const Password: Story = { args: { type: 'password', placeholder: '••••••••' } }
export const Disabled: Story = { args: { placeholder: 'Disabled', disabled: true } }
export const WithValue: Story = { args: { defaultValue: 'Hello world', readOnly: true } }
