import type { Meta, StoryObj } from '@storybook/nextjs'

import { Input } from '@/ui/input'
import { Label } from '@/ui/label'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { children: 'Email address' } }

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email-input">Email address</Label>
      <Input id="email-input" type="email" placeholder="you@example.com" />
    </div>
  ),
}
