<template>
  <div class="flex max-w-150 flex-col items-center text-center">
    <template v-if="hasWon">
      <h1
        ref="heading"
        tabindex="-1"
        class="glitch-text glitch-loop text-brand"
        data-text="Flawless Victory"
      >
        Flawless Victory
      </h1>
      <div class="mb-12 text-xl text-balance">
        As a reward we have prepared an article just for you. It lives on a page that nobody else on
        the site can see
      </div>
      <UButton
        color="brand"
        size="xl"
        class="mb-6 cursor-pointer"
        @click="clearError({ redirect: '/backstage' })"
      >
        Go backstage
      </UButton>
    </template>
    <template v-else>
      <h1 ref="heading" tabindex="-1">{{ correctCount }} / {{ total }}</h1>
      <p class="title-section mb-16">Game over. Wanna listen to some Taylor Swift?</p>
      <UButton color="brand" size="xl" class="mb-6 cursor-pointer" @click="$emit('restart')">
        Play again
      </UButton>
    </template>
    <a href="/" @click.prevent="clearError({ redirect: '/' })">Go back home</a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ hasWon: boolean; correctCount: number; total: number }>()
defineEmits<{ restart: [] }>()

const heading = useTemplateRef('heading')
onMounted(() => focusElementForScreenReader(heading.value))
</script>
