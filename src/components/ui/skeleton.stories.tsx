import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from '@/ui/skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Line: Story = { render: () => <Skeleton className="h-4 w-48" /> }

export const Avatar: Story = { render: () => <Skeleton className="h-12 w-12 rounded-full" /> }

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-3 p-4">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-8 w-24 rounded-md" />
    </div>
  ),
}
