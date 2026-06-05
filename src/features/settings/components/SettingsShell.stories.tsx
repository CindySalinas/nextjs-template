import type { Meta, StoryObj } from '@storybook/react'

import { SettingsShell } from '@/features/settings/components/SettingsShell'

const meta: Meta<typeof SettingsShell> = {
  title: 'Features/Settings/SettingsShell',
  component: SettingsShell,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
