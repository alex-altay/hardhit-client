type Youtube = {
  description: string
  subscribersCount: number
  videosCount: number
  link: string
  banner: StrapiMedia
  logo: StrapiMedia
}

type Instagram = {
  logo: StrapiMedia
  description: string
  link: string
  followersCount: number
  followingCount: number
  photosCount: number
  photos: StrapiMedia[]
}

type About = {
  id: string
  title: string
  description: string
  fotos: StrapiMedia[]
}
