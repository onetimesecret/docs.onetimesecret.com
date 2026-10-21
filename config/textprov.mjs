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
