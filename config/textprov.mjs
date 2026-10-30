/**
 * Whether enrolled pages show the reader toggle beside their title. On unless
 * the build-time `SHOW_TEXTPROV_TOGGLE` env var is "false" or "0". Hiding the
 * toggle changes nothing else: enrolled pages are still decoded to clean text.
 *
 * To preview with it hidden: `SHOW_TEXTPROV_TOGGLE=false pnpm dev`.
 *
 * @param {NodeJS.ProcessEnv} [env]
 * @returns {boolean}
 */
export function showTextProvToggle(env = process.env) {
  return !['false', '0'].includes(env.SHOW_TEXTPROV_TOGGLE ?? '');
}

export function provenance() {
  return {
    name: 'docs-textprov',
    hooks: {
      'astro:config:setup': ({ addMiddleware }) => {
        addMiddleware({ entrypoint: new URL('../src/lib/textprov/middleware.ts', import.meta.url), order: 'pre' });
      },
    },
  };
}
