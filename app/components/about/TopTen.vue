<template>
  <section class="min-h-[50vh] bg-inverted text-inverted">
    <UContainer class="py-12">
      <h1 v-animate.delayed>{{ topTen.header }}</h1>
      <p class="text-center">{{ topTen.description }}</p>
      <UiAlbumsMobileStack :albums="topTen.albums" class="sm:hidden my-12" />
      <UiAlbumsDesktopStack :albums="topTen.albums" class="hidden sm:flex my-25" />
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { findOne } = useStrapi()

const topTen = await useStrapiData('top-ten', () =>
  findOne<TopTen>('top-ten', '', {
    populate: {
      albums: { populate: { cover: { fields: ['url'] } } },
    },
  }),
)
</script>
