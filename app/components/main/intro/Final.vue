<template>
  <div class="absolute inset-0">
    <UiLogo has-glitch class="absolute top-1/2 left-1/2 w-4/5 -translate-1/2 text-highlighted" />
    <div class="absolute inset-x-4 bottom-8 grid min-h-14 grid-cols-3 items-center">
      <UButton
        icon="i-lucide-rotate-ccw"
        color="neutral"
        variant="ghost"
        size="xl"
        aria-label="Replay"
        class="replay-button col-start-3 mb-2 justify-self-end cursor-pointer hover:bg-transparent hover:text-brand active:bg-transparent"
        @click="$emit('replay')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits<{ replay: [] }>()
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .replay-button {
    animation: slide-in-right 1s var(--ease-out);
  }
}

@keyframes slide-in-right {
  from {
    translate: calc(100% + 2rem) 0;
  }
}
</style>
