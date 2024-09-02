/* eslint-env node */

/**
 *
 * Follows formatting config via: https://github.com/antfu/eslint-config
 *
 * To view rules in browser, run `pnpx @eslint/config-inspector`
 *
 *   http://localhost:7777/rules
 *
 *
 * Why not dprint/prettier?
 *
 * dprint is in the same model as Prettier which reads the AST and reprints the
 * code from scratch. This means it's similar to Prettier, which ignores the
 * original line breaks and might also cause the inconsistent diff. So in
 * general, we prefer to use ESLint to format and lint JavaScript/TypeScript
 * code.
 *
 *
 * Disabling rules:
 *
 * Use 'ts/' prefix instead of '@typescript-eslint/'.
 *
 *   e.g.
 *        eslint-disable-next-line ts/consistent-type-definitions
 *
 */
import antfu from '@antfu/eslint-config';

export default antfu({
  // Type of the project. 'lib' for libraries, the default is 'app'
  type: 'app',

  'comma-dangle': ['error', 'always-multiline'],


  // Enable stylistic formatting rules
  // stylistic: true,

  // Or customize the stylistic rules
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double',
    semi: true,
  },

  // To enable UnoCSS support, you need to explicitly turn it on:
  unocss: true,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    // Add your ignore patterns here
  ],
});
