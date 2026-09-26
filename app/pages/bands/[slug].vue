<template>
  <div>
    <h1>{{ band?.name }}</h1>
    <section v-for="collection in band?.photos_collections" :key="collection.id">
      <h3>{{ collection.title }} {{ collection.date }}</h3>
      <UiPhotoGallery :images="collection.photos.map((photo) => `${strapiOrigin}${photo.url}`)" />
    </section>
    <section v-for="story in band?.stories" :key="story.title">
      <h3>{{ story.title }}</h3>
      <NuxtImg :src="`${strapiOrigin}${story.cover.url}`" />
      <RichMarkdown v-if="story.text" :value="story.text" />
      {{ story.issue }}
      <RichMarkdown v-if="story.issue.description" :value="story.issue.description" />
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { strapiOrigin } = useRuntimeConfig().public
const { find } = useStrapi()

const { data: band } = await useAsyncData(
  `band-${route.params.slug}`,
  async () => {
    const { data } = await find<Band>('bands', {
      filters: { slug: { $eq: route.params.slug as string } },
      populate: {
        photos_collections: { populate: 'photos' },
        live_videos: { populate: 'video' },
        stories: { populate: ['cover', 'issue'] },
      },
    })
    return data[0] ?? null
  },
  { watch: [() => route.params.slug] },
)

if (!band.value) {
  throw createError({ statusCode: 404, statusMessage: 'Band not found' })
}
</script>
