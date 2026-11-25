<template>
  <div
    class="sticky bottom-4 sm:bottom-8 z-40 h-12 -mt-20 mb-8 px-4 sm:px-8 flex flex-row justify-end pointer-events-none"
  >
    <Transition
      enter-active-class="transition-opacity duration-300 motion-reduce:transition-none"
      leave-active-class="transition-opacity duration-300 motion-reduce:transition-none"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <button
        v-show="isVisible"
        type="button"
        aria-label="Back to filters"
        class="pointer-events-auto cursor-pointer rounded-full drop-shadow-lg transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none"
        @click="backToTop"
      >
        <UiIconBack class="size-12 rotate-90" aria-hidden="true" />
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ targetId: string }>()

const isVisible = ref(false)

function onScroll() {
  const marker = document.getElementById(props.targetId)
  isVisible.value = !!marker && marker.getBoundingClientRect().top < 0
}

function backToTop() {
  const target = document.getElementById(props.targetId)
  if (!target) {
    return
  }
  target.scrollIntoView({ behavior: isPreferredReducedMotion() ? 'auto' : 'smooth' })
  target.tabIndex = -1
  target.focus({ preventScroll: true })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
