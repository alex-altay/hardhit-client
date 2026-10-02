type StrapiMedia = { id: number; url: string; name: string; alternativeText?: string | null }
type StrapiResponse<T> = { data: T; meta: Record<string, unknown> }

type StrapiErrorBody = {
  error?: {
    status?: number
    details?: {
      name?: string
      response?: unknown
    }
  }
}
