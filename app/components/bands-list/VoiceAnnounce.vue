<template>
  <p class="sr-only" role="status">{{ announcement }}</p>
</template>

<script setup lang="ts">
import { refDebounced } from '@vueuse/core'

const props = defineProps<{
  count: number
  searchString: string
  withInterview: boolean
  withLive: boolean
}>()

const debouncedSearch = refDebounced(
  toRef(() => props.searchString),
  500,
)
const announcement = ref('')

watch([debouncedSearch, () => props.withInterview, () => props.withLive], () => {
  announcement.value = props.count ? `${formatCount(props.count, 'band')} found` : 'No bands found'
})
</script>
