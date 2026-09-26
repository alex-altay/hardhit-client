<template>
  <section>
    <h1 class="uppercase text-[4rem] font-black text-center">Magazine Issues</h1>
    <p class="pb-8 text-center text-[15px]">
      Click on any magazine to download it. They are all FREE
    </p>
    <div class="flex flex-row w-full gap-3">
      <div v-for="issue in issues" :key="issue.id">
        <NuxtPicture
          :key="issue.id"
          :src="`${strapiOrigin}${issue.cover.url}`"
          sizes="sm:128px md:179px lg:228px"
        />
        <div>
          <h3 class="uppercase">volume {{ issue.volume }}</h3>
          <RichMarkdown v-if="issue.description" :value="issue.description" />
          <UButton :href="`${strapiOrigin}${issue.pdf.url}`" target="_blank">Download</UButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const { strapiOrigin } = useRuntimeConfig().public
const { find } = useStrapi()

const { data: issues } = await useAsyncData('magazine-issues', async () => {
  const { data } = await find<Issue>('issues', {
    populate: '*',
    sort: 'volume:asc',
  })
  return data
})
</script>
