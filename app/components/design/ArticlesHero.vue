<template>
  <section ref="section" class="relative h-[600svh] motion-reduce:h-auto bg-ink">
    <div
      class="sticky top-(--ui-header-height) h-[calc(100svh-var(--ui-header-height))] overflow-hidden @container-size"
    >
      <div ref="frame" class="golden-ratio-frame absolute will-change-transform">
        <div class="photo absolute" :style="PHOTO_POSITION">
          <NuxtImg
            src="/images/design-hero/baest.webp"
            alt="Example of photo to display design rules"
            class="absolute size-full"
            format="webp"
            fetchpriority="high"
            preload
          />

          <svg
            id="masks"
            :viewBox="`${PHOTO.x} ${PHOTO.y} ${PHOTO.width} ${PHOTO.height}`"
            class="absolute inset-0 size-full"
            aria-hidden="true"
          >
            <defs>
              <radialGradient
                id="spiral-vignette"
                gradientUnits="userSpaceOnUse"
                cx="0"
                cy="0"
                r="1"
                :gradientTransform="`translate(${SPIRAL_VIGNETTE.x} ${SPIRAL_VIGNETTE.y}) scale(${SPIRAL_VIGNETTE.rx} ${SPIRAL_VIGNETTE.ry})`"
              >
                <stop offset="0.8" style="stop-color: var(--color-ink)" stop-opacity="0" />
                <stop offset="1" style="stop-color: var(--color-ink)" />
              </radialGradient>
              <radialGradient id="mouth-hole">
                <stop offset="0.5" stop-color="black" />
                <stop offset="1" stop-color="white" />
              </radialGradient>
              <mask id="mouth-spotlight">
                <rect v-bind="PHOTO" fill="white" />
                <circle
                  class="spotlight"
                  :cx="SPIRAL_EYE.x"
                  :cy="SPIRAL_EYE.y"
                  r="1900"
                  fill="url('#mouth-hole')"
                />
              </mask>
            </defs>

            <rect v-bind="PHOTO" fill="url(#spiral-vignette)" />
            <rect class="shade fill-ink" v-bind="PHOTO" opacity="0" mask="url(#mouth-spotlight)" />
          </svg>
        </div>

        <svg
          id="drawings"
          :viewBox="`0 0 ${FRAME.width} ${FRAME.height}`"
          class="absolute inset-0 size-full"
          fill="none"
          aria-hidden="true"
        >
          <g class="thirds stroke-brand" stroke-width="3">
            <path
              v-for="line in THIRDS_HORIZONTAL"
              :key="line"
              class="thirds-horizontal will-draw"
              :d="line"
              pathLength="1"
            />
            <path
              v-for="line in THIRDS_VERTICAL"
              :key="line"
              class="thirds-vertical will-draw"
              :d="line"
              pathLength="1"
            />
            <circle
              v-for="dot in THIRDS_DOTS"
              :key="`${dot.x}-${dot.y}`"
              class="dots stroke-none"
              :class="dot.isMicrophone ? 'micro fill-white' : 'fill-brand'"
              :cx="dot.x"
              :cy="dot.y"
              r="9"
            />
          </g>

          <g class="stroke-brand-primary" stroke-width="6" stroke-linecap="round">
            <line
              v-for="line in LEADING_LINES"
              :key="`${line.from.x}-${line.from.y}`"
              class="leading-line will-draw"
              :x1="line.from.x"
              :y1="line.from.y"
              :x2="line.to.x"
              :y2="line.to.y"
              pathLength="1"
            />
          </g>

          <g
            class="focal-point stroke-brand-primary"
            stroke-width="5"
            :transform="`translate(${FOCAL_POINT.x} ${FOCAL_POINT.y})`"
          >
            <circle r="38" />
            <path d="M-38 0H-22M22 0H38M0 -38V-22M0 22V38" />
          </g>

          <g class="stroke-white/90" stroke-width="4">
            <path
              v-for="line in GRID_LINES"
              :key="line"
              class="grid-line will-draw"
              :d="line"
              pathLength="1"
            />
          </g>

          <path
            class="spiral will-draw"
            :d="SPIRAL"
            stroke="#d4af37"
            stroke-width="8"
            pathLength="1"
          />
        </svg>
      </div>

      <div
        class="pointer-events-none absolute inset-0 bg-linear-to-l from-ink/70 via-ink/0 via-45% to-transparent"
      />

      <div class="absolute top-1/2 -translate-y-1/2 right-4 sm:right-8 grid text-right">
        <div
          v-for="(caption, index) in CAPTIONS"
          :key="caption.title"
          ref="captions"
          class="col-start-1 row-start-1"
          :class="{ 'opacity-0': index > 0 }"
        >
          <div class="mb-1 tracking-[0.2em] text-[clamp(0.875rem,1cqw,1.25rem)] text-white/60">
            {{ `0${index + 1} / 0${CAPTIONS.length}` }}
          </div>
          <div
            class="text-[clamp(2.25rem,5cqw,7.5rem)] leading-none font-bold uppercase text-white"
          >
            {{ caption.title }}
          </div>
          <div class="text-[clamp(1.125rem,1.25cqw,1.75rem)] text-white/60">
            {{ caption.text }}
          </div>
        </div>
      </div>

      <UiScrollDownButton
        class="absolute bottom-1 left-1/2 z-10 -translate-x-1/2"
        :scroll-target-id="scrollTargetId"
        screen-reader-label="Scroll to the articles"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'

