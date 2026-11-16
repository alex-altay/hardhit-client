<template>
  <div
    :style="swayAngle ? { transform: `perspective(1200px) rotateY(${swayAngle}deg)` } : undefined"
    class="shadow-2xl"
    @pointermove="onPointerMove"
  >
    <div class="flex flex-col p-[5%] pb-0 aspect-6/7 bg-white">
      <NuxtImg
        :src="getMediaLink(band.photo)"
        :alt="band.description"
        class="shrink-0 w-full aspect-square object-cover"
        sizes="xs:25vw sm:25vw md:25vw lg:25vw xl:25vw 2xl:25vw"
        format="webp"
      />
      <div class="flex-1 flex items-center text-black font-bold text-[clamp(8px,1.1vw,20px)]">
        {{ band.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ band: PhotoWithDescription }>()

const MAX_SWAY_DEGREE = 5
const SWAY_SENSITIVITY = 0.02 // нow strong the card reacts to the mouse
const SWAY_SPEED = 0.08
const SWAY_CALMING = 0.15

const swayAngle = ref(0)
let swayVelocity = 0
let swayFrame = 0
let isReducedMotion = false

onMounted(() => (isReducedMotion = isPreferredReducedMotion()))

function onPointerMove(event: PointerEvent) {
  if (event.pointerType !== 'mouse' || isReducedMotion) {
    return
  }
  swayVelocity += event.movementX * SWAY_SENSITIVITY
  if (!swayFrame) {
    swayFrame = requestAnimationFrame(swayStep)
  }
}

function swayStep() {
  swayVelocity = (swayVelocity - SWAY_SPEED * swayAngle.value) * (1 - SWAY_CALMING)
  const angle = Math.min(
    Math.max(swayAngle.value + swayVelocity, -MAX_SWAY_DEGREE),
    MAX_SWAY_DEGREE,
  )

  if (Math.abs(angle) < 0.01 && Math.abs(swayVelocity) < 0.01) {
    swayAngle.value = 0
    swayVelocity = 0
    swayFrame = 0
    return
  }
  swayAngle.value = angle
  swayFrame = requestAnimationFrame(swayStep)
}

onBeforeUnmount(() => cancelAnimationFrame(swayFrame))
</script>
