<template>
  <div class="h-screen w-screen flex flex-col justify-center items-center">
    <div class="max-w-100 flex flex-col items-center text-center">
      <h1 v-animate>{{ view.title }}</h1>
      <h3 class="mb-16">{{ view.text }}</h3>
      <a href="/" @click.prevent="clearError({ redirect: '/' })">Go back home</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const view = computed(() => {
  switch (error.status) {
    case HttpStatus.NotFound:
      return { title: '404', text: 'Page not found' }
    case HttpStatus.NetworkError:
      return { title: 'No connection', text: 'Check your internet connection and try again' }
    default:
      return { title: 'Oops', text: 'Something terrible has just happened, try again later' }
  }
})
</script>
