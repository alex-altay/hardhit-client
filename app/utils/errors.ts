import type { NuxtError } from '#app'

export const HttpStatus = {
  NotFound: 404,
  NetworkError: 503,
} as const

/**
 * Errors that shouldn't be reported
 */
export function isExpectedError(status?: number): boolean {
  return status === HttpStatus.NotFound || status === HttpStatus.NetworkError
}

export function toAppError(err: unknown): NuxtError {
  // Already found error from fetch function
  if (isNuxtError(err) && isExpectedError(err.status)) {
    return createError({
      status: err.status,
      statusText: err.statusText,
      fatal: true,
    })
  }

  // 404 Not Found
  const strapiError = (err as StrapiErrorBody | undefined)?.error
  if (strapiError?.status === HttpStatus.NotFound) {
    return createError({
      status: HttpStatus.NotFound,
      statusText: 'Page not found',
      fatal: true,
    })
  }

  // Network error
  if (strapiError?.details?.name === 'FetchError' && !strapiError.details.response) {
    return createError({
      status: HttpStatus.NetworkError,
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
