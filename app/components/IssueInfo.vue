<template>
  <div class="flex flex-col justify-center">
    <p class="title-section mb-2 uppercase text-brand-strong font-bold">
      volume {{ issue.volume }}
    </p>
    <ul v-if="issue.highlights.length" class="highlights my-5 text-xl leading-7 text-pretty">
      <li v-for="item in issue.highlights" :key="item.id" class="flex gap-2">
        {{ item.highlight }}
      </li>
    </ul>
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
defineProps<{ issue: Pick<Issue, 'volume' | 'highlights' | 'pdf'> }>()
</script>

<style scoped>
.highlights li::before {
  content: '🤘';
  content: '🤘' / '';
}
</style>
