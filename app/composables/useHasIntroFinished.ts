/**
 * Whether the main page intro has finished:
 * the header is hidden on the main page until then,
 * and the intro is not played again after it
 */
export function useHasIntroFinished() {
  return useState('has-intro-finished', () => false)
}
