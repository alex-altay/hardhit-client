<template>
  <div class="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <section v-for="[letter, group] in bandsByLetter" :key="letter">
      <div class="mb-2 text-5xl font-bold">{{ letter }}</div>
      <ul>
        <li v-for="band in group" :key="band.slug" class="flex flex-row items-center gap-1.5">
          <NuxtLink
            v-if="hasAnyMedia(band.media)"
            :to="`/bands/${band.slug}`"
            class="hover:text-brand-primary"
          >
            {{ band.name }}
          </NuxtLink>
          <span v-else>{{ band.name }}</span>
          <template v-if="band.media.hasInterview">
            <UiIconMicrophone class="h-[1em] w-auto text-brand" />
            <span class="sr-only">interview</span>
          </template>
          <template v-if="band.media.hasVideo">
            <UiIconLive class="h-[1em] w-auto text-brand" />
            <span class="sr-only">video</span>
          </template>
          <template v-if="band.media.hasPhotos">
            <UiIconPhoto class="h-[1em] w-auto text-brand" />
            <span class="sr-only">photos</span>
          </template>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ bands: BandIndexEntry[] }>()
const bandsByLetter = computed(() => groupBandsByLetter(props.bands))
</script>
