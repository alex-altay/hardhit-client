type StrapiMedia = { id: number; url: string; name: string; alternativeText?: string | null }

type StrapiErrorBody = {
  error?: {
    status?: number
    details?: {
      name?: string
      response?: unknown
    }
  }
}

type PhotoWithDescription = {
  description: string
  photo: StrapiMedia
}
