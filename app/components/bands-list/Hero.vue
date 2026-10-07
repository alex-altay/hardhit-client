<template>
  <div ref="heroContainer" class="@container relative w-full aspect-video overflow-hidden">
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
      class="absolute w-1/4"
      :style="getCardStyle(CARD_LAYOUT[index]!)"
    />
    <UiScrollDownButton
      :scroll-target-id="scrollTargetId"
      screen-reader-label="Scroll to the bands"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{ scrollTargetId: string }>()

const { findOne } = useStrapi()

const hero = await useStrapiData('photos-hero', () =>
  findOne<PhotosHero>('photos-hero', '', {
    populate: {
      backgroundPhoto: { fields: ['url'] },
      bands: { populate: { photo: { fields: ['url'] } } },
    },
  }),
)

type CardPlacement = { x: number; y: number; rotate: number; z: number; speed: number }
const CARD_LAYOUT: CardPlacement[] = [
  { x: 29, y: 22, rotate: -20, z: 1, speed: 0.6 },
  { x: 52, y: 47, rotate: 8, z: 2, speed: 0.75 },
  { x: 24, y: 55, rotate: -3, z: 4, speed: 1.15 },
  { x: 60, y: 33, rotate: -10, z: 5, speed: 1.3 },
  { x: 81, y: 51, rotate: -20, z: 3, speed: 0.95 },
]

const SPREAD_ORIGIN = { x: 50, y: 42 }
const SPREAD_FORCE = 1.5
const HEIGHT_TO_WIDTH = 9 / 16

function getCardStyle({ x, y, rotate, z, speed }: CardPlacement) {
  const dx = (x - SPREAD_ORIGIN.x) * SPREAD_FORCE * speed
  const dy = (y - SPREAD_ORIGIN.y) * SPREAD_FORCE * speed * HEIGHT_TO_WIDTH
  return {
    left: `${x}%`,
    top: `${y}%`,
    rotate: `${rotate}deg`,
    zIndex: z,
    translate: `calc(-50% + ${dx}cqw * var(--spread, 0)) calc(-50% + ${dy}cqw * var(--spread, 0))`,
  }
}

let spreadFrame = 0
const heroContainer = useTemplateRef('heroContainer')

function updateSpread() {
  spreadFrame = 0
  const el = heroContainer.value
  if (!el) {
    return
  }
  const { top, height } = el.getBoundingClientRect()
  const progress = Math.min(Math.max(-top / height, 0), 1)
  el.style.setProperty('--spread', progress.toFixed(3))
}

function onScroll() {
  if (!spreadFrame) {
    spreadFrame = requestAnimationFrame(updateSpread)
  }
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  updateSpread()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(spreadFrame)
})
</script>
