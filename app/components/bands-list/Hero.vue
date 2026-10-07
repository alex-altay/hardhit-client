<template>
  <div class="relative w-full aspect-video overflow-hidden bg-brand">
    <NuxtImg
      :src="getMediaLink(hero.backgroundPhoto)"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:1920px"
      format="webp"
      fetchpriority="high"
      preload
    />
    <BandsListHeroCard
      v-for="(band, index) in hero.bands.slice(0, CARD_LAYOUT.length)"
      :key="index"
      :band
      class="absolute w-1/4 -translate-x-1/2 -translate-y-1/2"
      :style="getCardStyle(CARD_LAYOUT[index]!)"
    />
  </div>
</template>

<script setup lang="ts">
const { findOne } = useStrapi()

const hero = await useStrapiData('photos-hero', () =>
  findOne<PhotosHero>('photos-hero', '', {
    populate: {
      backgroundPhoto: { fields: ['url'] },
      bands: { populate: { photo: { fields: ['url'] } } },
    },
  }),
)

type CardPlacement = { x: number; y: number; rotate: number; z: number }
const CARD_LAYOUT: CardPlacement[] = [
  { x: 29, y: 22, rotate: -20, z: 1 },
  { x: 52, y: 47, rotate: 8, z: 2 },
  { x: 24, y: 55, rotate: -3, z: 4 },
  { x: 60, y: 33, rotate: -10, z: 5 },
  { x: 81, y: 51, rotate: -20, z: 3 },
]

function getCardStyle({ x, y, rotate, z }: CardPlacement) {
  return { left: `${x}%`, top: `${y}%`, rotate: `${rotate}deg`, zIndex: z }
}
</script>
