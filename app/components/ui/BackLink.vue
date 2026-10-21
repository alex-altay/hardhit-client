<template>
  <div class="w-full flex flex-row justify-start">
    <NuxtLink
      :to
      class="mb-8 flex flex-row items-center text-muted transition-colors duration-300 hover:text-brand-primary focus-visible:text-brand-primary motion-reduce:transition-none"
    >
      <UiIconBack class="inline mr-1.5 w-3.5 h-3.5" />
      <span class="font-bold">Back</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ to: string }>()
</script>
