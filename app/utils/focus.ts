const SCREEN_READER_DELAY_MS = 100

export function focusElementForScreenReader(element: HTMLElement | null | undefined) {
  setTimeout(() => element?.focus(), SCREEN_READER_DELAY_MS)
}
