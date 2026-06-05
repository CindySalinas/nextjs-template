import type { Meta, StoryObj } from '@storybook/nextjs'

import { HeroSection } from '@/features/main/components/HeroSection'

const meta: Meta<typeof HeroSection> = {
  title: 'Features/Main/HeroSection',
  component: HeroSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
