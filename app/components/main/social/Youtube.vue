<template>
  <div>
    <NuxtLink :to="youtube.link" target="_blank">
      <div class="mb-8 flex flex-row items-center justify-center">
        <UiIconYoutube class="mr-2 w-8 h-auto dark:invert" aria-hidden="true" />
        <p class="font-bold">Youtube</p>
      </div>
      <div class="w-full p-5 bg-elevated">
        <NuxtImg
          :src="`${strapiOrigin}${youtube.banner.url}`"
          class="mb-8 w-full rounded-2xl aspect-6/1 object-cover object-left"
          format="webp"
          sizes="1180px"
        />
        <div class="flex flex-row gap-6">
          <UAvatar
            class="h-20 w-20 sm:h-40 sm:w-40"
            :src="`${strapiOrigin}${youtube.logo.url}`"
            sizes="160px"
          />
          <div class="flex flex-col justify-between">
            <div class="text-2xl font-bold">Hard Hit Magazine</div>
            <div>
              <span class="font-bold text-wrap">@HardHitMag</span> •&nbsp;
              <span>{{ youtube.subscribersCount }}&nbsp;subscribers</span> •&nbsp;
              <span>{{ youtube.videosCount }}&nbsp;videos</span>
            </div>
            <div>{{ youtube.description }}</div>
            <div class="mb-2 text-blue-500">hardhit.de</div>
            <div class="h-10 w-30 flex items-center justify-center bg-white rounded-3xl text-black">
              Subscribe
            </div>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { strapiOrigin } = useRuntimeConfig().public
const { findOne } = useStrapi()

const youtube = await useStrapiData('youtube', () =>
  findOne<Youtube>('youtube', '', { populate: '*' }),
)
</script>
