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
      meta: [
        {
          name: 'description',
          content:
            'Hard Hit Magazine: concert photos, band interviews and design analysis of metal artwork',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  nitro: {
    compressPublicAssets: true,
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral', 'brand'],
    },
  },
  image: {
    format: ['webp'],
    domains: [process.env.NUXT_PUBLIC_STRAPI_ORIGIN] as string[],
    presets: {
      fullscreen: { modifiers: { width: 1920, format: 'webp' } },
    },
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
