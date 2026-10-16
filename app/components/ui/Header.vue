<template>
  <UHeader
    :menu="menu"
    :ui="{
      toggle: 'lg:inline-flex xl:hidden',
      content: menuContentClass,
      overlay: 'lg:block xl:hidden',
      header: 'lg:px-8 border-b border-default',
      body: 'flex-1 flex flex-col overflow-x-hidden',
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
      <nav class="flex flex-col items-end gap-2">
        <NuxtLink
          v-for="(item, index) in mobileItems"
          :key="item.label"
          :to="item.to"
          class="relative w-[min(250px,50%)] isolate pl-10 pr-4 pt-4 pb-12 text-end text-xl font-bold uppercase tracking-wide animate-[enter-from-right_400ms_var(--ease-out)_both]"
          :class="item.active && mobileActiveClass"
          :style="{ animationDelay: `${index * 60}ms` }"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="mt-auto flex justify-center pt-8">
        <UColorModeSwitch />
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const linkClass = [
  'h-24 px-6 font-bold before:hidden',
  'w-28 justify-center',
  'after:absolute after:inset-0 after:z-[-1] after:bg-brand-strong',
  'after:[clip-path:polygon(0_0,100%_0,100%_100%,0_90%)]',
  'after:origin-top after:scale-y-0 after:transition-transform after:duration-300 after:ease-out',
  'motion-reduce:after:transition-none',
].join(' ')
const activeClass = 'uppercase tracking-wide text-white hover:text-white after:scale-y-100'
const mobileActiveClass = [
  'text-white mb-4',
  'after:absolute after:inset-0 after:-z-1 after:bg-brand-strong',
  'after:[clip-path:polygon(0_0,100%_0,100%_100%,0_75%)]',
].join(' ')

const menu = {
  transition: true,
  content: { onOpenAutoFocus: (event: Event) => event.preventDefault() },
}

const menuContentClass = [
  'lg:flex xl:hidden',
  'data-[state=open]:animate-[fade-in_200ms_var(--ease-out)]',
  'data-[state=closed]:animate-[fade-out_200ms_var(--ease-out)]',
].join(' ')

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() =>
  [
    { label: 'Photos', to: '/bands' },
    { label: 'About', to: '/about' },
  ].map((item) => ({ ...item, active: route.path.startsWith(item.to) })),
)

const mobileItems = computed<NavigationMenuItem[]>(() => [
  { label: 'Main', to: '/', active: route.path === '/' },
  ...items.value,
])

const desktopItems = computed<NavigationMenuItem[]>(() =>
  items.value.map((item) => ({ ...item, class: item.active ? activeClass : '' })),
)
</script>
