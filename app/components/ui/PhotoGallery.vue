<template>
  <div class="relative flex-1 w-full">
    <div class="relative w-full">
      <UCarousel
        ref="carousel"
        v-slot="{ item, index }"
        :items="images"
        class="relative w-full"
        @select="onSelect"
      >
        <div class="w-full aspect-3/2 overflow-hidden">
          <NuxtPicture
            :src="item"
            class="contents"
            :img-attrs="{ class: 'w-full h-full object-cover' }"
            sizes="sm:720px md:976px lg:1216px"
            :preload="index === 0"
          />
        </div>
      </UCarousel>
      <UiIconExpand
        class="absolute bottom-2 right-2 z-10 w-5 h-5 cursor-pointer"
        role="button"
        tabindex="0"
        aria-label="Open photo fullscreen"
        @click="isFullscreen = true"
        @keydown.enter="isFullscreen = true"
        @keydown.space.prevent="isFullscreen = true"
      />
    </div>
    <div
      v-if="images.length > 1"
      ref="previewStrip"
      class="relative flex gap-5 pt-4 w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      <NuxtPicture
        v-for="(item, index) in images"
        :key="index"
        :src="item"
        :class="{ 'opacity-100!': activeIndex === index }"
        class="shrink-0 basis-[calc((100%-5rem)/5)] cursor-pointer opacity-30"
        :img-attrs="{ class: 'w-full object-cover aspect-square' }"
        sizes="sm:128px md:179px lg:228px"
        loading="lazy"
        placeholder
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
          <NuxtPicture
            v-if="images[activeIndex]"
            :src="images[activeIndex]"
            class="contents"
            :img-attrs="{ class: 'max-h-full max-w-full object-contain' }"
          />

          <button
            type="button"
            aria-label="Previous photo"
            :disabled="activeIndex === 0"
            class="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/70 hover:text-white disabled:cursor-default disabled:opacity-25"
            @click="prevPhoto"
          >
            <UiIconChevronLeft />
          </button>

          <button
            type="button"
            aria-label="Next photo"
            :disabled="activeIndex === images.length - 1"
            class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/70 hover:text-white disabled:cursor-default disabled:opacity-25"
            @click="nextPhoto"
          >
            <UiIconChevronRight />
          </button>

          <button
            type="button"
            aria-label="Close"
            class="absolute top-4 right-4 cursor-pointer p-2 text-white/70 hover:text-white"
            @click="close"
          >
            <UiIconClose />
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
const props = defineProps<{ images: string[] }>()

const carousel = useTemplateRef('carousel')
const previewStrip = useTemplateRef('previewStrip')
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

function revealThumb(index: number) {
  const strip = previewStrip.value
  const preview = strip?.children[index] as HTMLElement | undefined
  if (!strip || !preview) {
    return
  }

  const centered = preview.offsetLeft - (strip.clientWidth - preview.offsetWidth) / 2
  const max = strip.scrollWidth - strip.clientWidth
  strip.scrollTo({ left: Math.min(Math.max(centered, 0), max), behavior: 'smooth' })
}

watch(activeIndex, revealThumb)
onMounted(() => window.addEventListener('keydown', onFullscreenKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onFullscreenKeydown))
</script>
