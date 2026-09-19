<template>
  <UApp>
    <TheHeader />
    <UMain class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <NuxtPage />
    </UMain>
    <TheFooter />
  </UApp>
</template>

<script setup lang="ts">
import '~/assets/css/main.css'
import TheHeader from '@/components/ui/TheHeader.vue'
import TheFooter from '@/components/ui/TheFooter.vue'
</script>
