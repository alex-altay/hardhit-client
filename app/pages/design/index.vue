<template>
  <div>
    <DesignArticlesHero class="mb-12" :scroll-target-id="scrollTargetId" />
    <UContainer class="py-12">
      <h1
        :id="scrollTargetId"
        v-animate.delayed
        class="mb-24! scroll-mt-[calc(var(--ui-header-height)+16px)]"
      >
        Designed for Metal
      </h1>
      <div class="@container">
        <div class="grid grid-flow-dense gap-12 @min-[608px]:grid-cols-2 @min-[936px]:grid-cols-3">
          <DesignArticleCard v-for="article in articles" :key="article.slug" :article />
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'full-width' })

const scrollTargetId = useId()
const { find } = useStrapi()
const articles = await useStrapiData('design-articles', () =>
  find<DesignArticle>('design-articles', { populate: '*' }),
)
</script>
