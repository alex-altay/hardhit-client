<template>
  <article class="flex flex-col">
    <UiBackLink to="/design" />
    <header class="mx-auto mb-16 flex max-w-3xl flex-col items-center text-center">
      <h1 v-animate class="mb-8 text-balance">{{ article.title }}</h1>
      <p class="lead">{{ article.summary }}</p>
      <div v-if="article.text" class="mt-10 h-1 w-16 bg-brand-primary" aria-hidden="true" />
    </header>
    <RichMarkdown
      v-if="article.text"
      class="article-body mx-auto mb-14 w-full max-w-4xl"
      :value="article.text"
    />
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
</script>

<style scoped>
.lead {
  font-size: 1.5rem;
  line-height: 1.6;
  text-wrap: pretty;
  color: var(--ui-text-muted);
}

.article-body :deep(:is(p, h2, h3, h4, ul, ol, blockquote, pre)) {
  max-width: 65ch;
  margin-inline: auto;
}

.article-body :deep(p) {
  margin-block: 0 1.5rem;
  line-height: 1.7;
}

.article-body :deep(p:has(> img)) {
  max-width: none;
  margin-block: 3rem;
}

.article-body > :deep(:first-child) {
  margin-top: 0;
}

.article-body > :deep(:last-child) {
  margin-bottom: 0;
}

.article-body :deep(img) {
  margin-bottom: 0;
}

.article-body :deep(:is(h2, h3, h4)) {
  margin-block: 3rem 1rem;
}

.article-body :deep(blockquote) {
  margin-block: 2.5rem;
  border-left: 4px solid var(--color-brand-primary);
  padding-left: 1.5rem;
  font-size: 1.5rem;
}
</style>
