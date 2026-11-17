<template>
  <div class="flex flex-col items-center">
    <UiBackLink to="/bands" />
    <ArticleHeader :title="band.name" :lead="band.description" :has-divider="hasContent" />
    <section v-for="collection in band.photos_collections" :key="collection.id" class="mb-24">
      <h2 class="title-section mb-3 text-center sm:text-left">
        {{ collection.title }}
        <span v-if="collection.date">{{ transformDateString(collection.date) }}</span>
      </h2>
      <UiPhotoGallery :photos="collection.photos" :label="`${collection.title} photos`" />
    </section>

    <section v-if="videos.length" class="mb-12 sm:mb-24 w-full">
      <div v-for="video in videos" :key="video.id" class="mb-12">
        <h2 v-if="video.title" class="title-section mb-3">{{ video.title }}</h2>
        <UiYoutubeEmbed
          v-if="getYoutubeId(video.url)"
          :video-id="getYoutubeId(video.url)!"
          :title="video.title ?? band.name"
        />
      </div>
    </section>

    <article
      v-for="story in band.stories"
      :key="story.title"
      class="mb-12 sm:mb-24 w-full max-w-4xl"
    >
      <h2 class="mx-auto max-w-[65ch] text-center text-balance">{{ story.title }}</h2>
      <NuxtImg
        v-if="story.cover"
        format="webp"
        class="mb-12 w-full"
        sizes="xs:100vw md:896px"
        :src="getMediaLink(story.cover)"
        :alt="story.cover.alternativeText ?? ''"
      />
      <ArticleText v-if="story.text" class="mb-14" :value="story.text" />
      <FeaturedIn
        v-if="story.issue"
        class="mx-auto max-w-[65ch] border-t border-default pt-12"
        :issue="story.issue"
      />
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()

const band = await useStrapiData(`band-${route.params.slug}`, async () => {
  const { data } = await find<Band>('bands', {
    filters: { slug: { $eq: route.params.slug as string } },
    // @ts-expect-error: type expects only required fields, but there can be no cover or issue
    populate: {
      photos_collections: { populate: 'photos' },
      live_links: { fields: ['url', 'title'] },
      interview_links: { fields: ['url', 'title'] },
      stories: {
        populate: {
          cover: { fields: ['url', 'name', 'alternativeText'] },
          issue: { populate: ['cover', 'pdf', 'highlights'] },
        },
      },
    },
  })
  const band = data[0]
  if (!band) {
    throw createError({ status: 404, statusText: 'Band not found' })
  }
  return { data: band }
})

useSeoMeta({ title: () => band.value?.name })

const videos = [...band.value.live_links, ...band.value.interview_links]
const hasContent =
  band.value.photos_collections.length + videos.length + band.value.stories.length > 0
</script>
