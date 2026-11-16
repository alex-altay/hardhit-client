import type { Strapi5ResponseMany } from '@nuxtjs/strapi'

const MAX_PAGE_SIZE = 100

type PageRequest<T> = (pagination: {
  page: number
  pageSize: number
}) => Promise<Strapi5ResponseMany<T>>

export async function findAllPages<T>(
  request: PageRequest<T>,
): Promise<{ data: Strapi5ResponseMany<T>['data'] }> {
  const first = await request({ page: 1, pageSize: MAX_PAGE_SIZE })
  const pagination = first.meta.pagination
  const pageCount = pagination && 'pageCount' in pagination ? pagination.pageCount : 1
  const rest = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) =>
      request({ page: index + 2, pageSize: MAX_PAGE_SIZE }),
    ),
  )
  return { data: [first, ...rest].flatMap((response) => response.data) }
}
