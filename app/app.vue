<template>
  <UApp>
    <UiSkipLink />
    <UiHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiFooter />
    <UiPageCurtain />
  </UApp>
</template>

<script setup lang="ts">
import '~/assets/css/main.css'

const SITE_NAME = 'Hard Hit Magazine'
const SITE_DESCRIPTION =
  'Hard Hit Magazine: concert photos, band interviews and design analysis of metal artwork'
const OG_IMAGE = { path: '/og-image.jpg', width: 1200, height: 630 }

const { siteUrl } = useRuntimeConfig().public
const route = useRoute()
const pageUrl = computed(() => `${siteUrl}${route.path}`)

useHead({
  titleTemplate: (title) => `${title ? title + ' · ' : ''}${SITE_NAME}`,
  templateParams: { separator: '·', siteName: SITE_NAME },
  link: [{ rel: 'canonical', href: pageUrl }],
})

useSeoMeta({
  description: SITE_DESCRIPTION,
  ogTitle: '%s %separator %siteName',
  ogDescription: SITE_DESCRIPTION,
  ogUrl: pageUrl,
  ogType: 'website',
  ogSiteName: SITE_NAME,
  ogLocale: 'en',
  ogImage: {
    url: `${siteUrl}${OG_IMAGE.path}`,
    width: OG_IMAGE.width,
    height: OG_IMAGE.height,
    type: 'image/jpeg',
    alt: SITE_NAME,
  },
  twitterCard: 'summary_large_image',
})
</script>
