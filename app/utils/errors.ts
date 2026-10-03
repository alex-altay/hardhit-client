import type { NuxtError } from '#app'

export function toAppError(err: unknown): NuxtError {
  // Already found error from fetch function
  if (
    isNuxtError(err) &&
    (err.status === NOT_FOUND_STATUS || err.status === NETWORK_ERROR_STATUS)
  ) {
    return createError({
      status: err.status,
      statusText: err.statusText,
      fatal: true,
    })
  }

  // 404 Not Found
  const strapiError = (err as StrapiErrorBody | undefined)?.error
  if (strapiError?.status === NOT_FOUND_STATUS) {
    return createError({
      status: NOT_FOUND_STATUS,
      statusText: 'Page not found',
      fatal: true,
    })
  }

  // Network error
  if (strapiError?.details?.name === 'FetchError' && !strapiError.details.response) {
    return createError({
      status: NETWORK_ERROR_STATUS,
      statusText: 'Connection problem',
      fatal: true,
    })
  }

  // Unexpected
  return createError({
    status: 500,
    statusText: 'Unexpected error',
    fatal: true,
    cause: err,
  })
}
