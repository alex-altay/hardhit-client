<template>
  <header class="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
    <h1 class="text-balance">{{ title }}</h1>
    <p v-if="lead" class="lead">{{ lead }}</p>
    <div v-if="hasDivider" class="mt-10 h-1 w-16 bg-brand-primary" aria-hidden="true" />
  </header>
</template>

<script setup lang="ts">
defineProps<{ title: string; lead?: string; hasDivider?: boolean }>()
</script>

<style scoped>
.lead {
  font-size: 1.5rem;
  line-height: 1.6;
  text-wrap: pretty;
  color: var(--ui-text-muted);
}
</style>
