<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-5xl font-extrabold mb-10 text-center">
      Hardhit client bare bones
    </h1>

    <section aria-labelledby="articles-title" class="space-y-8">
      <h2 id="articles-title" class="text-3xl font-bold">Latest Articles</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in articles?.data"
          :key="article.id"
          class="bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col"
        >
          <NuxtImg
            :src="`${strapiUrl}${article.cover.url}`"
            :alt="`Cover image for ${article.title}`"
            class="w-full h-52 object-cover"
          />

          <div class="p-6 flex flex-col gap-3">
            <h3
              class="text-2xl font-semibold text-gray-900 dark:text-white leading-snug"
            >
              {{ article.title }}
            </h3>
            <p
              class="text-gray-700 dark:text-gray-400 text-base leading-relaxed line-clamp-4"
            >
              {{ article.content }}
            </p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
type Article = {
  id: number
  title: string
  content: string
  publishedAt: string
  cover: {
    url: string
  }
}

const { public: { strapiUrl } } = useRuntimeConfig()
const { data: articles } = await useFetch<{ data: Article[] }>(
  '/api/strapi/articles', { query: { populate: '*' }})
</script>
