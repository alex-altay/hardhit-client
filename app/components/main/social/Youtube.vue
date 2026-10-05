<template>
  <div>
    <NuxtLink :to="youtube.link" target="_blank">
      <div class="mb-8 flex flex-row items-center justify-center">
        <UiIconYoutube class="mr-2 w-8 h-auto dark:invert" aria-hidden="true" />
        <p class="font-bold">Youtube</p>
      </div>
      <div class="w-full p-5 bg-elevated">
        <NuxtImg
          :src="getMediaLink(youtube.banner)"
          class="mb-8 w-full rounded-2xl aspect-6/1 object-cover object-left"
          format="webp"
          sizes="1180px"
        />
        <div class="flex flex-row gap-6">
          <UAvatar
            class="h-20 w-20 sm:h-40 sm:w-40"
            :src="getMediaLink(youtube.logo)"
            sizes="160px"
          />
          <div class="flex flex-col justify-between">
            <div class="text-2xl font-bold">Hard Hit Magazine</div>
            <div class="flex flex-row flex-wrap">
              <span class="mr-1 font-bold">@HardHitMag</span>
              <span class="mr-1"
                >•&nbsp;{{ formatCount(youtube.subscribersCount, 'subscriber') }}</span
              >
              <span>•&nbsp;{{ formatCount(youtube.videosCount, 'video') }}</span>
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
const { findOne } = useStrapi()

const youtube = await useStrapiData('youtube', () =>
  findOne<Youtube>('youtube', '', { populate: '*' }),
)
</script>
