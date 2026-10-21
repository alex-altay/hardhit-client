<template>
  <Markdown v-if="value" :value="value" :plugins="plugins" />
</template>

<script setup lang="ts">
import breaks from '@comark/nuxt/plugins/breaks'
import security from '@comark/nuxt/plugins/security'

defineProps<{ value?: string | null }>()

/**
 * Images uploaded through the strapi editor link to strapi itself, which runs on http locally.
 * Its protocol is allowed too, otherwise the security plugin strips src and only alt is left
 */
const { strapiOrigin } = useRuntimeConfig().public
const allowedProtocols = [
  ...new Set(
    ['https', 'mailto', getProtocol(strapiOrigin)].filter((protocol) => protocol !== undefined),
  ),
]

function getProtocol(link: string): string | undefined {
  try {
    return new URL(link).protocol.replace(':', '')
  } catch {
    return undefined
  }
}

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
    allowedProtocols,
    allowDataImages: false,
  }),
]
</script>
