<template>
  <article class="flex flex-col">
    <UiBackLink to="/design" />
    <ArticleHeader :title="article.title" :lead="article.summary" :has-divider="!!article.text" />
    <ArticleText v-if="article.text" class="mx-auto mb-14 w-full max-w-4xl" :value="article.text" />
    <FeaturedIn
      v-if="article.issue"
      class="mx-auto w-full max-w-[65ch] border-t border-default pt-12"
      :issue="article.issue"
    />
  </article>
</template>

<script setup lang="ts">
const route = useRoute()
const { find } = useStrapi()

const article = await useStrapiData(
  `article-${route.params.slug}`,
  async () => {
    const { data } = await find<DesignArticle>('design-articles', {
      filters: { slug: { $eq: route.params.slug as string } },
      // @ts-expect-error: type expects only required fields, but there can be no issue
      populate: {
        cover: { fields: ['url'] },
        issue: { populate: ['cover', 'pdf'] },
      },
    })
    const article = data[0]
    if (!article) {
      throw createError({ status: 404, statusText: 'Article not found' })
    }
    return { data: article }
  },
  { watch: [() => route.params.slug] },
)

useSeoMeta({ title: () => article.value?.title })
</script>
