// src/env.d.ts
//
// tsc has no single-file-component compiler, so a `.vue` import (the
// ConfigGenerator component test) needs this module declaration to type-check.
// Vite and Astro resolve .vue files themselves; this only tells the type
// checker what such an import is.
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// textprov 0.2.1 is a JavaScript package without bundled declarations.
declare module 'textprov';
