<template>
  <div v-if="photos.length" class="relative flex-1 w-full">
    <div class="relative w-full">
      <UCarousel
        ref="carousel"
        v-slot="{ item, index }"
        :items="photos"
        :aria-label="label"
        class="relative w-full"
        :ui="{
          root: 'focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-focus',
        }"
        @select="select"
      >
        <div class="w-full aspect-3/2 overflow-hidden">
          <NuxtPicture
            :src="getMediaLink(item)"
            class="contents"
            :img-attrs="{ class: 'w-full h-full object-cover', alt: item.alternativeText ?? '' }"
            sizes="sm:720px md:976px lg:1216px"
            :preload="index === 0"
          />
        </div>
      </UCarousel>
      <UiIconExpand
        class="absolute bottom-2 right-2 z-10 w-12 h-12 cursor-pointer rounded-full focus-ring-contrast"
        role="button"
        tabindex="0"
        aria-label="Open photo fullscreen"
        @click="isFullscreen = true"
        @keydown.enter.prevent="isFullscreen = true"
        @keydown.space.prevent="isFullscreen = true"
      />
    </div>
    <div
      v-if="photos.length > 1"
      ref="previewStrip"
      aria-hidden="true"
      class="relative flex gap-5 pt-4 w-full overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      <NuxtPicture
        v-for="(item, index) in photos"
        :key="index"
        :src="getMediaLink(item)"
        :class="{ 'opacity-100!': activeIndex === index }"
        class="shrink-0 basis-[calc((100%-5rem)/5)] cursor-pointer opacity-30"
        :img-attrs="{ class: 'w-full object-cover aspect-square', alt: '' }"
        sizes="sm:128px md:179px lg:228px"
        loading="lazy"
        placeholder
        @click="select(index)"
      />
    </div>

    <p class="sr-only" aria-live="polite">{{ slideAnnouncement }}</p>

    <UiPhotoLightbox
      v-model:open="isFullscreen"
      v-model:index="activeIndex"
      :photos="
        photos.map((photo) => ({
          src: getMediaLink(photo),
          alt: photo.alternativeText ?? '',
        }))
      "
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  photos: StrapiMedia[]
  label: string
}>()

const carousel = useTemplateRef('carousel')
const previewStrip = useTemplateRef('previewStrip')
const activeIndex = ref(0)
const isFullscreen = ref(false)
const slideAnnouncement = ref('')

function select(index: number) {
  activeIndex.value = index
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

watch(activeIndex, (index) => {
  if (!isFullscreen.value) {
    const alt = props.photos[index]?.alternativeText
    slideAnnouncement.value = `Photo ${index + 1} of ${props.photos.length}${alt ? `. ${alt}` : ''}`
  }
  carousel.value?.emblaApi?.scrollTo(index)
  revealThumb(index)
})
</script>
