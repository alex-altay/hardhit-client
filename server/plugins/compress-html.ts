import { gzipSync } from 'node:zlib'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response, { event }) => {
    if (typeof response.body !== 'string' || event.path.startsWith('/__nuxt_error')) {
      return
    }
    if (!/\bgzip\b/.test(getRequestHeader(event, 'accept-encoding') ?? '')) {
      return
    }
    response.body = gzipSync(response.body)
    response.headers = {
      ...response.headers,
      'content-encoding': 'gzip',
      vary: 'Accept-Encoding',
    }
  })
})
