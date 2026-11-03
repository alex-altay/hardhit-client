<template>
  <div
    ref="curtain"
    class="fixed inset-x-0 top-0 z-100 h-svh bg-brand-strong text-brand-strong"
    :class="{ invisible: !isVisible }"
    aria-hidden="true"
  >
    <svg
      class="absolute inset-x-0 bottom-full w-full"
      :style="{ height: `${CURVE_HEIGHT * 100}svh` }"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path ref="topCurve" :d="getTopCurve(0)" fill="currentColor" />
    </svg>
    <svg
      class="absolute inset-x-0 top-full w-full"
      :style="{ height: `${CURVE_HEIGHT * 100}svh` }"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <path ref="bottomCurve" :d="getBottomCurve(0)" fill="currentColor" />
    </svg>

    <div class="absolute inset-0 grid place-items-center overflow-hidden">
      <div ref="label" class="text-[12cqw] sm:text-8xl font-bold uppercase text-white">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import gsap from 'gsap'
import type { RouteLocationNormalized } from 'vue-router'

const CURVE_HEIGHT = 0.4

const curtain = useTemplateRef('curtain')
const topCurve = useTemplateRef('topCurve')
const bottomCurve = useTemplateRef('bottomCurve')
const labelElement = useTemplateRef('label')

const label = ref('')
const isVisible = ref(false)

function getTopCurve(bulge: number) {
  return `M0 100 Q50 ${100 - bulge * 100} 100 100Z`
}

function getBottomCurve(bulge: number) {
  return `M0 0 Q50 ${bulge * 100} 100 0Z`
}

function coverPreviousPage(to: RouteLocationNormalized) {
  label.value = routeToLabel(to)
  isVisible.value = true
  const offset = window.innerHeight * (1 + CURVE_HEIGHT)
  const curve = { bulge: 1 }
  return new Promise((resolve) => {
    gsap
      .timeline({ onComplete: resolve })
      .fromTo(curtain.value, { y: -offset }, { y: 0, duration: 0.5, ease: 'power3.inOut' })
      .fromTo(
        curve,
        { bulge: 1 },
        {
          bulge: 0,
          duration: 0.5,
          ease: 'power2.in',
          onUpdate: () => bottomCurve.value?.setAttribute('d', getBottomCurve(curve.bulge)),
        },
        '<',
      )
      .fromTo(
        labelElement.value,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.25, ease: 'power3.out' },
        '-=0.2',
      )
  })
}

function revealNextPage() {
  const offset = window.innerHeight * (1 + CURVE_HEIGHT)
  const curve = { bulge: 0 }
  return gsap
    .timeline({ onComplete: () => void (isVisible.value = false) })
    .to(labelElement.value, {
      yPercent: 100,
      opacity: 0,
      duration: 0.35,
      ease: 'power3.in',
    })
    .to(curtain.value, { y: offset, duration: 0.5, ease: 'power3.inOut' }, '-=0.2')
    .to(
      curve,
      {
        bulge: 1,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => topCurve.value?.setAttribute('d', getTopCurve(curve.bulge)),
      },
      '<',
    )
}

const isFromXL = useBreakpoints(breakpointsTailwind).greaterOrEqual('xl')
if (isFromXL.value) {
  usePageCurtain({ coverPreviousPage, revealNextPage })
}
</script>
