import { defineConfig } from 'vitest/config';

// Unit tests only — pure logic (the config generator, and the helpers behind
// the bin/check-*.mjs drift checks). No DOM / Astro runtime needed, so a plain
// node environment keeps runs fast.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'bin/**/*.test.mjs'],
    environment: 'node',
  },
});
