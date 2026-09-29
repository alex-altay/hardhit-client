import type { Ref } from 'vue'

const easeOut = (t: number) => 1 - (1 - t) ** 3

/**
 * Горизонтальная лента: можно ли её прокрутить влево/вправо и плавное центрирование элемента.
 * Элементы ленты — прямые потомки strip, по одному на индекс.
 */
export function useStripScroll(
  strip: Readonly<Ref<HTMLElement | null>>,
  { duration }: { duration: number },
) {
  const canScrollLeft = ref(false)
  const canScrollRight = ref(false)

  // Допуск в 1px: при дробном масштабе scrollLeft не доходит ровно до края
  function updateScrollState() {
    const el = strip.value
    if (!el) {
      return
    }
    canScrollLeft.value = el.scrollLeft > 1
    canScrollRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth - 1
  }

  function centeredScrollLeft(el: HTMLElement, index: number) {
    const item = el.children[index] as HTMLElement | undefined
    if (!item) {
      return undefined
    }
    const centered = item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2
    const max = el.scrollWidth - el.clientWidth
    return Math.min(Math.max(centered, 0), max)
  }

  let scrollFrame = 0

  // Центрирует элемент, пока его ширина ещё анимируется. Нативный smooth-scroll не годится:
  // он считает цель один раз по старой ширине и упирается в текущий край. Поэтому цель
  // пересчитывается каждый кадр по живой разметке и к концу анимации совпадает с итоговой.
  function revealItem(index: number) {
    const el = strip.value
    if (!el) {
      return
    }
    cancelAnimationFrame(scrollFrame)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.scrollLeft = centeredScrollLeft(el, index) ?? el.scrollLeft
      return
    }

    const from = el.scrollLeft
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const target = centeredScrollLeft(el, index)
      if (target === undefined) {
        return
      }
      el.scrollLeft = from + (target - from) * easeOut(Math.min(elapsed / duration, 1))
      // Пара лишних кадров после конца, чтобы догнать финальную ширину
      if (elapsed < duration + 50) {
        scrollFrame = requestAnimationFrame(step)
      }
    }
    scrollFrame = requestAnimationFrame(step)
  }

  // Ширина ленты меняется и без события scroll: ресайз окна, загрузка картинок,
  // раскрытие элемента. Поэтому следим и за лентой, и за каждым элементом.
  let resizeObserver: ResizeObserver | undefined

  onMounted(() => {
    const el = strip.value
    if (!el) {
      return
    }
    el.addEventListener('scroll', updateScrollState, { passive: true })
    resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(el)
    for (const item of el.children) {
      resizeObserver.observe(item)
    }
    updateScrollState()
  })

  onBeforeUnmount(() => {
    strip.value?.removeEventListener('scroll', updateScrollState)
    resizeObserver?.disconnect()
    cancelAnimationFrame(scrollFrame)
  })

  return {
    canScrollLeft: readonly(canScrollLeft),
    canScrollRight: readonly(canScrollRight),
    revealItem,
  }
}
