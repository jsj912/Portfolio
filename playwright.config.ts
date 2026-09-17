import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke tests run against a real production build, not the dev server.
 *
 * Port 3100 rather than 3000 so a dev server left running on the default port
 * does not get tested by accident — or shadowed by the test server.
 */
const PORT = 3100;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  timeout: 60_000,

  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
  ],

  webServer: {
    command: `npm run build && npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
    stdout: "pipe",
    stderr: "pipe",
  },
});
