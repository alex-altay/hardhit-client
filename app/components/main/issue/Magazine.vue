<template>
  <section>
    <h2 v-animate class="title-page">Magazine Issues</h2>
    <p class="pb-8 text-center">Click on any magazine to download it. They are all FREE</p>
    <MainIssueSlider :issues />
  </section>
</template>

<script setup lang="ts">
const { find } = useStrapi()

const issues = await useStrapiData('magazine-issues', () =>
  find<Issue>('issues', { populate: '*', sort: 'volume:asc' }),
)
</script>
