<template>
  <UApp>
    <TheHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <TheFooter />
  </UApp>
</template>

<script setup lang="ts">
import '~/assets/css/main.css'
import TheHeader from '@/components/ui/TheHeader.vue'
import TheFooter from '@/components/ui/TheFooter.vue'
</script>
