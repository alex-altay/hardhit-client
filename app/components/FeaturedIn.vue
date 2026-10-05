<template>
  <div>
    <p class="mb-2 font-bold">Featured In</p>
    <div class="flex flex-row flex-wrap gap-6">
      <NuxtImg
        class="h-72 w-auto"
        format="webp"
        :src="getMediaLink(issue.cover)"
        sizes="sm:128px md:179px lg:228px"
      />
      <IssueInfo :issue class="w-74" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ issue: IssueRef }>()
</script>
