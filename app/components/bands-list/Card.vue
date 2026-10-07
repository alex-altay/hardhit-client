<template>
  <NuxtLink :to="`/bands/${band.slug}`" class="group block w-fit outline-none">
    <div
      class="flex flex-col w-[min(90vw,390px)] p-[min(3vw,15px)] pb-0 overflow-hidden dark:bg-white light:bg-elevated aspect-6/7 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-brand-primary"
    >
      <div class="shrink-0 w-full aspect-square overflow-hidden">
        <NuxtImg
          :src="getPreviewUrl(band)"
          class="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-103 motion-safe:group-focus-visible:scale-103"
          sizes="360px"
          format="webp"
        />
      </div>
      <div class="flex-1 h-full flex flex-col justify-center text-black">
        <div class="flex flex-row items-center gap-2">
          <div
            :class="[
              'relative after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-brand-primary',
              'after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out',
              'group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100',
            ]"
          >
            {{ band.name }}
          </div>
          <UiIconMicrophone
            v-if="band.interview_links.length"
            class="h-4 w-auto text-brand motion-safe:group-hover:animate-icon-hop"
          />
          <UiIconLive
            v-if="band.live_links.length"
            class="h-4 w-auto text-brand motion-safe:group-hover:animate-icon-hop motion-safe:group-hover:[animation-delay:80ms]"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ band: Band }>()

function getPreviewUrl(band: Band) {
  const firstMedia = band!.photos_collections[0]?.photos[0]
  return firstMedia ? getMediaLink(firstMedia) : ''
}
</script>
