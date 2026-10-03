/**
 * Transforms strapi date string (2024-01-15) to string with dots and reverse order (15.01.2024)
 * @param date: string
 */
export function transformDateString(date: string): string {
  const [year, month, day] = date.split('-')
  return [day, month, year].join('.')
}
