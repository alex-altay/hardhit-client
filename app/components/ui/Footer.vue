<template>
  <UFooter
    :ui="{
      root: 'border-t border-default',
      container: 'lg:block',
      left: 'hidden',
      center: 'mt-0 block',
      right: 'hidden',
    }"
  >
    <div class="grid py-8 gap-6 text-sm md:grid-cols-3">
      <div class="flex flex-col gap-4">
        <nav class="flex flex-col gap-4">
          <ULink :active="false" to="/">Main</ULink>
          <ULink :active="false" to="/bands">Photos</ULink>
          <ULink :active="false" to="/design">Designed for Metal</ULink>
          <ULink :active="false" to="/about">About</ULink>
        </nav>

        <div class="flex items-center gap-4">
          <a
            href="https://www.instagram.com/hard_hit_mag/"
            target="_blank"
            aria-label="Instagram"
            class="text-muted hover:text-default transition-colors opacity-80"
          >
            <UiIconInstagram class="size-6" aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/@HardHitMag"
            target="_blank"
            aria-label="YouTube"
            class="text-muted hover:text-default transition-colors opacity-80"
          >
            <UiIconYoutubeOutline class="h-5 w-auto" aria-hidden="true" />
          </a>
        </div>
      </div>

      <nav class="flex flex-col gap-4 md:justify-self-center">
        <ULink :active="false" to="/privacy-policy">Privacy Policy</ULink>
        <ULink :active="false" to="/terms-of-use">Terms of Use</ULink>
      </nav>

      <div class="flex flex-col items-start justify-between gap-6 md:items-end">
        <UColorModeSwitch :ui="{ base: 'cursor-pointer' }" />
        <a
          :href="BUILT_BY.url"
          target="_blank"
          rel="noopener"
          :aria-label="`Built by ${BUILT_BY.name}, 2026`"
          class="made-by text-muted hover:text-default transition-colors"
        >
          Built by
          <span class="glitch" :data-text="BUILT_BY.name">{{ BUILT_BY.name }}</span
          >, 2026
        </a>
      </div>
    </div>
  </UFooter>
</template>

<script setup lang="ts">
const BUILT_BY = { name: 'Alex Trutanov', url: 'https://www.linkedin.com/in/trutanov-alex/' }
</script>

<style scoped>
.glitch {
  position: relative;
  display: inline-block;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}

.glitch::before {
  color: var(--color-brand-primary);
}

.glitch::after {
  --direction: -1;
  color: #00e5ff;
}

@media (prefers-reduced-motion: no-preference) {
  .made-by:is(:hover, :focus-visible) .glitch {
    animation: glitch-jerk 400ms step-end;
  }

  .made-by:is(:hover, :focus-visible) .glitch::before,
  .made-by:is(:hover, :focus-visible) .glitch::after {
    animation: glitch-split 400ms step-end;
  }
}

@keyframes glitch-jerk {
  0% {
    translate: 2px 0;
  }
  25% {
    translate: -1px 0;
  }
  50% {
    translate: 3px 0;
  }
  75% {
    translate: -2px 0;
  }
  100% {
    translate: 0 0;
  }
}

@keyframes glitch-split {
  0% {
    opacity: 0.9;
    translate: calc(var(--direction, 1) * 3px) 0;
    clip-path: inset(10% 0 55% 0);
  }
  20% {
    translate: calc(var(--direction, 1) * -3px) 0;
    clip-path: inset(60% 0 5% 0);
  }
  40% {
    translate: calc(var(--direction, 1) * 4px) 0;
    clip-path: inset(30% 0 40% 0);
  }
  60% {
    translate: calc(var(--direction, 1) * -2px) 0;
    clip-path: inset(0 0 75% 0);
  }
  80% {
    translate: calc(var(--direction, 1) * 2px) 0;
    clip-path: inset(45% 0 20% 0);
  }
  100% {
    opacity: 0;
  }
}
</style>
