import type { Meta, StoryObj } from '@storybook/nextjs'
import React from 'react'

import { Icons } from '@/shared/Icons'

const meta: Meta = {
  title: 'Shared/Icons',
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

export const AllIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 p-4">
      {(Object.entries(Icons) as [string, React.ComponentType<{ className?: string }>][]).map(
        ([name, Icon]) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <Icon className="h-6 w-6" />
            <span className="text-muted-foreground text-xs">{name}</span>
          </div>
        )
      )}
    </div>
  ),
}
