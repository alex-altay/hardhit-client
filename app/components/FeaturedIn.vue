<template>
  <div>
    <h3>Featured In</h3>
    <div class="h-72 flex flex-row gap-6">
      <NuxtImg
        class="h-full w-auto"
        format="webp"
        :src="`${strapiOrigin}${issue.cover?.url}`"
        sizes="sm:128px md:179px lg:228px"
      />
      <div class="w-70 flex flex-col justify-center">
        <h3 class="uppercase">volume {{ issue.volume }}</h3>
        <RichMarkdown v-if="issue.description" :value="issue.description" />
        <UButton :href="`${strapiOrigin}${issue.pdf.url}`" target="_blank">Download</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ issue: IssueRef }>()
const { strapiOrigin } = useRuntimeConfig().public
</script>
