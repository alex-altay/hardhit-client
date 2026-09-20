<template>
  <div class="pt-12">
   <h1 class="uppercase text-[4rem] font-black text-center">{{ about?.data.title }}</h1>
   <p class="pb-8 text-center text-[15px]">{{ about?.data.description }}</p>
    <div class="flex-1 w-full">
      <UCarousel
        ref="carousel"
        v-slot="{ item }"
        :items="items"
        :prev="{ onClick: onClickPrev }"
        :next="{ onClick: onClickNext }"
        class="w-full aspect-3/2 object-cover overflow-hidden"
        @select="onSelect"
      >
        <NuxtImg :src="item" class="w-full" />
      </UCarousel>
      <div class="relative flex gap-5 justify-between pt-4 w-full mx-auto">
        <NuxtImg
          v-for="(item, index) in items"
          :key="index"
          :class="{ 'opacity-100': activeIndex === index }"
          class="w-[20%] object-cover" 
          loading="lazy" 
          :src="item" 
          @click="select(index)"
        />
      </div>
    </div>

  </div>
</template> 

<script setup lang="ts">
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

const items = about?.value?.data?.fotos
  ? about?.value.data.fotos.sort((a, b) => a.id - b.id).map(el => `${strapiUrl}${el.url}`)
  : []

const carousel = useTemplateRef('carousel')
const activeIndex = ref(0)

function onClickPrev() {
  activeIndex.value--
}
function onClickNext() {
  activeIndex.value++
}
function onSelect(index: number) {
  activeIndex.value = index
}

function select(index: number) {
  activeIndex.value = index
  carousel.value?.emblaApi?.scrollTo(index)
}
</script>
