import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-themes'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.resolve = config.resolve ?? {}
    config.resolve.alias = {
      ...config.resolve.alias,
      // Mock next-intl server functions (getTranslations, setRequestLocale, etc.)
      // These are async server functions that don't run in a browser/jsdom environment.
      'next-intl/server': path.resolve(__dirname, './__mocks__/next-intl-server.ts'),
    }
    return config
  },
}

export default config
