const compactNumber = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })

/**
 * Formats a counter with a word that agrees with it: 1 follower, 149 followers, 1.2K followers
 * @param count: number
 * @param singular: word for count === 1
 * @param plural: word for other counts, defaults to singular + "s"
 */
export function formatCount(count: number, singular: string, plural = `${singular}s`): string {
  return `${compactNumber.format(count)}\u00A0${count === 1 ? singular : plural}`
}
