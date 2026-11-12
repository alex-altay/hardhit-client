<template>
  <div class="w-full sm:w-auto flex flex-row items-center gap-x-4 sm:gap-x-8">
    <UInput
      v-model="search"
      color="brand"
      :highlight="search.length > 0"
      placeholder="Search for a bandname"
      :ui="{ base: 'h-8 rounded-none', trailing: 'pe-1' }"
      class="min-w-0 flex-1 sm:flex-none sm:w-64"
    >
      <template v-if="search.length" #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          class="cursor-pointer"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="search = ''"
        />
      </template>
    </UInput>
    <div class="flex flex-row items-center gap-x-4 sm:gap-x-8">
      <button
        type="button"
        :aria-pressed="withInterview"
        :class="[toggleClass, withInterview ? 'text-brand' : 'text-highlighted']"
        @click="withInterview = !withInterview"
      >
        <UiIconMicrophone class="h-5 sm:h-4 w-auto sm:mr-2" />
        <span class="sr-only sm:not-sr-only">Interview</span>
      </button>
      <button
        type="button"
        :aria-pressed="withLive"
        :class="[toggleClass, withLive ? 'text-brand' : 'text-highlighted']"
        @click="withLive = !withLive"
      >
        <UiIconLive class="h-5 sm:h-4 w-auto sm:mr-2" />
        <span class="sr-only sm:not-sr-only">Live Video</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const search = defineModel<string>('search', { default: '' })
const withInterview = defineModel<boolean>('withInterview', { default: false })
const withLive = defineModel<boolean>('withLive', { default: false })

const toggleClass =
  'flex flex-row items-center whitespace-nowrap cursor-pointer font-medium transition-colors'
</script>
