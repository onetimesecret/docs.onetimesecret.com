import { defineConfig } from 'vitest/config';

// Unit tests only — pure TS logic (currently the config generator). No DOM /
// Astro runtime needed, so a plain node environment keeps runs fast.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
    environment: 'node',
  },
});
