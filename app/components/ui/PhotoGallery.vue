<template>
  <div class="relative flex-1 w-full">
    <div class="relative w-full">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="images"
        class="relative w-full"
        @select="onSelect"
      >
        <div class="w-full aspect-3/2 overflow-hidden">
          <NuxtImg :src="item" class="w-full h-full object-cover" />
        </div>
      </UCarousel>
      <ExpandIcon
        class="absolute bottom-2 right-2 z-10 w-5 h-5 cursor-pointer"
        role="button"
        tabindex="0"
        aria-label="Open photo fullscreen"
        @click="isFullscreen = true"
        @keydown.enter="isFullscreen = true"
        @keydown.space.prevent="isFullscreen = true"
      />
    </div>
    <div class="relative flex gap-5 justify-between pt-4 w-full mx-auto">
      <NuxtImg
        v-for="(item, index) in images"
        :key="index"
        :class="{ 'opacity-100': activeIndex === index }"
        class="w-[20%] object-cover"
        loading="lazy"
        :src="item"
        @click="select(index)"
      />
    </div>

    <UModal
      v-model:open="isFullscreen"
      fullscreen
      title="Photo"
      :ui="{ content: 'bg-black/95 ring-0 divide-y-0' }"
    >
      <template #content="{ close }">
        <div class="relative flex h-full w-full items-center justify-center p-4">
          <NuxtImg
            v-if="images[activeIndex]"
            :src="images[activeIndex]"
            class="max-h-full max-w-full object-contain"
          />

          <button
            type="button"
            aria-label="Previous photo"
            :disabled="activeIndex === 0"
            class="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/70 hover:text-white disabled:cursor-default disabled:opacity-25"
            @click="prevPhoto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Next photo"
            :disabled="activeIndex === images.length - 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/70 hover:text-white disabled:cursor-default disabled:opacity-25"
            @click="nextPhoto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Close"
            class="absolute top-4 right-4 cursor-pointer p-2 text-white/70 hover:text-white"
            @click="close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          <span class="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {{ activeIndex + 1 }} / {{ images.length }}
          </span>
        </div>
      </template>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import ExpandIcon from '@/components/ui/ExpandIcon.vue'

const props = defineProps<{
  images: string[]
}>()

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)
const isFullscreen = ref(false)

function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}

function prevPhoto() {
  if (activeIndex.value > 0) select(activeIndex.value - 1)
}
function nextPhoto() {
  if (activeIndex.value < props.images.length - 1) select(activeIndex.value + 1)
}

function onFullscreenKeydown(event: KeyboardEvent) {
  if (!isFullscreen.value) return

  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    prevPhoto()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    nextPhoto()
  }
}

onMounted(() => window.addEventListener('keydown', onFullscreenKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onFullscreenKeydown))
</script>
