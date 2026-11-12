const SCREEN_READER_DELAY_MS = 100

export function focusElementForScreenReader(element: HTMLElement | null | undefined) {
  setTimeout(() => element?.focus({ preventScroll: true }), SCREEN_READER_DELAY_MS)
}
