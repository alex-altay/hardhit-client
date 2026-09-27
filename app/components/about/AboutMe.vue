<template>
  <div>
    <h1>{{ about?.data.title }}</h1>
    <p class="pb-8 text-center text-[15px]">{{ about?.data.description }}</p>
    <UiPhotoGallery :images="images" />
  </div>
</template>

<script setup lang="ts">
type About = {
  title: string
  description: string
  fotos: StrapiMedia[]
}

const {
  public: { strapiOrigin },
} = useRuntimeConfig()
const { data: about } = await useFetch<StrapiResponse<About>>('/api/strapi/about', {
  query: { populate: '*' },
})

const images = about?.value?.data?.fotos
  ? about?.value.data.fotos.sort((a, b) => a.id - b.id).map((el) => `${strapiOrigin}${el.url}`)
  : []
</script>
