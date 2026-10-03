<template>
  <div>
    <h1>{{ about.title }}</h1>
    <p class="pb-8 text-center">{{ about.description }}</p>
    <UiPhotoGallery :images="about.fotos.map(getMediaLink)" />
  </div>
</template>

<script setup lang="ts">
const { findOne } = useStrapi()

const about = await useStrapiData('about', () =>
  findOne<About>('about', '', { populate: { fotos: { sort: 'id:asc' } } }),
)
</script>
