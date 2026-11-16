<template>
  <Transition
    enter-active-class="transition-opacity duration-300"
    leave-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <button
      v-show="isAlwaysVisible || isAtTop"
      type="button"
      :aria-label="screenReaderLabel"
      class="hidden lg:block cursor-pointer p-2 dark:text-white light:text-brand-strong drop-shadow-lg hover:text-brand-primary transition-colors focus-ring-contrast"
      @click="scrollToTarget"
    >
      <UiIconScrollDown class="size-10 motion-safe:animate-bounce" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  scrollTargetId: string
  screenReaderLabel: string
  isAlwaysVisible?: boolean
}>()

const isAtTop = ref(true)

function onScroll() {
  isAtTop.value = window.scrollY === 0
}

function scrollToTarget() {
  const smooth = !isPreferredReducedMotion()
  document
    .getElementById(props.scrollTargetId)
    ?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
