<template>
  <div>
    <div
      class="flex flex-col w-[min(90vw,400px)] p-[min(3vw,15px)] pb-0 overflow-hidden dark:bg-white light:bg-elevated aspect-6/7"
    >
      <NuxtImg
        :src="getPreviewUrl(band)"
        class="shrink-0 w-full aspect-square object-cover"
        sizes="370px"
        format="webp"
      />
      <div class="flex-1 h-full flex flex-col justify-center text-black">
        <div class="flex flex-row items-center gap-2">
          <NuxtLink :to="`/bands/${band.slug}`">{{ band.name }}</NuxtLink>
          <UiIconMicrophone v-if="band.interview_links.length" class="h-4 w-auto text-brand" />
          <UiIconLive v-if="band.live_links.length" class="inline h-4 w-auto text-brand" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ band: Band }>()

function getPreviewUrl(band: Band) {
  const firstMedia = band!.photos_collections[0]?.photos[0]
  return firstMedia ? getMediaLink(firstMedia) : ''
}
</script>
