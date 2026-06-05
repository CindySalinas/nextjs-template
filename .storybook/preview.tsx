import '../src/styles/globals.css'

import type { Preview } from '@storybook/react'
import { NextIntlClientProvider } from 'next-intl'
import React from 'react'

import messages from '../messages/en.json'
import { MockAuthProvider } from '../src/features/auth/providers/MockAuthProvider'

const preview: Preview = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale="en" messages={messages}>
        <MockAuthProvider>
          <Story />
        </MockAuthProvider>
      </NextIntlClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
}

export default preview
