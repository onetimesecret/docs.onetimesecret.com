import { fileURLToPath } from 'node:url';

const vendored = fileURLToPath(new URL('../vendor/textprov/textprov.cjs', import.meta.url)).replaceAll('\\', '/');

// Vite's dev SSR runner evaluates local files as ES modules, so the vendored
// UMD bundle finds no `module` and assigns to an undefined global. Give it a
// module object and export the result. The production bundler converts
// CommonJS itself and rejects `export` in a .cjs file, so this is dev-only.
// The prefix shares the first line, so line numbers do not change.
export const vendoredModule = {
  name: 'docs-textprov-vendor',
  apply: 'serve',
  transform(code, id) {
    if (id.split('?')[0] !== vendored) return null;
    return { code: `const module = { exports: {} }; ${code}\nexport default module.exports;\n`, map: null };
  },
};

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
      'astro:config:setup': ({ addMiddleware, updateConfig }) => {
        updateConfig({ vite: { plugins: [vendoredModule] } });
        addMiddleware({ entrypoint: new URL('../src/lib/textprov/middleware.ts', import.meta.url), order: 'pre' });
      },
    },
  };
}
