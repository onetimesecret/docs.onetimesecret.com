import { fileURLToPath } from 'node:url';

const vendored = fileURLToPath(new URL('../vendor/textprov/textprov.cjs', import.meta.url)).replaceAll('\\', '/');

// Vite's dev SSR runner evaluates local files as ES modules, so the vendored
// UMD bundle finds no `module` and assigns to an undefined global. Give it a
// module object and export the result. The production bundler converts
// CommonJS itself and rejects `export` in a .cjs file, so this is dev-only.
// The prefix shares the first line, so line numbers do not change.
const vendoredModule = {
  name: 'docs-textprov-vendor',
  apply: 'serve',
  transform(code, id) {
    if (id.split('?')[0] !== vendored) return null;
    return { code: `const module = { exports: {} }; ${code}\nexport default module.exports;\n`, map: null };
  },
};

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
