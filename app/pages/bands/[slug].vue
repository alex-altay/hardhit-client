<template>
  <div>
    <NuxtLink to="/bands" class="mb-8 flex flex-row items-center">
      <UiIconBack class="inline mr-1.5 w-3.5 h-3.5" />
      <span class="font-bold">Back</span>
    </NuxtLink>
    <h1>{{ band?.name }}</h1>
    <section v-for="collection in band?.photos_collections" :key="collection.id" class="mb-48">
      <h2>
        {{ collection.title }}
        <span v-if="collection.date">{{ transformDateString(collection.date) }}</span>
      </h2>
      <UiPhotoGallery :images="collection.photos.map((photo) => `${strapiOrigin}${photo.url}`)" />
    </section>
    <section v-for="story in band?.stories" :key="story.title">
      <div class="mb-8">
        <h2>{{ story.title }}</h2>
        <NuxtImg format="webp" class="w-full" :src="`${strapiOrigin}${story.cover.url}`" />
        <RichMarkdown v-if="story.text" :value="story.text" />
      </div>
      <FeaturedIn v-if="story.issue" :issue="story.issue" />
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
        stories: {
          populate: {
            cover: { fields: ['url', 'name'] },
            issue: { populate: ['cover', 'pdf'] },
          },
        },
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
