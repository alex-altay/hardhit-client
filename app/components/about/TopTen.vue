<template>
  <section v-if="topTen" class="min-h-[50vh] bg-inverted text-inverted">
    <UContainer class="py-12">
      <h2 v-animate.delayed class="title-page">{{ topTen.header }}</h2>
      <p class="text-center">{{ topTen.description }}</p>
      <UiAlbumsMobileStack :albums="topTen.albums" class="sm:hidden my-12" />
      <UiAlbumsDesktopStack :albums="topTen.albums" class="hidden sm:flex my-25" />
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { findOne } = useStrapi()

const topTen = await useStrapiData(
  'top-ten',
  () =>
    findOne<TopTen>('top-ten', '', {
      populate: {
        albums: { populate: { cover: { fields: ['url'] } } },
      },
    }),
  { optional: true },
)
</script>
