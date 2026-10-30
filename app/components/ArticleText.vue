<template>
  <RichMarkdown class="article-text" :value />
</template>

<script setup lang="ts">
defineProps<{ value?: string | null }>()
</script>

<style scoped>
.article-text :deep(:is(p, h2, h3, h4, ul, ol, blockquote, pre)) {
  max-width: 65ch;
  margin-inline: auto;
}

.article-text :deep(p) {
  margin-block: 0 1.5rem;
  line-height: 1.7;
}

.article-text :deep(p:has(> img)) {
  max-width: none;
  margin-block: 3rem;
}

.article-text > :deep(:first-child) {
  margin-top: 0;
}

.article-text > :deep(:last-child) {
  margin-bottom: 0;
}

.article-text :deep(img) {
  margin-bottom: 0;
}

.article-text :deep(:is(h2, h3, h4)) {
  margin-block: 3rem 1rem;
}

.article-text :deep(blockquote) {
  margin-block: 2.5rem;
  border-left: 4px solid var(--color-brand-primary);
  padding-left: 1.5rem;
  font-size: 1.5rem;
}
</style>
