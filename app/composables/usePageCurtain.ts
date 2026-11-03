import type { RouteLocationNormalized } from 'vue-router'

type PageCurtain = {
  coverPreviousPage: (to: RouteLocationNormalized) => Promise<unknown>
  revealNextPage: () => unknown
}

export function usePageCurtain({ coverPreviousPage, revealNextPage }: PageCurtain) {
  const router = useRouter()
  const nuxtApp = useNuxtApp()
  const removeHooks: (() => void)[] = []

  let coverAnimation: Promise<unknown> | undefined

  function revealIfCovered() {
    if (coverAnimation) {
      coverAnimation = undefined
      requestAnimationFrame(() => revealNextPage())
    }
  }

  onMounted(() => {
    removeHooks.push(
      router.beforeEach(async (to, from) => {
        const isFirstLoad = !from.matched.length
        if (isFirstLoad || to.path === from.path || isPreferredReducedMotion()) {
          return
        }
        if (!coverAnimation) {
          coverAnimation = coverPreviousPage(to)
        }
        await coverAnimation
        window.scrollTo({ top: 0, behavior: 'instant' })
      }),
      router.afterEach((_to, _from, failure) => {
        if (failure) {
          revealIfCovered()
        }
      }),
      nuxtApp.hook('page:finish', revealIfCovered),
    )
  })

  onBeforeUnmount(() => removeHooks.forEach((remove) => remove()))
}