defineProps<{ scrollTargetId: string }>()

let trigger: ScrollTrigger | undefined
let animation: gsap.core.Timeline | undefined
const section = useTemplateRef('section')
const captions = useTemplateRef('captions')
const frame = useTemplateRef('frame')

function showCaption(index: number) {
  return gsap
    .timeline({ defaults: { duration: 0.3 } })
    .to(captions.value![index - 1]!, { opacity: 0, y: -12 })
    .fromTo(captions.value![index]!, { opacity: 0, y: 12 }, { opacity: 1, y: 0 })
}

const CAPTIONS = [
  { title: 'Rule of thirds', text: 'The microphone sits right where the lines cross' },
  { title: 'Leading lines', text: 'The arm and the mic draw the path for your eye' },
  { title: 'Golden ratio', text: 'φ = 1.618. The spiral curls straight into the center of scream' },
]
const FRAME = { width: 1618, height: 1000 }
const PHOTO_HIDDEN_SIDES = { left: 162, right: 47, top: 100, bottom: 150 }
const PHOTO = {
  x: -PHOTO_HIDDEN_SIDES.left,
  y: -PHOTO_HIDDEN_SIDES.top,
  width: FRAME.width + PHOTO_HIDDEN_SIDES.left + PHOTO_HIDDEN_SIDES.right,
  height: FRAME.height + PHOTO_HIDDEN_SIDES.top + PHOTO_HIDDEN_SIDES.bottom,
}
const PHOTO_POSITION = {
  left: `${(PHOTO.x / FRAME.width) * 100}%`,
  top: `${(PHOTO.y / FRAME.height) * 100}%`,
  width: `${(PHOTO.width / FRAME.width) * 100}%`,
  height: `${(PHOTO.height / FRAME.height) * 100}%`,
}
const TO_DRAW = { strokeDashoffset: 0, autoRound: false }

// Screen 1 - Rule of thirds
const THIRDS_HORIZONTAL = [
  `M0 ${FRAME.height / 3}H${FRAME.width}`,
  `M${FRAME.width} ${(FRAME.height * 2) / 3}H0`,
]
const THIRDS_VERTICAL = [
  `M${FRAME.width / 3} 0V${FRAME.height}`,
  `M${(FRAME.width * 2) / 3} ${FRAME.height}V0`,
]
const THIRDS_DOTS = [
  { x: (FRAME.width * 2) / 3, y: FRAME.height / 3 },
  { x: (FRAME.width * 2) / 3, y: (FRAME.height * 2) / 3 },
  { x: FRAME.width / 3, y: FRAME.height / 3, isMicrophone: true },
  { x: FRAME.width / 3, y: (FRAME.height * 2) / 3 },
]
const THIRDS_IN_SPIRAL = [
  `M7 ${FRAME.height / 3}H1557`,
  `M1358 ${(FRAME.height * 2) / 3}H74`,
  `M${FRAME.width / 3} 0V991`,
  `M${(FRAME.width * 2) / 3} 883V0`,
]

// Screen 2 - Leading lines
const ELBOW = { x: FRAME.width / 3, y: (FRAME.height * 2) / 3 }
const FINGERTIP = { x: 1447, y: 864 }
const MICROPHONE_END = { x: 1007, y: 269 }
const MICROPHONE_HEAD = { x: FRAME.width / 3, y: FRAME.height / 3 }
const LEADING_LINES = [
  { from: FINGERTIP, to: ELBOW },
  { from: MICROPHONE_END, to: MICROPHONE_HEAD },
]
const FOCAL_POINT = { x: 452, y: 359 }

// Screen 3 - Golden grid
const GRID_LINES = [
  'M618 0V1000',
  'M0 382H618',
  'M382 0V382',
  'M382 236H618',
  'M472 236V382',
  'M382 292H472',
  'M438 236V292',
  'M438 270H472',
]
const SPIRAL = [
  'M1614 0',
  'A996 996 0 0 1 618 996',
  'A614 614 0 0 1 4 382',
  'A378 378 0 0 1 382 4',
  'A236 232 0 0 1 618 236',
  'A146 146 0 0 1 472 382',
  'A90 90 0 0 1 382 292',
  'A56 56 0 0 1 438 236',
  'A34 34 0 0 1 472 270',
].join(' ')
const SPIRAL_EYE = { x: 452, y: 262 }
const SPIRAL_EASE =
  'M0,0 C0.042,0 0.137,0 0.35,0.39 C0.564,0.78 0.658,0.78 0.7,0.78 C0.811,0.78 0.889,1 1,1'

