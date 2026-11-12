<template>
  <section class="mb-12">
    <h1>{{ about.title }}</h1>
    <p class="pb-8 text-center">{{ about.description }}</p>
    <UiPhotoGallery :photos="about.photos" :label="`${about.title} photos`" />
  </section>
</template>

<script setup lang="ts">
const { findOne } = useStrapi()

const about = await useStrapiData('about', () =>
  findOne<About>('about', '', { populate: { photos: { sort: 'id:asc' } } }),
)
</script>
