<template>
  <button
    v-if="frontAlbum && backAlbum"
    type="button"
    class="relative block aspect-square w-full cursor-pointer perspective-[1600px] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
    :aria-label="
      isFlipped
        ? `${backAlbum.band} — ${backAlbum.album}: next album`
        : `${frontAlbum.band} — ${frontAlbum.album}: flip to info`
    "
    @click="onAlbumClick"
  >
    <span
      class="relative block size-full transform-3d shadow-lifted transition-transform duration-600 ease-in-out motion-reduce:transition-none"
      :style="{ transform: `rotateY(${-halfTurnsCounter * 180}deg)` }"
    >
      <NuxtImg
        :src="getMediaLink(frontAlbum.cover)"
        :alt="`${frontAlbum.band} — ${frontAlbum.album}`"
        class="absolute inset-0 size-full object-cover backface-hidden"
        sizes="xs:100vw sm:640px"
        format="webp"
        loading="lazy"
      />
      <UiAlbumBackSide :album="backAlbum" class="absolute inset-0 backface-hidden rotate-y-180" />
    </span>
    <!-- Next cover preload -->
    <NuxtImg
      v-if="nextAlbum"
      :src="getMediaLink(nextAlbum.cover)"
      alt=""
      class="pointer-events-none absolute size-px opacity-0"
      sizes="xs:100vw sm:640px"
      format="webp"
      loading="lazy"
      aria-hidden="true"
    />
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ albums: TopAlbum[] }>()

const frontIndex = ref(0)
const backIndex = ref(0)
const halfTurnsCounter = ref(0)

const isFlipped = computed(() => halfTurnsCounter.value % 2 === 1)
const frontAlbum = computed(() => props.albums[frontIndex.value])
const backAlbum = computed(() => props.albums[backIndex.value])
const nextAlbum = computed(() => props.albums[(frontIndex.value + 1) % props.albums.length])

function onAlbumClick() {
  if (isFlipped.value) {
    frontIndex.value = (frontIndex.value + 1) % props.albums.length
  } else {
    backIndex.value = frontIndex.value
  }
  halfTurnsCounter.value++
}
</script>
