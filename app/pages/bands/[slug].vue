<template>
  <div>
    <NuxtLink to="/bands" class="mb-8 flex flex-row items-center">
      <UiIconBack class="inline mr-1.5 w-3.5 h-3.5" />
      <span class="font-bold">Back</span>
    </NuxtLink>
    <h1>{{ band.name }}</h1>
    <section v-for="collection in band.photos_collections" :key="collection.id" class="mb-48">
      <h3>
        {{ collection.title }}
        <span v-if="collection.date">{{ transformDateString(collection.date) }}</span>
      </h3>
      <UiPhotoGallery :images="collection.photos.map(getMediaLink)" />
    </section>
    <section v-for="story in band.stories" :key="story.title">
      <div class="mb-8">
        <h3>{{ story.title }}</h3>
        <NuxtImg format="webp" class="w-full" :src="getMediaLink(story.cover)" />
        <RichMarkdown v-if="story.text" :value="story.text" />
      </div>
      <FeaturedIn v-if="story.issue" :issue="story.issue" />
    </section>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()

const band = await useStrapiData(
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
    const band = data[0]
    if (!band) {
      throw createError({ status: 404, statusText: 'Band not found' })
    }
    return { data: band }
  },
  { watch: [() => route.params.slug] },
)
</script>
