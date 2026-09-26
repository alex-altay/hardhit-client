<template>
  <Markdown v-if="value" :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import breaks from '@comark/nuxt/plugins/breaks'
import security from '@comark/nuxt/plugins/security'

defineProps<{ value?: string | null }>()

const plugins = [
  breaks(),
  security({
    allowedTags: [
      'p',
      'br',
      'hr',
      'h2',
      'h3',
      'h4',
      'strong',
      'em',
      'del',
      'a',
      'ul',
      'ol',
      'li',
      'blockquote',
      'code',
      'pre',
      'img',
    ],
    allowedProtocols: ['https', 'mailto'],
    allowDataImages: false,
  }),
]
</script>
