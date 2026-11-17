import type { H3Event } from 'h3'

export function isSiteHost(event: H3Event): boolean {
  const { siteUrl } = useRuntimeConfig(event).public
  return getRequestHost(event, { xForwardedHost: true }) === new URL(siteUrl).host
}
