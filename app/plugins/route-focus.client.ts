export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter()
  let hasPathChanged = false

  router.afterEach((to, from, failure) => {
    hasPathChanged = !failure && from.matched.length > 0 && to.path !== from.path
  })

  nuxtApp.hook('page:finish', () => {
    if (!hasPathChanged) {
      return
    }
    hasPathChanged = false
    const heading = document.querySelector<HTMLElement>('main h1')
    if (!heading) {
      return
    }
    heading.tabIndex = -1
    focusElementForScreenReader(heading)
  })
})
