<template>
  <UiPhotoLightbox v-model:index="index" :photos title="All photos">
    <UButton class="cursor-pointer" :disabled="!photos.length" @click="index = 0">
      Slideshow&nbsp;All
    </UButton>
  </UiPhotoLightbox>
</template>

<script setup lang="ts">
const props = defineProps<{ bands: Band[] }>()
const index = ref(0)

const photos = computed<LightboxPhoto[]>(() =>
  props.bands.flatMap((band) =>
    band.photos_collections.flatMap((collection) =>
      collection.photos.map((photo) => ({
        src: getMediaLink(photo),
        alt: photo.alternativeText ?? band.name,
        caption: `${band.name} · ${collection.title}`,
      })),
    ),
  ),
)
</script>
