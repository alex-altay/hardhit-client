<template>
  <div class="h-full flex flex-row shrink-0">
    <div
      class="h-80 shrink-0 cursor-pointer aspect-[1/1.414] hover-light-streak hover-zoom"
      @click="$emit('toggle')"
    >
      <NuxtImg
        :src="getMediaLink(issue.cover)"
        class="block h-full w-full object-cover"
        sizes="320px"
        format="webp"
      />
    </div>
    <div
      :class="isOpen ? 'grid-cols-[1fr]' : 'grid-cols-[0fr]'"
      class="grid transition-[grid-template-columns] ease-out motion-reduce:transition-none"
      :style="transitionStyle"
      :inert="!isOpen"
    >
      <div class="flex min-w-0 overflow-hidden">
        <IssueInfo
          :issue
          :class="isOpen ? 'opacity-100' : 'opacity-0'"
          class="shrink-0 w-max max-w-[min(80vw,400px)] pl-5 transition-opacity motion-reduce:transition-none"
          :style="transitionStyle"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ issue: Issue; isOpen: boolean }>()
defineEmits<{ toggle: [] }>()

const transitionStyle = { transitionDuration: `${PANEL_TRANSITION_MS}ms` }
</script>