// From 1 to 3 - Camera zoom
const CAMERA_ZOOM = 0.8
const CAMERA_EDGE_FADE = '15%'
const CAMERA_ORIGIN = `${(SPIRAL_EYE.x / FRAME.width) * 100}% ${(SPIRAL_EYE.y / FRAME.height) * 100}%`
const SPIRAL_VIGNETTE = { x: 1100, y: 382, rx: 1100, ry: 640 }

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, CustomEase)

  const ruleOfThirds = gsap
    .timeline()
    .to('.thirds-horizontal', { ...TO_DRAW, duration: 1, ease: 'power2.out' })
    .to('.thirds-vertical', { ...TO_DRAW, duration: 1, ease: 'power2.out' }, '-=0.3')
    .to(
      '.dots',
      { opacity: 0.9, stagger: { from: 'center', amount: 0.1 }, ease: 'power2.out' },
      '-=0.9',
    )
    .to('.thirds', { opacity: 0.5, strokeWidth: 1 })

  const leadingLines = gsap
    .timeline()
    .to('.leading-line', { ...TO_DRAW, duration: 1, stagger: 0.15, ease: 'none' })
    .fromTo(
      '.focal-point',
      { opacity: 0, scale: 0.4, transformOrigin: 'center' },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' },
    )
    .to('.focal-point', { opacity: 0, scale: 0.4, rotate: 360 })
    .to('.leading-line', { opacity: 0.5, strokeWidth: 1 }, '<')

  const goldenRatio = gsap
    .timeline()
    .to('.grid-line', { ...TO_DRAW, stagger: 0.15, ease: 'power1.inOut' })
    .to(
      '.spiral',
      { ...TO_DRAW, duration: 1.8, ease: CustomEase.create('spiral', SPIRAL_EASE) },
      '-=1',
    )
    .to(
      '.thirds-horizontal, .thirds-vertical',
      {
        attr: { d: (index: number) => THIRDS_IN_SPIRAL[index]! },
        duration: 1,
        ease: 'power1.inOut',
      },
      '<',
    )
    .to('.shade', { attr: { opacity: 0.65 }, duration: 1.8, ease: 'power1.inOut' }, '<')
    .to('.spotlight', { attr: { r: 320 }, duration: 1.8, ease: 'power1.inOut' }, '<')
    .to('.grid-line', { opacity: 0.25, strokeWidth: 1, duration: 0.8, ease: 'none' })

  const cameraZoom = gsap.fromTo(
    frame.value,
    { scale: 1, '--edge-fade': '0%', transformOrigin: CAMERA_ORIGIN },
    { scale: CAMERA_ZOOM, '--edge-fade': CAMERA_EDGE_FADE, ease: 'power1.in' },
  )

  animation = gsap
    .timeline({ paused: true })
    .add(ruleOfThirds)
    .add(showCaption(1), '-=0.5')
    .add(leadingLines, '<')
    .add(showCaption(2), '-=0.5')
    .add(goldenRatio)
  animation.add(cameraZoom.duration(animation.duration()), 0)

  if (isPreferredReducedMotion()) {
    animation.progress(1)
    return
  }

  trigger = ScrollTrigger.create({
    trigger: section.value,
    start: 1,
    end: 'bottom bottom+=350',
    scrub: 1.25,
    animation: animation,
  })
})

onBeforeUnmount(() => {
  trigger?.kill()
  animation?.kill()
})
</script>

<style scoped>
.golden-ratio-frame {
  --spiral-eye-x: 452 / 1618;
  --width: max(100cqw, 100cqh * 1.618);
  --height: calc(var(--width) / 1.618);
  --ideal-center-position: 50cqw - var(--width) * var(--spiral-eye-x);
  --min-left-position: calc(100cqw - var(--width));
  --max-left-position: 0;
  width: var(--width);
  height: var(--height);
  top: calc(50cqh - var(--height) / 2);
  left: clamp(var(--min-left-position), var(--ideal-center-position), var(--max-left-position));
}

.photo {
  --to-edge: black calc(100% - var(--edge-fade)), transparent;
  mask-image: linear-gradient(to right, var(--to-edge)), linear-gradient(to bottom, var(--to-edge));
  mask-composite: intersect;
}

.dots,
.focal-point {
  opacity: 0;
}

.will-draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
</style>
