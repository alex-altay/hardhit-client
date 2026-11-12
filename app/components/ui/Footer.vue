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
    <div class="relative grid py-4 sm:py-8 gap-6 text-sm md:grid-cols-3">
      <div class="flex flex-col gap-4">
        <nav aria-label="Footer" class="flex flex-col items-start gap-4 text-red-500">
          <ULink class="text-default/70" :active="false" to="/">Main</ULink>
          <ULink class="text-default/70" :active="false" to="/bands">Photos</ULink>
          <ULink class="text-default/70" :active="false" to="/design">Designed for Metal</ULink>
          <ULink class="text-default/70" :active="false" to="/about">About</ULink>
        </nav>

        <div class="flex items-center gap-4">
          <a
            href="https://www.instagram.com/hard_hit_mag/"
            target="_blank"
            aria-label="Instagram (opens in new tab)"
            class="text-default/70 hover:text-default transition-colors"
          >
            <UiIconInstagram class="size-6" aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/@HardHitMag"
            target="_blank"
            aria-label="YouTube (opens in new tab)"
            class="text-default/70 hover:text-default transition-colors"
          >
            <UiIconYoutubeOutline class="h-5 w-auto" aria-hidden="true" />
          </a>
        </div>
      </div>

      <nav aria-label="Legal" class="flex flex-col items-start gap-4 md:justify-self-center">
        <ULink class="text-default/70" :active="false" to="/privacy-policy">Privacy Policy</ULink>
        <ULink class="text-default/70" :active="false" to="/terms-of-use">Terms of Use</ULink>
      </nav>

      <div class="flex flex-col items-start justify-between gap-6 md:items-end">
        <UColorModeSwitch
          :ui="{ base: 'cursor-pointer' }"
          class="absolute sm:static right-0 top-4"
        />
        <a
          :href="BUILT_BY.url"
          target="_blank"
          rel="noopener"
          :aria-label="`Built by ${BUILT_BY.name}, 2026 (opens in new tab)`"
          class="group text-default/70 hover:text-default transition-colors"
        >
          Built by
          <span class="glitch-text glitch-on-hover" :data-text="BUILT_BY.name">{{
            BUILT_BY.name
          }}</span
          >, 2026
        </a>
      </div>
    </div>
  </UFooter>
</template>

<script setup lang="ts">
const BUILT_BY = { name: 'Alex Trutanov', url: 'https://www.linkedin.com/in/trutanov-alex/' }
</script>
