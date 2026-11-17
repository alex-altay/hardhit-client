const CACHE_SECONDS = 5 * 60

export default defineCachedEventHandler(
  async (event): Promise<unknown> => {
    assertMethod(event, 'GET')
    const config = useRuntimeConfig(event)
    const path = decodeURIComponent(getRouterParam(event, 'path') ?? '')

    if (path.split('/').includes('..')) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid path' })
    }

    const { search } = getRequestURL(event)

    const response = await fetch(`${config.public.strapiOrigin}/api/${path}${search}`, {
      headers: { Authorization: `Bearer ${config.apiSecret}` },
    }).catch((cause) => {
      throw createError({ statusCode: 502, statusMessage: 'Strapi is unavailable', cause })
    })
    setResponseStatus(event, response.status)
    return response.json()
  },
  {
    name: 'strapi',
    base: 'strapi',
    maxAge: CACHE_SECONDS,
    swr: true,
    shouldBypassCache: () => import.meta.dev,
  },
)
