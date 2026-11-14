<template>
  <main id="main" class="min-h-screen w-full flex flex-col justify-center items-center px-4 py-12">
    <GameMain v-if="hasStarted" />
    <div v-else class="max-w-150 flex flex-col items-center text-center">
      <h1 class="glitch-text glitch-loop" :data-text="view.title">{{ view.title }}</h1>
      <p class="title-section mb-16">{{ view.text }}</p>
      <UButton
        color="brand"
        size="xl"
        class="mb-6 min-w-30 cursor-pointer"
        @click="hasStarted = true"
      >
        Let's play
      </UButton>
      <a href="/" @click.prevent="clearError({ redirect: '/' })">Go back home</a>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const hasStarted = ref(false)
const view = computed(() => {
  switch (error.status) {
    case HttpStatus.NotFound:
      return { title: '404 Not Found', text: 'Wanna play a game instead?' }
    case HttpStatus.NetworkError:
      return {
        title: 'No connection',
        text: 'Check your internet connection, or play a game while it is back',
      }
    default:
      return {
        title: 'Oops',
        text: 'Something terrible has just happened, try again later or play a game',
      }
  }
})

useSeoMeta({ title: () => view.value.title })
</script>
