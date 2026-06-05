import type { Meta, StoryObj } from '@storybook/nextjs'

import { Footer } from '@/shared/Footer'

const meta: Meta<typeof Footer> = {
  title: 'Shared/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
