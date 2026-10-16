import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-animate: the element slides in when it enters the viewport
 * v-animate.delayed does the same with a short delay, for an element following another one
 */
type AnimateDirective = Directive<HTMLElement, undefined, 'delayed'>

declare module 'vue' {
  interface GlobalDirectives {
    vAnimate: AnimateDirective
  }
}

let observer: IntersectionObserver | undefined
const THRESHOLD = 0.2 // shown when 20% is visible

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.intersectionRatio >= THRESHOLD) {
          entry.target.setAttribute('data-in-viewport', '')
        } else if (!entry.isIntersecting) {
          entry.target.removeAttribute('data-in-viewport')
        }
      }
    },
    { threshold: [0, THRESHOLD] },
  )
  return observer
}

// Rendered on the server too, otherwise the element is visible in the server HTML and gets hidden on mount
function animateAttrs({ modifiers }: DirectiveBinding<undefined, 'delayed'>) {
  return { 'data-animate': modifiers.delayed ? 'delayed' : '' }
}

const animate: AnimateDirective = {
  getSSRProps: animateAttrs,
  mounted(el, binding) {
    el.setAttribute('data-animate', animateAttrs(binding)['data-animate'])
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate', animate)
})
