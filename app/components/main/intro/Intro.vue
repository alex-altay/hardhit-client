<template>
  <section
    ref="section"
    class="@container relative -mt-(--ui-header-height) h-screen overflow-hidden"
  >
    <MainIntroFinal v-if="isFinalFrame" @replay="replay" />
    <template v-else>
      <MainIntroLoader v-if="isLoading" />
      <MainIntroFrame
        v-for="(_, index) in FRAMES_COUNT"
        v-show="isPlaying && index === currentFrameNumber"
        :key="index"
        :index
      />
      <div
        v-if="isPlaying"
        class="word absolute inset-x-0 top-[calc(50%-3.52cqw)] -translate-y-1/2 text-center text-[16.93cqw] leading-none font-bold uppercase text-highlighted light:[-webkit-text-stroke:0.001em_var(--color-white)] light:[paint-order:stroke_fill]"
      >
        {{ word }}
      </div>
    </template>
    <div
      v-if="!isLoading"
      class="pointer-events-none absolute inset-x-4 bottom-8 grid grid-cols-3 items-center"
    >
      <UiScrollDownButton
        class="pointer-events-auto col-start-2 justify-self-center"
        :scroll-target-id
        screen-reader-label="Scroll to the magazine"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { FRAMES_COUNT } from './Frame.vue'

defineProps<{ scrollTargetId: string }>()

const PRELOAD_TIMEOUT = 3000
const ANIMATION_DURATION = 3000
const WORDS = ['metal', 'design', 'photos']

// Play only when the site is opened on the main page, if not - show final frame
const hasIntroFinished = useHasIntroFinished()
if (import.meta.client && !useNuxtApp().isHydrating) {
  hasIntroFinished.value = true
}

let preloadTimer: ReturnType<typeof setTimeout> | undefined
let nextFotoTimer: ReturnType<typeof setTimeout> | undefined
const section = useTemplateRef('section')
const isPlaying = ref(false)
const currentFrameNumber = ref(hasIntroFinished.value ? FRAMES_COUNT : 0)
const isFinalFrame = computed(() => currentFrameNumber.value === FRAMES_COUNT)
const isLoading = computed(() => !isPlaying.value && !isFinalFrame.value)
const word = computed(
  () => WORDS[Math.floor((currentFrameNumber.value * WORDS.length) / FRAMES_COUNT)],
)

watch(isFinalFrame, (value) => {
  if (value) {
    hasIntroFinished.value = true
  }
})

function stopOnScroll() {
  if (window.scrollY > 0) {
    hasIntroFinished.value = true
  }
}

function scheduleNext() {
  nextFotoTimer = setTimeout(() => {
    currentFrameNumber.value++
    if (!isFinalFrame.value) {
      scheduleNext()
    }
  }, ANIMATION_DURATION / FRAMES_COUNT)
}

async function waitForPhotos() {
  await nextTick()
  const photos = [...(section.value?.querySelectorAll('img') ?? [])]
  const areLoaded = Promise.all(photos.map((photo) => photo.decode().catch(() => {}))).then(
    () => true,
  )
  const areTimeouted = new Promise<boolean>((resolve) => {
    preloadTimer = setTimeout(() => resolve(false), PRELOAD_TIMEOUT)
  })
  return Promise.race([areLoaded, areTimeouted]).finally(() => clearTimeout(preloadTimer))
}

async function play() {
  const isLoaded = await waitForPhotos()
  if (!section.value) {
    return
  }
  if (!isLoaded) {
    currentFrameNumber.value = FRAMES_COUNT
    return
  }
  isPlaying.value = true
  scheduleNext()
}

function replay() {
  clearTimeout(nextFotoTimer)
  currentFrameNumber.value = 0
  isPlaying.value = false
  play()
}

onMounted(() => {
  if (isFinalFrame.value) {
    return
  }
  window.addEventListener('scroll', stopOnScroll, { passive: true })
  if (isPreferredReducedMotion()) {
    currentFrameNumber.value = FRAMES_COUNT
  } else {
    play()
  }
})

onBeforeUnmount(() => {
  clearTimeout(preloadTimer)
  clearTimeout(nextFotoTimer)
  window.removeEventListener('scroll', stopOnScroll)
})
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
  .word {
    animation: word-grow v-bind("ANIMATION_DURATION + 'ms'") linear;
  }
}

@keyframes word-grow {
  from {
    scale: 0.95;
  }
}
</style>
