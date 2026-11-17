export default defineEventHandler((event) => {
  if (!isSiteHost(event)) {
    setResponseHeader(event, 'x-robots-tag', 'noindex, nofollow')
  }
})
