// https://storybook.js.org/addons/storycap
import type { Preview } from '@storybook/react'
import { withScreenshot } from 'storycap'

import { withThemeByClassName } from '@storybook/addon-styling'

/* update import to your tailwind styles file */
import '../src/app/globals.css'

export const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Global parameter is optional.
    screenshot: {
      // Put global screenshot parameters(e.g. viewport)
    },
  },
}

export const decorators = [
  withScreenshot, // Registration the decorator is required
  // Adds theme switching support.
  // NOTE: requires setting "darkMode" to "class" in your tailwind config
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
]
