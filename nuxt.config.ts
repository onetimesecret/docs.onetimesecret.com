// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: ['nuxt-content-assets', '@nuxt/content', '@nuxt/eslint', '@nuxt/image', '@nuxt/ui', // make sure to add before content!
   '@vueuse/nuxt', 'nuxt-og-image', 'nuxt-security'],
  ui: {

  },
  content: {
    documentDriven: true
  },
  image: {
  //  dir: 'assets/img'
  },
  uiPro: {
    license: process.env.NUXT_UI_PRO_LICENSE,
  },
  css: [
    '~/assets/css/main.css',
  ],
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
    '/docs': { redirect: '/docs/getting-started', prerender: false }
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
