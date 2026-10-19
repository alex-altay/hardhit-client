<template>
  <div class="absolute inset-0">
    <NuxtImg
      :src="`/images/intro/frame${index}.webp`"
      class="absolute object-cover"
      :style="{
        left: `${frame.left}%`,
        top: `${frame.top}%`,
        width: `${frame.width}%`,
        height: `${frame.height}%`,
      }"
      :sizes
      format="webp"
      alt=""
    />
  </div>
</template>

<script lang="ts">
const FRAMES = [
  { left: 9.6, top: 10.1, width: 80.8, height: 79.9 },
  { left: 2, top: 2.4, width: 60, height: 87.5 },
  { left: 1.8, top: 17.7, width: 34.6, height: 81.7 },
  { left: 63.6, top: 0.6, width: 34.6, height: 81.7 },
  { left: 1.7, top: 10.1, width: 80, height: 87.5 },
  { left: 32.6, top: 2.4, width: 31.2, height: 94.2 },
  { left: 44, top: 3, width: 30, height: 92 },
]

export const FRAMES_COUNT = FRAMES.length
</script>

<script setup lang="ts">
const { index } = defineProps<{ index: number }>()

const frame = computed(() => FRAMES[index]!)
const sizes = computed(() =>
  ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    .map((breakpoint) => `${breakpoint}:${Math.round(frame.value.width)}vw`)
    .join(' '),
)
</script>
