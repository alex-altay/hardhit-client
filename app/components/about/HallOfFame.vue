<template>
  <section>
    <h2 v-animate.delayed class="title-page">HALL OF FAME</h2>
    <div class="mb-2 text-xl text-center">
      All the bands I've seen (so far): <span class="text-brand">{{ bands.length }}</span>
    </div>
    <div class="mb-16 flex flex-row flex-wrap items-center justify-center gap-4 sm:gap-8 text-xl">
      <span class="inline-flex items-center gap-2">
        <UiIconMicrophone class="h-[1em] w-auto text-brand" />
        Interview
      </span>
      <span class="inline-flex items-center gap-2">
        <UiIconLive class="h-[1em] w-auto text-brand" />
        Video
      </span>
      <span class="inline-flex items-center gap-2">
        <UiIconPhoto class="h-[1em] w-auto text-brand" />
        Photos
      </span>
    </div>
    <AboutBandsSeen :bands />
  </section>
</template>

<script setup lang="ts">
const client = useStrapiClient()
const bands = await useStrapiData('bands-index', () =>
  client<{ data: BandIndexEntry[] }>('/bands-index'),
)
</script>
