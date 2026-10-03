<template>
  <div>
    <h1>{{ about.title }}</h1>
    <p class="pb-8 text-center">{{ about.description }}</p>
    <UiPhotoGallery :images="about.photos.map(getMediaLink)" />
  </div>
</template>

<script setup lang="ts">
const { findOne } = useStrapi()

const about = await useStrapiData('about', () =>
  findOne<About>('about', '', { populate: { photos: { sort: 'id:asc' } } }),
)
</script>
