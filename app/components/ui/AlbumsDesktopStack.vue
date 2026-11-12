<template>
  <div class="@container flex justify-center">
    <div class="relative isolate size-(--cover) [--cover:min(40vw,480px)]">
      <!-- Uses button for screen readers - the main minus of this decision - we cannot use block elements inside button -->
      <button
        v-for="(album, index) in albums"
        :key="album.position"
        type="button"
        class="absolute top-0 left-0 size-(--cover) cursor-pointer focus-visible:outline-offset-4 perspective-[1600px] transition-[transform,filter] duration-600 ease-in-out motion-reduce:transition-none"
        :style="getAlbumStyle(index)"
        :inert="index !== currentAlbumIndex && index !== leftStack[0] && index !== rightStack[0]"
        :aria-pressed="index === currentAlbumIndex ? isFlipped : undefined"
        :aria-label="`${album.band} — ${album.album}: ${getAriaLabel(index)}`"
        @click="onAlbumClick(index)"
      >
        <span
          class="relative block size-full origin-left transform-3d transition-[transform,translate,box-shadow] duration-600 ease-in-out motion-reduce:transition-none"
          :class="[
            index === currentAlbumIndex ? 'shadow-lifted' : 'shadow-lg',
            { 'translate-x-full -rotate-y-180': index === currentAlbumIndex && isFlipped },
          ]"
        >
          <NuxtImg
            :src="getMediaLink(album.cover)"
            :alt="`${album.band} — ${album.album}`"
            class="absolute inset-0 size-full object-cover backface-hidden"
            sizes="xs:40vw sm:40vw md:40vw lg:480px"
            format="webp"
            loading="lazy"
          />
          <UiAlbumBackSide :album class="absolute inset-0 backface-hidden rotate-y-180" />
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ albums: TopAlbum[] }>()

const currentAlbumIndex = ref(0)
const isFlipped = ref(false)

const leftStack = computed(() =>
  props.albums
    .map((_, index) => index)
    .filter((index) => index < currentAlbumIndex.value)
    .reverse(),
)

const rightStack = computed(() =>
  props.albums.map((_, index) => index).filter((index) => index > currentAlbumIndex.value),
)

function onAlbumClick(index: number) {
  if (index === currentAlbumIndex.value) {
    isFlipped.value = !isFlipped.value
    return
  }
  currentAlbumIndex.value = index
  isFlipped.value = false
}

function getAriaLabel(index: number) {
  if (index < currentAlbumIndex.value) {
    return 'previous album'
  }
  if (index > currentAlbumIndex.value) {
    return 'next album'
  }
  return isFlipped.value ? 'flip to cover' : 'flip to info'
}

// MIND BLOWING ZONE - PROCEED WITH CAUTION
const STRIP_WIDTH = { min: 5, max: 13 } // Width of the strip of each album under the top of a stack, px
const SCALE_STEP = 0.012 //  Each next album down a stack is this much smaller
const TURN_EVERY_N_ALBUM = 3
const MAX_TURN_DEGREE = 2.5
const CURRENT_ALBUM_SCALE = 1.07
const CURRENT_ALBUM_LIFT_PX = 8
const STACK_TILT_DEGREE = 2
const STACK_BRIGHTNESS = 0.75
const STACK_GRAYSCALE = 1
const STACK_FILTER = `grayscale(${STACK_GRAYSCALE}) brightness(${STACK_BRIGHTNESS})`
const SPACE_BESIDE_COVER = '(100cqw - var(--cover)) / 2' // Half of the free space next to the current cover
const CURRENT_ALBUM_STYLE = {
  zIndex: 100,
  filter: 'grayscale(0) brightness(1)',
  transform: `translateX(0) translateY(${-CURRENT_ALBUM_LIFT_PX}px) scale(${CURRENT_ALBUM_SCALE}) rotate(0deg)`,
}

/**
 * Turns any number into a number from 0 to 1 that looks random, but is always the same
 * for the same input: repeatableRandom(3) gives the same result on every load, on the server
 * and in the browser. Without it the stacks would summon a hydration error every time
 */
