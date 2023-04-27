/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  define: {
    'import.meta.vitest': false,
  },
  test: {
    includeSource: ['src/**/*.{js,ts}'],
    setupFiles: ['test/setup.ts'],},
});
