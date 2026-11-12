<template>
  <div
    class="relative w-full aspect-video overflow-hidden rounded-2xl bg-black has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-focus"
  >
    <iframe
      v-if="isPlaying"
      ref="player"
      class="absolute inset-0 h-full w-full"
      :src="`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`"
      :title="title"
      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
      allowfullscreen
    />
    <button
      v-else
      type="button"
      class="group absolute inset-0 h-full w-full cursor-pointer outline-none"
      :aria-label="`Play ${title}`"
      @click="play"
    >
      <img
        class="h-full w-full object-cover"
        :src="`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`"
        :alt="title"
        loading="lazy"
      />
      <UiIconYoutube
        aria-hidden="true"
        class="absolute top-1/2 left-1/2 w-16 -translate-x-1/2 -translate-y-1/2 opacity-90 group-hover:opacity-100 fill-brand"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ videoId: string; title: string }>()

const isPlaying = ref(false)
const player = useTemplateRef('player')

async function play() {
  isPlaying.value = true
  await nextTick()
  player.value?.focus()
}
</script>
