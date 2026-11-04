<template>
  <div>
    <UContainer class="py-12">
      <ArticleHeader :title="secretArticle.title" :lead="secretArticle.lead" :has-divider="true" />
      <RichMarkdown :value="secretArticle.text" />
    </UContainer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ robots: 'noindex, nofollow' })

const { findOne } = useStrapi()

const secretArticle = await useStrapiData('secret-article', () =>
  findOne<SecretArticle>('secret-article', '', {
    populate: '*',
  }),
)
</script>