function repeatableRandom(input: number) {
  const x = Math.sin(input * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

const getStripWidth = (album: TopAlbum) =>
  STRIP_WIDTH.min + repeatableRandom(album.position) * (STRIP_WIDTH.max - STRIP_WIDTH.min)

/**
 * How far every album of a stack sticks out after the top of the stack, px.
 * In the right stack the top album itself sticks out after the current one
 */
function getOffsets(stack: number[], isFirstSticksOut: boolean) {
  let offset = 0
  return stack.map((index, depth) => {
    if (depth > 0 || isFirstSticksOut) {
      offset += getStripWidth(props.albums[index]!)
    }
    return offset
  })
}
const rightOffsets = computed(() => getOffsets(rightStack.value, true))
const leftOffsets = computed(() => getOffsets(leftStack.value, false))

type AlbumPosition = {
  side: 'left' | 'right'
  /** Position in its stack, 0 is the top */
  depth: number
  /** How deep under the current album: the right stack starts one album below it, the left one has its own top */
  level: number
  /** How far the album sticks out after the top of its stack, px */
  offset: number
  /** How far the whole stack sticks out after its top, px */
  stackWidth: number
}

function getAlbumPosition(index: number): AlbumPosition {
  const side = index > currentAlbumIndex.value ? 'right' : 'left'
  const stack = side === 'right' ? rightStack.value : leftStack.value
  const offsets = side === 'right' ? rightOffsets.value : leftOffsets.value
  const depth = stack.indexOf(index)
  return {
    side,
    depth,
    level: side === 'right' ? depth + 1 : depth,
    offset: offsets[depth]!,
    stackWidth: offsets.at(-1) ?? 0,
  }
}

/** Every N album in a stack is turned a little, by a repeatable random angle, degrees */
function getAlbumTurn(album: TopAlbum, level: number) {
  if (level % TURN_EVERY_N_ALBUM !== 1) {
    return 0
  }
  const angle = MAX_TURN_DEGREE * (0.4 + 0.6 * repeatableRandom(album.position + 200))
  return repeatableRandom(album.position + 100) < 0.5 ? -angle : angle
}

/**
 * Deeper albums are smaller. A turned square gets taller by cos + sin of the turn,
 * so a turned album is shrunk enough for its corners not to stick out above and below the current cover
 */
function getAlbumScale(level: number, turn: number) {
  const radians = (Math.abs(turn) * Math.PI) / 180
  return Math.min(1 - level * SCALE_STEP, 1 / (Math.cos(radians) + Math.sin(radians)))
}

/** How far the album moves from the center, a CSS calc */
function getAlbumHorizontalShift({ side, offset, stackWidth }: AlbumPosition, scale: number) {
  const shrink = `var(--cover) * ${(1 - scale) / 2}`
  const isUnderCurrent = side === 'right' && !isFlipped.value && currentAlbumIndex.value === 0
  if (isUnderCurrent) {
    return `calc(${shrink} + ${offset}px + var(--cover) * ${(CURRENT_ALBUM_SCALE - 1) / 2})`
  }
  const direction = side === 'right' ? 1 : -1
  return `calc(${direction} * (${SPACE_BESIDE_COVER} - ${stackWidth}px + ${offset}px + ${shrink}))`
}

function getStackTilt(side: AlbumPosition['side']) {
  return side === 'right' ? STACK_TILT_DEGREE : -STACK_TILT_DEGREE
}

function getAlbumStyle(index: number) {
  if (index === currentAlbumIndex.value) {
    return CURRENT_ALBUM_STYLE
  }
  const position = getAlbumPosition(index)
  const turn = getAlbumTurn(props.albums[index]!, position.level)
  const scale = getAlbumScale(position.level, turn)
  const tilt = turn + getStackTilt(position.side)

  return {
    zIndex: 50 - position.depth,
    filter: STACK_FILTER,
    transform: `translateX(${getAlbumHorizontalShift(position, scale)}) translateY(0) scale(${scale}) rotate(${tilt.toFixed(2)}deg)`,
  }
}
</script>
