import { defineConfig, devices } from '@playwright/test';

const testTags = '@regression';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    trace: 'on'
  },
  reporter:  [['html', { outputFolder: 'playwright-report', open: 'never' }]],
  projects: [
    {
      name: 'airlo-test',
      grep: new RegExp(testTags),
      testMatch: ['tests/**/*.spec.ts']
    }
  ]
});
