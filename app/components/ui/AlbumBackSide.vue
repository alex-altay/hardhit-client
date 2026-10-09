<template>
  <span class="block bg-neutral-300 p-[5%]">
    <span
      class="flex size-full flex-col overflow-hidden bg-neutral-50 p-[6%] text-left text-neutral-900"
    >
      <span class="block text-[clamp(1.5rem,4vw,3rem)] leading-none font-bold">
        #{{ album.position }}
      </span>
      <span class="mt-[6%] block text-[clamp(0.875rem,1.4vw,1.25rem)] font-bold uppercase">
        {{ album.band }}
      </span>
      <span class="block text-[clamp(0.75rem,1.2vw,1rem)] text-neutral-600">
        {{ album.album }}
      </span>
      <span class="mt-[6%] block text-[clamp(0.75rem,1.1vw,1rem)] leading-relaxed">
        {{ album.description }}
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{ album: TopAlbum }>()
</script>
