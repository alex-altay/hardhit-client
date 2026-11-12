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

useHead({
  titleTemplate: (title) => `${title ? title + ' · ' : ''}Hard Hit Magazine`,
})
</script>
