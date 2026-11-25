<template>
  <div class="@container">
    <div
      ref="track"
      class="bands-hero-motion:h-[calc(56.25cqw*(2+var(--hold-length)))]"
      :style="{ '--hold-length': BACKGROUND_HOLD_LENGTH }"
    >
      <div
        ref="heroContainer"
        class="@container relative bands-hero-motion:sticky bands-hero-motion:top-(--ui-header-height) w-full aspect-video overflow-hidden"
      >
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
          class="absolute top-[min(calc(100vh-var(--ui-header-height)-4rem),calc(100%-4rem))] left-1/2 z-10 -translate-x-1/2"
          :scroll-target-id="scrollTargetId"
          is-always-visible
          screen-reader-label="Scroll to the bands"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { hero } = defineProps<{
  hero: PhotosHero
  scrollTargetId: string
}>()

type CardPlacement = { x: number; y: number; rotate: number; z: number }
const CARD_LAYOUT: CardPlacement[] = [
  { x: 29, y: 22, rotate: -20, z: 1 },
  { x: 52, y: 47, rotate: 8, z: 2 },
  { x: 24, y: 55, rotate: -3, z: 4 },
  { x: 60, y: 33, rotate: -10, z: 5 },
  { x: 81, y: 51, rotate: -20, z: 3 },
]

const SPREAD_ORIGIN = { x: 50, y: 42 }
const HEIGHT_TO_WIDTH = 9 / 16
const FLIGHT_DISTANCE = 90
const FLIGHT_DURATION_PART = 0.4
const NEXT_CARD_DELAY = (1 - FLIGHT_DURATION_PART) / (CARD_LAYOUT.length - 1)
const BACKGROUND_HOLD_LENGTH = 0.6

function roundForStyle(value: number) {
  return Math.round(value * 1000) / 1000
}

function getCardStyle({ x, y, rotate, z }: CardPlacement) {
  const fromOriginX = x - SPREAD_ORIGIN.x
  const fromOriginY = (y - SPREAD_ORIGIN.y) * HEIGHT_TO_WIDTH
  const length = Math.hypot(fromOriginX, fromOriginY)
  const dx = roundForStyle((fromOriginX / length) * FLIGHT_DISTANCE)
  const dy = roundForStyle((fromOriginY / length) * FLIGHT_DISTANCE)
  const flightStart = roundForStyle((CARD_LAYOUT.length - z) * NEXT_CARD_DELAY)
  return {
    left: `${x}%`,
    top: `${y}%`,
    rotate: `${rotate}deg`,
    zIndex: z,
    '--flight': `clamp(0, (var(--spread, 0) - ${flightStart}) / ${FLIGHT_DURATION_PART}, 1)`,
    translate: `calc(-50% + ${dx}cqw * var(--flight)) calc(-50% + ${dy}cqw * var(--flight))`,
  }
}

let spreadFrame = 0
const heroContainer = useTemplateRef('heroContainer')
const track = useTemplateRef('track')

function updateSpread() {
  spreadFrame = 0
  if (!heroContainer.value || !track.value) {
    return
  }
  const hero = heroContainer.value
  const { position, top } = getComputedStyle(hero)
  const stickyTop = position === 'sticky' ? parseFloat(top) : 0
  const distanceTravelled = stickyTop - track.value.getBoundingClientRect().top
  const progress = Math.min(Math.max(distanceTravelled / hero.offsetHeight, 0), 1)
  hero.style.setProperty('--spread', progress.toFixed(3))
}

function onScroll() {
  if (!spreadFrame) {
    spreadFrame = requestAnimationFrame(updateSpread)
  }
}

onMounted(() => {
  if (isPreferredReducedMotion()) {
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
