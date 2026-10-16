<template>
  <div>
    <NuxtLink :to="youtube.link" target="_blank" class="group block [overflow-anchor:none]">
      <div class="mb-8 flex flex-row items-center justify-center">
        <UiIconYoutube
          class="mr-2 w-8 h-auto transition-colors group-hover:text-brand-primary group-focus-visible:text-brand-primary hover-hop"
          aria-hidden="true"
        />
        <p class="font-bold">Youtube</p>
      </div>
      <div class="w-full p-5 bg-elevated">
        <div class="mb-8 rounded-2xl overflow-hidden isolate">
          <NuxtImg
            :src="getMediaLink(youtube.banner)"
            class="block w-full aspect-6/1 object-cover object-left hover-zoom"
            format="webp"
            sizes="1180px"
          />
        </div>
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
            <div
              class="h-10 w-30 flex items-center justify-center bg-white rounded-3xl text-black transition-colors group-hover:bg-brand-primary group-hover:text-white group-focus-visible:bg-brand-primary group-focus-visible:text-white hover-hop"
            >
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
