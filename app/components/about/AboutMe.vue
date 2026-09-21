<template>
  <div>
   <h1 class="uppercase text-[4rem] font-black text-center">{{ about?.data.title }}</h1>
   <p class="pb-8 text-center text-[15px]">{{ about?.data.description }}</p>
    <PhotoGallery :images="images" />
  </div>
</template> 

<script setup lang="ts">
import PhotoGallery from '@/components/ui/PhotoGallery.vue'

type About = {
  title: string
  description: string
  fotos: {
    id: number
    url: string
    name: string
  }[] | null
}

const { public: { strapiUrl } } = useRuntimeConfig()
const { data: about } = await useFetch<{ data: About }>(
  '/api/strapi/about', { query: { populate: '*' }})

const images = about?.value?.data?.fotos
  ? about?.value.data.fotos.sort((a, b) => a.id - b.id).map(el => `${strapiUrl}${el.url}`)
  : []
</script>
