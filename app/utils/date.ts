/**
 * Transforms strapi date string (2024-01-03) to string with dots and reverse order (01.03.2024)
 * @param date: string
 */
export function transformDateString(date: string): string {
  const [year, day, month] = date.split('-')
  return [day, month, year].join('.')
}
