<template>
  <section ref="section" class="relative h-[300svh] motion-reduce:h-auto">
    <div
      class="sticky top-(--ui-header-height) h-[calc(100svh-var(--ui-header-height))] overflow-hidden @container-size"
    >
      <!-- A golden rectangle: everything inside is drawn in its own 1618 × 1000 coordinates -->
      <div class="frame absolute">
        <!-- Cropped so that the microphone crosses the thirds and the mouth is close to the eye of the spiral -->
        <NuxtImg
          src="/images/design-hero/baest.webp"
          alt="Example of photo to display design rules"
          class="absolute top-[-30%] left-[-45.67%] h-auto w-[148.61%] max-w-none"
          format="webp"
          fetchpriority="high"
          preload
        />

        <svg
          viewBox="0 0 1618 1000"
          class="absolute inset-0 size-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient :id="`${id}-hole`">
              <stop offset="0.5" stop-color="black" />
              <stop offset="1" stop-color="white" />
            </radialGradient>
            <mask :id="`${id}-spotlight`">
              <rect width="1618" height="1000" fill="white" />
              <circle
                class="spotlight"
                :cx="SPIRAL_EYE.x"
                :cy="SPIRAL_EYE.y"
                r="1900"
                :fill="`url(#${id}-hole)`"
              />
            </mask>
          </defs>

          <!-- Darkens everything around the eye of the spiral -->
          <rect
            class="shade"
            width="1618"
            height="1000"
            fill="black"
            opacity="0"
            :mask="`url(#${id}-spotlight)`"
          />

          <g class="thirds" stroke="white" stroke-opacity="0.8" stroke-width="2">
            <line class="draw" x1="539" y1="0" x2="539" y2="1000" pathLength="1" />
            <line class="draw" x1="1079" y1="0" x2="1079" y2="1000" pathLength="1" />
            <line class="draw" x1="0" y1="333" x2="1618" y2="333" pathLength="1" />
            <line class="draw" x1="0" y1="667" x2="1618" y2="667" pathLength="1" />
            <g class="thirds-dots" fill="white" stroke="none">
              <circle
                v-for="dot in THIRDS_DOTS"
                :key="`${dot.x}-${dot.y}`"
                :cx="dot.x"
                :cy="dot.y"
                r="7"
              />
            </g>
          </g>

          <g>
            <g class="golden" stroke="white" stroke-opacity="0.6" stroke-width="2">
              <path
                v-for="line in GOLDEN_LINES"
                :key="line"
                class="draw"
                :d="line"
                pathLength="1"
              />
            </g>
            <path
              class="spiral draw"
              :d="SPIRAL"
              stroke="#d4af37"
              stroke-width="5"
              pathLength="1"
            />
          </g>

          <g class="leading stroke-brand-primary" stroke-width="4" stroke-linecap="round">
            <path v-for="line in LEADING_LINES" :key="line" class="draw" :d="line" pathLength="1" />
          </g>

          <g class="focal stroke-brand-primary" stroke-width="3">
            <g
              v-for="point in FOCAL_POINTS"
              :key="`${point.x}-${point.y}`"
              class="focal-point"
              :transform="`translate(${point.x} ${point.y})`"
            >
              <circle r="38" />
              <path d="M-60 0H-22M22 0H60M0 -60V-22M0 22V60" />
            </g>
          </g>
        </svg>
      </div>

      <!-- Keeps the captions readable on any photo -->
      <div
        class="pointer-events-none absolute inset-0 bg-linear-to-l from-black/70 via-black/0 via-45% to-transparent"
      />

      <!-- Step captions are stacked in one place and replace each other -->
      <div
        class="absolute top-1/2 right-4 grid max-w-md -translate-y-1/2 text-right text-white sm:right-8"
      >
        <div
          v-for="(step, index) in STEPS"
          :key="step.title"
          class="caption col-start-1 row-start-1"
          :class="{ 'opacity-0': index > 0 }"
        >
          <div class="mb-1 text-sm tracking-[0.2em] text-white/60">
            {{ String(index + 1).padStart(2, '0') }} /
            {{ String(STEPS.length).padStart(2, '0') }}
          </div>
          <div class="text-2xl font-bold uppercase sm:text-4xl">{{ step.title }}</div>
          <div class="text-lg text-balance text-white/75">{{ step.text }}</div>
        </div>
      </div>

      <UiScrollDownButton
        class="absolute bottom-4 left-1/2 -translate-x-1/2"
        :scroll-target-id="scrollTargetId"
        screen-reader-label="Scroll to the articles"
        is-always-visible
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineProps<{ scrollTargetId: string }>()

