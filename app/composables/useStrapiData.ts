import type { AsyncDataOptions } from '#app'
import type { ComputedRef } from 'vue'

/**
 * Timeout for requests to strapi, without it requests can hang on for minutes
 */
const STRAPI_TIMEOUT_MS = 10_000

export async function useStrapiData<T>(
  key: string,
  request: () => Promise<{ data: T }>,
  options?: Pick<AsyncDataOptions<T>, 'watch'>,
): Promise<ComputedRef<T>> {
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
    options,
  )

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
