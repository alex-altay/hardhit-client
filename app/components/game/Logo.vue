<template>
  <svg viewBox="0 0 200 200" role="img" aria-label="Metalhead Quiz">
    <defs>
      <path id="quiz-logo-top" d="M28 100A72 72 0 0 1 172 100" />
      <path id="quiz-logo-bottom" d="M16 100A84 84 0 0 0 184 100" />
    </defs>

    <circle cx="100" cy="100" r="96" class="fill-ink stroke-brand-primary" stroke-width="3" />

    <g class="stroke-white/15" stroke-width="1.5">
      <line
        v-for="angle in RAYS"
        :key="angle"
        x1="100"
        y1="80"
        x2="100"
        y2="44"
        :transform="`rotate(${angle} 100 100)`"
      />
    </g>
    <circle cx="100" cy="100" r="58" class="stroke-brand-primary" fill="none" stroke-width="1.5" />

    <path
      class="fill-brand-primary"
      transform="translate(60 60) scale(0.2)"
      d="M157.055 0 90.798 196.319h73.619L88.344 400l201.227-240.491h-71.166L311.656 0z"
    />

    <text class="fill-white font-bold" font-size="15" letter-spacing="1">
      <textPath href="#quiz-logo-top" startOffset="50%" text-anchor="middle">
        WHO WANTS TO BE A
      </textPath>
    </text>
    <text class="fill-white font-bold" font-size="15" letter-spacing="2">
      <textPath href="#quiz-logo-bottom" startOffset="50%" text-anchor="middle">
        WHO WANTS TO BE A
      </textPath>
    </text>
    <text
      x="100"
      y="100"
      dx="1"
      text-anchor="middle"
      dominant-baseline="central"
      class="fill-white stroke-ink font-bold"
      font-size="27"
      letter-spacing="2"
      stroke-width="2"
      paint-order="stroke"
    >
      METALHEAD
    </text>
  </svg>
</template>

<script setup lang="ts">
const RAYS = Array.from({ length: 18 }, (_, index) => index * 20)
</script>
