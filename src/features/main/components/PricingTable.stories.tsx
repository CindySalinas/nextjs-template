import type { Meta, StoryObj } from '@storybook/react'

import { PricingTable } from '@/features/main/components/PricingTable'

const meta: Meta<typeof PricingTable> = {
  title: 'Features/Main/PricingTable',
  component: PricingTable,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
