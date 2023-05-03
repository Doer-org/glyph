// https://storybook.js.org/addons/storycap
import type { Preview } from '@storybook/react';
import { withScreenshot } from 'storycap';

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
};

export const decorators = [
  withScreenshot, // Registration the decorator is required
];
