<template>
  <section>
    <h1>Magazine Issues</h1>
    <p class="pb-8 text-center">Click on any magazine to download it. They are all FREE</p>
    <MainIssueSlider :issues />
  </section>
</template>

<script setup lang="ts">
const { find } = useStrapi<Issue>()

const issues = await useStrapiData('magazine-issues', () =>
  find<Issue>('issues', { populate: '*', sort: 'volume:asc' }),
)
</script>
