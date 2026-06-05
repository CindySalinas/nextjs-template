import type { Meta, StoryObj } from '@storybook/nextjs'

import { TestimonialsSection } from '@/features/main/components/TestimonialsSection'

const meta: Meta<typeof TestimonialsSection> = {
  title: 'Features/Main/TestimonialsSection',
  component: TestimonialsSection,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
