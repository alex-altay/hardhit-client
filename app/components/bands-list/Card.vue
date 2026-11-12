<template>
  <NuxtLink
    :to="`/bands/${band.slug}`"
    class="group block w-fit [overflow-anchor:none] outline-none"
  >
    <div
      class="flex flex-col w-[min(90vw,390px)] p-[min(3vw,15px)] pb-0 overflow-hidden dark:bg-white light:bg-elevated aspect-6/7 group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-focus"
    >
      <div class="shrink-0 w-full aspect-square overflow-hidden">
        <NuxtImg
          :src="getPreviewUrl(band)"
          alt=""
          class="h-full w-full object-cover hover-zoom"
          sizes="360px"
          format="webp"
        />
      </div>
      <div class="flex-1 h-full flex flex-col justify-center text-black">
        <div class="flex flex-row items-center gap-2">
          <div class="hover-underline">{{ band.name }}</div>
          <UiIconMicrophone v-if="media.hasInterview" class="h-4 w-auto text-brand hover-hop" />
          <UiIconLive
            v-if="media.hasVideo"
            class="h-4 w-auto text-brand hover-hop [--hop-delay:80ms]"
          />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{ band: Band }>()
const media = computed(() => getBandMedia(props.band))

function getPreviewUrl(band: Band) {
  const firstMedia = band!.photos_collections[0]?.photos[0]
  return firstMedia ? getMediaLink(firstMedia) : ''
}
</script>
