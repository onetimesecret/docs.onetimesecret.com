import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

// Unit tests. Most are pure logic (the config generator, the helpers behind the
// bin/check-*.mjs drift checks, the TextProv renderer) and run in a plain node
// environment. The one component test mounts the generator island, so it opts
// into jsdom with a @vitest-environment comment; the Vue plugin compiles the SFC.
export default defineConfig({
  plugins: [vue()],
  test: {
    include: ['src/**/*.test.ts', 'bin/**/*.test.mjs'],
    environment: 'node',
  },
});
