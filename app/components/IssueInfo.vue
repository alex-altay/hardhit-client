<template>
  <div class="flex flex-col justify-center">
    <p class="title-section mb-2 uppercase text-brand-strong font-bold">
      volume {{ issue.volume }}
    </p>
    <RichMarkdown :value="issue.description" class="mb-2" />
    <UButton
      class="w-74 h-9 uppercase"
      :href="getMediaLink(issue.pdf)"
      target="_blank"
      :aria-label="`Download Hard Hit Volume ${issue.volume} (PDF, opens in new tab)`"
    >
      Download
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineProps<{ issue: Pick<Issue, 'volume' | 'description' | 'pdf'> }>()
</script>
