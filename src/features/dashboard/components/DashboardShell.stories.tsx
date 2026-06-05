import type { Meta, StoryObj } from '@storybook/nextjs'

import { DashboardShell } from '@/features/dashboard/components/DashboardShell'

const meta: Meta<typeof DashboardShell> = {
  title: 'Features/Dashboard/DashboardShell',
  component: DashboardShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Empty: Story = {
  args: {
    stats: [],
  },
}

export const CustomStats: Story = {
  args: {
    stats: [
      { title: 'Signups', value: '5,200', description: '+23% this week' },
      { title: 'MRR', value: '$12,400', description: '+5% this month' },
      { title: 'Churn', value: '1.2%', description: '-0.3% vs last month' },
    ],
  },
}
