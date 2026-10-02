// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image', '@nuxtjs/strapi', '@comark/nuxt'],
  runtimeConfig: {
    apiSecret: '',
    public: {
      strapiOrigin: '',
    },
  },
  app: {
    head: {
      title: 'Hard Hit Magazine',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  imports: {
    dirs: ['data'],
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral', 'brand'],
    },
  },
  image: {
    format: ['webp'],
    domains: [process.env.NUXT_PUBLIC_STRAPI_ORIGIN] as string[],
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
  strapi: {
    url: '/api/strapi',
    prefix: '',
    version: 'v5',
  },
})
