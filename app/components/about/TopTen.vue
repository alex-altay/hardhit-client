<template>
  <section class="min-h-[50vh] dark:bg-white light:bg-black dark:text-black light:text-white">
    <UContainer class="py-12">
      <h1>{{ topTen.header }}</h1>
      <p class="text-center">{{ topTen.description }}</p>
      <UiAlbumsStack :albums="topTen.albums" class="my-25" />
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
