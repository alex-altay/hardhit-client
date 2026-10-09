<template>
  <div>
    <UContainer class="py-12">
      <AboutMe />
    </UContainer>
    <AboutTopTen />
    <UContainer class="py-12">
      <AboutHallOfFame />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'full-width' })
</script>
