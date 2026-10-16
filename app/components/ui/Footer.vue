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
          <ULink :active="false" to="/about">About</ULink>
        </nav>

        <div class="flex items-center gap-4">
          <a
            href="https://www.instagram.com/hard_hit_mag/"
            target="_blank"
            aria-label="Instagram"
            class="text-muted hover:text-default transition-colors opacity-80"
          >
            <UiIconInstagram class="size-6 fill-current" aria-hidden="true" />
          </a>
          <a
            href="https://www.youtube.com/@HardHitMag"
            target="_blank"
            aria-label="YouTube"
            class="text-muted hover:text-default transition-colors opacity-80"
          >
            <UiIconYoutubeOutline class="h-5 w-auto fill-current" aria-hidden="true" />
          </a>
        </div>
      </div>

      <nav class="flex flex-col gap-4 md:justify-self-center">
        <ULink :active="false" to="/privacy-policy">Privacy Policy</ULink>
        <ULink :active="false" to="/terms-of-use">Terms of Use</ULink>
      </nav>

      <div class="flex md:justify-end">
        <UColorModeSwitch :ui="{ base: 'cursor-pointer' }" />
      </div>
    </div>
  </UFooter>
</template>
