<template>
  <div>
    <p class="mb-2 font-bold">Featured In</p>
    <div class="h-72 flex flex-row gap-6">
      <NuxtImg
        class="h-full w-auto"
        format="webp"
        :src="`${strapiOrigin}${issue.cover?.url}`"
        sizes="sm:128px md:179px lg:228px"
      />
      <IssueInfo :issue class="w-70" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ issue: IssueRef }>()
const { strapiOrigin } = useRuntimeConfig().public
</script>
