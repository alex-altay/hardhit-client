import type { RouteLocationNormalized } from 'vue-router'

function labelFromSlug(route: RouteLocationNormalized) {
  return String(route.params.slug).replaceAll('-', ' ')
}

const DEFAULT_LABEL = 'Hard Hit'
const LABELS: Record<string, string | typeof labelFromSlug> = {
  index: DEFAULT_LABEL,
  backstage: 'Backstage',
  bands: 'Captured Live',
  design: 'Designed for Metal',
  about: 'About Me',
  'bands-slug': labelFromSlug,
  'design-slug': labelFromSlug,
  'privacy-policy': 'Privacy Policy',
  'terms-of-use': 'Terms of Use',
}

export function routeToLabel(route: RouteLocationNormalized): string {
  const label = LABELS[String(route.name)] ?? DEFAULT_LABEL
  return typeof label === 'function' ? label(route) : label
}
