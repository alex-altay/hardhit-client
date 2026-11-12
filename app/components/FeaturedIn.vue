<template>
  <div>
    <p class="mb-4! font-bold">Featured In</p>
    <div class="flex flex-row flex-wrap gap-6">
      <a
        :href="getMediaLink(issue.pdf)"
        target="_blank"
        rel="noopener"
        :aria-label="`Download ${issue.title}`"
        class="shrink-0 self-start hover-light-streak focus-visible:outline-offset-4"
      >
        <NuxtImg
          class="block h-72 w-auto"
          format="webp"
          :src="getMediaLink(issue.cover)"
          sizes="sm:128px md:179px lg:228px"
        />
      </a>
      <IssueInfo :issue class="w-74" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ issue: IssueRef }>()
</script>
