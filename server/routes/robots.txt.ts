export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return isSiteHost(event) ? 'User-agent: *\nDisallow:\n' : 'User-agent: *\nDisallow: /\n'
})
