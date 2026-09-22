<template>
  <UHeader
    :ui="{
      toggle: 'lg:inline-flex xl:hidden',
      content: 'lg:flex xl:hidden',
      overlay: 'lg:block xl:hidden',
      header: 'lg:px-8 border-b border-default',
    }"
  >
    <template #title>
      <NuxtImg
        class="relative top-0.5 h-9 w-auto light:invert"
        src="/images/logo.png"
        format="webp"
        width="115"
        height="36"
        alt=""
      />
    </template>

    <template #right>
      <UNavigationMenu
        class="hidden xl:flex"
        color="neutral"
        :items="desktopItems"
        :ui="{ link: linkClass }"
      />
    </template>

    <template #body>
      <UNavigationMenu :items="items" color="neutral" orientation="vertical" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const linkClass = [
  'h-24 px-6 font-bold before:hidden',
  'w-28 justify-center',
  'after:absolute after:inset-0 after:z-[-1] after:bg-[#a52a22]',
  'after:[clip-path:polygon(0_0,100%_0,100%_100%,0_90%)]',
  'after:origin-top after:scale-y-0 after:transition-transform after:duration-300 after:ease-out',
  'motion-reduce:after:transition-none',
].join(' ')
const activeClass = 'uppercase tracking-wide text-white hover:text-white after:scale-y-100'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() =>
  [
    { label: 'Photos', to: '/photos' },
    { label: 'About', to: '/about' },
  ].map((item) => ({ ...item, active: route.path.startsWith(item.to) })),
)

const desktopItems = computed<NavigationMenuItem[]>(() =>
  items.value.map((item) => ({ ...item, class: item.active ? activeClass : '' })),
)
</script>
