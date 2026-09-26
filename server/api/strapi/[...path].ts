export default defineEventHandler((event) => {
  assertMethod(event, 'GET')
  const config = useRuntimeConfig(event)
  const path = decodeURIComponent(getRouterParam(event, 'path') ?? '')

  if (path.split('/').includes('..')) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
  }

  const { search } = getRequestURL(event)

  return proxyRequest(event, `${config.public.strapiOrigin}/api/${path}${search}`, {
    headers: { Authorization: `Bearer ${config.apiSecret}` },
  })
})
