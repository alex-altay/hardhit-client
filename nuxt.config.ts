// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/ui', '@nuxt/image'],
  runtimeConfig: {
    apiSecret: '',
    public: {
      strapiUrl: '',
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
  image: {
    format: ['webp'],
    domains: [process.env.NUXT_PUBLIC_STRAPI_URL] as string[],
  },
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
  },
})
