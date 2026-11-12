<template>
  <NuxtLink
    :to="`/design/${article.slug}`"
    class="group flex flex-col [overflow-anchor:none] outline-none"
    :class="{
      '@min-[608px]:row-span-2': article.isVerticalFeatured,
      '@min-[608px]:col-span-2': article.isHorizontalFeatured,
    }"
  >
    <div
      class="relative mb-4 aspect-square overflow-hidden group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-focus"
      :class="{
        '@min-[608px]:aspect-auto @min-[608px]:min-h-[calc((100cqw-3rem)/2)] @min-[936px]:min-h-[calc((100cqw-6rem)/3)] @min-[608px]:flex-1':
          article.isVerticalFeatured,
        '@min-[608px]:aspect-auto @min-[608px]:h-[calc((100cqw-3rem)/2)] @min-[936px]:h-[calc((100cqw-6rem)/3)]':
          article.isHorizontalFeatured,
      }"
    >
      <NuxtImg
        :src="getMediaLink(article.cover)"
        :alt="article.cover.alternativeText || article.title"
        class="absolute inset-0 size-full object-cover hover-zoom"
        :sizes="
          article.isVerticalFeatured || article.isHorizontalFeatured
            ? 'xs:100vw sm:100vw md:100vw lg:800px'
            : 'xs:100vw sm:100vw md:50vw lg:400px'
        "
        format="webp"
        loading="lazy"
      />
    </div>
    <div class="mb-2 w-fit font-bold uppercase hover-underline text-xl line-clamp-1">
      {{ article.title }}
    </div>
    <p class="leading-relaxed text-muted line-clamp-3">
      {{ article.summary }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ article: DesignArticle }>()
</script>
