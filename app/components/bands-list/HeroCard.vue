<template>
  <div>
    <div class="flex flex-col p-[5%] pb-0 aspect-6/7 bg-white shadow-2xl">
      <NuxtImg
        :src="getMediaLink(band.photo)"
        :alt="band.description"
        class="shrink-0 w-full aspect-square object-cover"
        sizes="xs:40vw sm:30vw md:30vw lg:30vw xl:30vw 2xl:560px"
        format="webp"
      />
      <div class="flex-1 flex items-center text-black font-bold text-[clamp(8px,1.1vw,20px)]">
        {{ band.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ band: PhotoWithDescription }>()
</script>
