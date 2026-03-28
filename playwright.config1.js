import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 5000
  },

  reporter: 'html',

  projects: [
    {
      name: 'firstProject',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        viewport: { width: 1000, height: 500 }

      }
    },
    {
      name: 'secondProject',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'retain-on-failure',
        ...devices['iPhone 12']
      }
    }
  ]
});
