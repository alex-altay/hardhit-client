import type { NuxtApp } from '#app'
import type { ComputedRef } from 'vue'

/**
 * Timeout for requests to strapi, without it requests can hang on for minutes
 */
const STRAPI_TIMEOUT_MS = 10_000

type StrapiRequest<T> = () => Promise<{ data: T }>

export async function useStrapiData<T>(
  key: string,
  request: StrapiRequest<T>,
): Promise<ComputedRef<T>>
export async function useStrapiData<T>(
  key: string,
  request: StrapiRequest<T>,
  options: { optional: true },
): Promise<ComputedRef<T | undefined>>
export async function useStrapiData<T>(
  key: string,
  request: StrapiRequest<T>,
  { optional = false }: { optional?: boolean } = {},
): Promise<ComputedRef<T | undefined>> {
  const { data, error } = await useAsyncData(
    key,
    async () => {
      try {
        const response = await withTimeout(request())
        return response.data
      } catch (err) {
        throw toAppError(err)
      }
    },
    { getCachedData: getSessionCachedData },
  )

  if (optional) {
    if (error.value) {
      reportHiddenBlock(key, error.value)
    }
    watch(error, (e) => {
      if (e) {
        reportHiddenBlock(key, e)
      }
    })
    return computed(() => (error.value ? undefined : (data.value as T | undefined)))
  }

  if (error.value) {
    throw toAppError(error.value)
  }

  watch(error, (e) => {
    if (e) {
      showError(toAppError(e))
    }
  })

  return computed(() => {
    if (data.value === undefined) {
      throw toAppError(new Error(`useStrapiData: no data for "${key}"`))
    }
    return data.value as T
  })
}

function reportHiddenBlock(key: string, err: unknown) {
  console.error(`useStrapiData: "${key}" failed, the block is hidden`, err)
}

/**
 * Keeps strapi data: by default nuxt reuses payload only during hydration
 * and deletes it when the page unmounts
 */
function getSessionCachedData<T>(
  key: string,
  nuxtApp: NuxtApp,
  ctx: { cause: string },
): T | undefined {
  return ctx.cause === 'initial'
    ? (nuxtApp.payload.data[key] ?? nuxtApp.static.data[key])
    : undefined
}

function withTimeout<R>(promise: Promise<R>): Promise<R> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () =>
        reject(createError({ status: HttpStatus.NetworkError, statusText: 'Connection problem' })),
      STRAPI_TIMEOUT_MS,
    )
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}
