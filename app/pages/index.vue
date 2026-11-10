<template>
  <div>
    <MainIntro :scroll-target-id="id" />
    <UContainer class="pt-36 pb-12">
      <MainIssueMagazine :id="id" class="mb-48 scroll-mt-[calc(var(--ui-header-height)+4rem)]" />
      <MainSocialBlock />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'full-width' })
useSeoMeta({
  description:
    'Hard Hit Magazine. Download every issue for free and follow us for new interviews and concert photos',
})
const id = useId()
</script>
