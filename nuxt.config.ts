
// The rest of your Nuxt config...
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  builder: 'vite',

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'nuxt-security',
  ],
  ui: {

  },
  nitro: {
    prerender: {
      concurrency: 250,
      interval: 100,
    },
    publicAssets: [
      {
        dir: 'public',  // This will include the entire public directory
        maxAge: 60 * 60 * 24 * 7  // Cache for 1 week (adjust as needed)
      }
    ]
  },
  content: {
    // or you might have 'mdc' instead of 'content' depending on your setup
    highlight: {
      theme: 'one-dark-pro',
      themes: ['houston', 'aurora-x'],
      langs: ['javascript', 'typescript', 'python', 'perl', 'ruby', 'go', 'powershell', 'csharp', 'bash', 'html', 'css', 'markdown', 'xml']
    }
  },
  image: {
  //  dir: 'assets/img'
  },

  /**
   * Configuration for Nuxt UI Pro.
   *
   * The `uiPro` object contains settings specific to the Nuxt UI Pro module.
   *
   * @property {string} license - The license key for Nuxt UI Pro.
   *   This value is obtained from the environment variable `NUXT_UI_PRO_LICENSE`.
   *   If the environment variable is not set, it falls back to a placeholder
   *   `${NUXT_UI_PRO_LICENSE}` which can be replaced using `envsubst` during deployment.
   *
   *  e.g.
   *
   *    $ export NUXT_UI_PRO_LICENSE
   *    $ envsubst < nuxt.config.ts > nuxt.config.ts.tmp && mv nuxt.config.ts.tmp nuxt.config.ts
   */
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE || '${NUXT_UI_PRO_LICENSE}',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/font.css',
  ],
  vite: {
    assetsInclude: ['@/assets/css/fonts/**/*.woff', '@/**/**/*.woff2'],
    server: {
      allowedHosts: true,
    },
  },
  hooks: {
    // Define `@nuxt/ui` components as global to use them in `.md` (feel free to add those you need)
    'components:extend': (components) => {
      const globals = components.filter(c => ['UButton'].includes(c.pascalName))

      globals.forEach(c => c.global = true)
    }
  },

  colorMode: {
    disableTransition: true
  },

  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true },
    '/api/search.json': { prerender: true },
    '/docs': { redirect: '/docs/introduction', prerender: true }
  },

  devtools: {
    enabled: true
  },

  typescript: {
    strict: false
  },

  future: {
    compatibilityVersion: 4
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  compatibilityDate: '2024-07-11'
})
