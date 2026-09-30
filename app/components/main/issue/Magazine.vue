<template>
  <section>
    <h1>Magazine Issues</h1>
    <p class="pb-8 text-center text-[15px]">
      Click on any magazine to download it. They are all FREE
    </p>
    <MainIssueSlider v-if="issues" :issues />
  </section>
</template>

<script setup lang="ts">
const { find } = useStrapi<Issue>()

const { data: issues } = await useAsyncData('magazine-issues', async () => {
  const { data } = await find<Issue>('issues', {
    populate: '*',
    sort: 'volume:asc',
  })
  return data
})
</script>
