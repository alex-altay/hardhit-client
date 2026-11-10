<template>
  <a
    href="#main"
    class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-brand-primary focus:px-4 focus:py-2 focus:font-bold focus:uppercase focus:text-white focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-inverted"
    @click.prevent="skipToMain"
    @keydown.space.prevent="skipToMain"
  >
    Skip to content
  </a>
</template>

<script setup lang="ts">
function skipToMain() {
  const main = document.querySelector('main')
  if (!main) {
    return
  }
  main.tabIndex = -1
  main.focus({ preventScroll: true })
}
</script>
