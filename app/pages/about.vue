<template>
  <div>
    <UContainer class="py-12">
      <AboutMe />
    </UContainer>
    <AboutTopTen />
    <UContainer class="py-12">
      <AboutHallOfFame />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'full-width' })
useSeoMeta({
  title: 'About',
  description:
    'Who is behind Hard Hit Magazine: the author, the top 10 records that shaped the magazine and the hall of fame of bands seen live',
})
</script>
