<template>
  <UModal
    v-model:open="open"
    fullscreen
    :title="title"
    :ui="{ content: 'bg-black/95 ring-0 divide-y-0' }"
  >
    <slot />
    <template #content="{ close }">
      <div class="relative flex h-full w-full items-center justify-center p-4">
        <NuxtImg
          v-if="photo"
          :src="photo.src"
          :alt="photo.alt ?? ''"
          preset="fullscreen"
          class="max-h-full max-w-full object-contain"
        />
        <NuxtImg v-if="nextPhoto" :src="nextPhoto.src" preset="fullscreen" alt="" class="hidden" />

        <button
          type="button"
          aria-label="Previous photo"
          :disabled="index === 0"
          class="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/70 hover:text-white focus-visible:outline-white disabled:cursor-default disabled:opacity-25"
          @click="showPrevious"
        >
          <UiIconChevronLeft />
        </button>

        <button
          type="button"
          aria-label="Next photo"
          :disabled="index === photos.length - 1"
          class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-white/70 hover:text-white focus-visible:outline-white disabled:cursor-default disabled:opacity-25"
          @click="showNext"
        >
          <UiIconChevronRight />
        </button>

        <button
          type="button"
          aria-label="Close"
          class="absolute top-4 right-4 cursor-pointer p-2 text-white/70 hover:text-white focus-visible:outline-white"
          @click="close"
        >
          <UiIconClose />
        </button>

        <div
          class="absolute bottom-4 inset-x-4 flex flex-col items-center gap-1 text-center text-sm text-white/60"
          aria-live="polite"
          aria-atomic="true"
        >
          <span v-if="photo?.caption" class="text-white/90">{{ photo.caption }}</span>
          <span aria-hidden="true">{{ index + 1 }} / {{ photos.length }}</span>
          <span class="sr-only">
            Photo {{ index + 1 }} of {{ photos.length }}{{ photo?.alt ? `. ${photo.alt}` : '' }}
          </span>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ photos: LightboxPhoto[]; title?: string }>(), {
  title: 'Photo',
})

const open = defineModel<boolean>('open', { default: false })
const index = defineModel<number>('index', { default: 0 })

const photo = computed(() => props.photos[index.value])
const nextPhoto = computed(() => props.photos[index.value + 1])

function showPrevious() {
  if (index.value > 0) {
    index.value--
  }
}

function showNext() {
  if (index.value < props.photos.length - 1) {
    index.value++
  }
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault()
    showPrevious()
  } else if (event.key === 'ArrowRight') {
    event.preventDefault()
    showNext()
  }
}

watch(open, (isOpen) => {
  if (isOpen) {
    window.addEventListener('keydown', onKeydown)
  } else {
    window.removeEventListener('keydown', onKeydown)
  }
})
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>