const STEPS = [
  { title: 'Rule of thirds', text: 'The microphone sits right where the lines cross' },
  { title: 'Golden ratio', text: 'φ = 1.618. The spiral curls straight into his face' },
  { title: 'Leading lines', text: 'The arm and the microphone both run back to his mouth' },
]

const THIRDS_DOTS = [539, 1079].flatMap((x) => [333, 667].map((y) => ({ x, y })))

/**
 * Golden rectangle 1618 × 1000 cut into squares: right, bottom, left, top and so on, spiralling inwards.
 * Each quarter arc of the spiral lies in its square
 */
const GOLDEN_LINES = [
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
  'M1618 0',
  'A1000 1000 0 0 1 618 1000',
  'A618 618 0 0 1 0 382',
  'A382 382 0 0 1 382 0',
  'A236 236 0 0 1 618 236',
  'A146 146 0 0 1 472 382',
  'A90 90 0 0 1 382 292',
  'A56 56 0 0 1 438 236',
  'A34 34 0 0 1 472 270',
].join(' ')
const SPIRAL_EYE = { x: 452, y: 262 }

/** Points of the photo in the frame coordinates, picked by eye: the mouth and the tip of the pointing finger */
const MOUTH = { x: 452, y: 359 }
const FINGER = { x: 1447, y: 864 }
const LEADING_LINES = [`M${FINGER.x} ${FINGER.y}L347 534`, 'M1007 269L480 342']
const FOCAL_POINTS = [MOUTH, FINGER]

const id = useId()
const section = useTemplateRef('section')
let media: gsap.MatchMedia | undefined

function buildTimeline() {
  const draw = (targets: string, duration: number) =>
    gsap.to(targets, { strokeDashoffset: 0, duration, stagger: 0.15, ease: 'none' })
  const showCaption = (index: number) =>
    gsap
      .timeline()
      .to(`.caption:nth-child(${index})`, { opacity: 0, y: -12, duration: 0.3 })
      .fromTo(
        `.caption:nth-child(${index + 1})`,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3 },
      )

  return (
    gsap
      .timeline({ defaults: { ease: 'power1.inOut' } })
      // 1. Rule of thirds
      .add(draw('.thirds .draw', 1))
      .fromTo(
        '.thirds-dots circle',
        { opacity: 0, scale: 0, transformOrigin: 'center' },
        { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4 },
      )
      // 2. Golden ratio, the light gathers into the eye of the spiral
      .add(showCaption(1), '+=0.4')
      .to('.thirds', { opacity: 0.25, duration: 0.5 }, '<')
      .add(draw('.golden .draw', 1.2))
      .add(draw('.spiral', 1.8), '<0.4')
      .to('.shade', { attr: { opacity: 0.65 }, duration: 1.8 }, '<')
      .to('.spotlight', { attr: { r: 520 }, duration: 1.8 }, '<')
      // 3. Leading lines and focal points
      .add(showCaption(2), '+=0.4')
      .to('.shade', { attr: { opacity: 0.3 }, duration: 0.6 }, '<')
      .add(draw('.leading .draw', 1))
      .fromTo(
        '.focal-point',
        { opacity: 0, scale: 0.4, transformOrigin: 'center' },
        { opacity: 1, scale: 1, stagger: 0.2, duration: 0.5 },
      )
      // A pause with everything drawn before the page scrolls on
      .to({}, { duration: 0.6 })
  )
}

function setupAnimation() {
  media?.revert()
  media = gsap.matchMedia()
  media.add(
    {
      animated: '(prefers-reduced-motion: no-preference)',
      reduced: '(prefers-reduced-motion: reduce)',
    },
    (context) => {
      const timeline = buildTimeline()
      // No scroll animation: the photo with the whole analysis drawn on it
      if (context.conditions?.reduced) {
        timeline.progress(1)
        return
      }
      ScrollTrigger.create({
        trigger: section.value,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        animation: timeline,
      })
    },
    section.value ?? undefined,
  )
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  setupAnimation()
})

onBeforeUnmount(() => media?.revert())
</script>

<style scoped>
/*
 * The golden rectangle covers the screen like object-fit: cover, so the drawing stays glued to the photo.
 * When it is wider than the screen, it is shifted to keep the eye of the spiral (27.94% of the width) in the middle
 */
.frame {
  --width: max(100cqw, 100cqh * 1.618);
  --height: calc(var(--width) / 1.618);
  width: var(--width);
  height: var(--height);
  top: calc((100cqh - var(--height)) / 2);
  left: clamp(100cqw - var(--width), 50cqw - var(--width) * 0.2794, 0px);
}

/* Lines start hidden already in the server html, gsap draws them by moving the dash */
.draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.thirds-dots circle,
.focal-point {
  opacity: 0;
}
</style>
