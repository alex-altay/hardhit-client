<template>
  <div>
    <NuxtLink :to="instagram.link" target="_blank">
      <div class="mb-8 flex flex-row items-center justify-center">
        <UiIconInstagram class="mr-2 w-8 h-auto" aria-hidden="true" />
        <p class="font-bold">Instagram</p>
      </div>
      <div class="w-full p-5 bg-elevated">
        <div class="flex flex-row gap-6">
          <UAvatar
            class="h-20 w-20 sm:h-40 sm:w-40"
            :src="getMediaLink(instagram.logo)"
            alt="Hard Hit Magazine"
            sizes="160px"
          />
          <div class="mb-2 flex flex-col justify-between">
            <div class="text-2xl font-bold">
              <span class="mr-2">hard_hit_mag</span>
              <UiIconInstagramOptions class="inline size-6" />
            </div>
            <div class="text-xl font-bold">Hard Hit Magazine</div>
            <div class="flex flex-row flex-wrap gap-x-4">
              <span>{{ formatCount(instagram.photosCount, 'photo') }}</span>
              <span>{{ formatCount(instagram.followersCount, 'follower') }}</span>
              <span>{{ formatCount(instagram.followingCount, 'following', 'following') }}</span>
            </div>
            <div class="whitespace-pre-line">{{ instagram.description }}</div>
            <div class="mb-2 flex flex-row items-center text-blue-500">
              <UiIconLink class="mr-2 size-4" />
              hardhit.de
            </div>
          </div>
        </div>
        <div class="mb-5 flex flex-row gap-2">
          <div
            class="flex-1 h-10 flex items-center justify-center bg-neutral-700 rounded-3xl text-white"
          >
            Edit profile
          </div>
          <div
            class="flex-1 h-10 flex items-center justify-center bg-neutral-700 rounded-3xl text-white"
          >
            Archive
          </div>
        </div>
        <div class="mb-8 flex flex-row justify-start gap-5">
          <div v-if="instagram.photos[0]" class="flex flex-col items-center">
            <NuxtImg
              :src="getMediaLink(instagram.photos[0])"
              alt=""
              format="webp"
              sizes="100px"
              class="mb-2 h-10 w-10 sm:h-25 sm:w-25 rounded-full outline-2 outline-neutral-600 outline-offset-4 object-cover -scale-x-100 grayscale"
            />
            <div class="text-center">Highlights</div>
          </div>
          <div class="flex flex-col items-center">
            <div
              class="mb-2 h-10 w-10 sm:h-25 sm:w-25 rounded-full bg-neutral-400 outline-2 text-neutral-600 outline-neutral-600 outline-offset-4"
            >
              <UiIconPlus />
            </div>
            <div class="text-center">New</div>
          </div>
        </div>
        <div class="mb-4 flex flex-row justify-between">
          <UiIconGrid class="size-6" />
          <UiIconReels class="size-6" />
          <UiIconSaved class="size-6" />
          <UiIconTagged class="size-6" />
        </div>
        <div class="grid grid-cols-3 gap-1">
          <NuxtImg
            v-for="photo in instagram.photos"
            :key="photo.id"
            :src="getMediaLink(photo)"
            :alt="photo.alternativeText ?? ''"
            format="webp"
            sizes="33vw lg:400px"
            loading="lazy"
            class="w-full h-auto aspect-square object-cover object-top"
          />
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const { findOne } = useStrapi()

const instagram = await useStrapiData('instagram', () =>
  findOne<Instagram>('instagram', '', { populate: '*' }),
)
</script>
