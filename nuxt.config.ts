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
  routeRules: {
    '/**': {
      headers: {
        'strict-transport-security': 'max-age=31536000',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'referrer-policy': 'strict-origin-when-cross-origin',
        'permissions-policy': 'camera=(), microphone=(), geolocation=()',
        'content-security-policy':
          "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'",
      },
    },
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },
  features: {
    inlineStyles: false,
  },
  nitro: {
    compressPublicAssets: true,
    storage: {
      strapi: { driver: 'lru-cache', max: 500, maxSize: 20 * 1024 * 1024 },
    },
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
    screens: { xs: 320 },
    format: ['webp'],
    domains: [process.env.NUXT_PUBLIC_STRAPI_ORIGIN, 'i.ytimg.com'] as string[],
    ipx: {
      maxAge: 60 * 60 * 24 * 30,
      http: {
        ignoreCacheControl: true,
        maxAge: 60 * 60 * 24 * 30,
      },
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
