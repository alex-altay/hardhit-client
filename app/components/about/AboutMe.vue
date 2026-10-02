<template>
  <div v-if="about">
    <h1>{{ about.title }}</h1>
    <p class="pb-8 text-center text-[15px]">{{ about.description }}</p>
    <UiPhotoGallery :images="about.fotos.map((photo) => `${strapiOrigin}${photo.url}`)" />
  </div>
</template>

<script setup lang="ts">
const { strapiOrigin } = useRuntimeConfig().public
const { findOne } = useStrapi()

const { data: about } = await useAsyncData('about', async () => {
  const { data } = await findOne<About>('about', '', {
    populate: { fotos: { sort: 'id:asc' } },
  })
  return data
})
</script>
