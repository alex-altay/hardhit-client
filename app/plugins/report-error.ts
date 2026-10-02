export default defineNuxtPlugin((nuxtApp) => {
  const reported = new WeakSet<object>()

  function report(error: unknown) {
    if (
      isNuxtError(error) &&
      (error.status === NOT_FOUND_STATUS || error.status === NETWORK_ERROR_STATUS)
    ) {
      return
    }

    if (error && typeof error === 'object') {
      if (reported.has(error)) {
        return
      }
      reported.add(error)
    }

    console.error(error)
  }
  nuxtApp.hook('vue:error', report)
  nuxtApp.hook('app:error', report)
})
