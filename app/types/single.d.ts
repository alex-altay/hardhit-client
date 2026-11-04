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
  photos: StrapiMedia[]
}

type PhotosHero = {
  backgroundPhoto: StrapiMedia
  bands: PhotoWithDescription[]
}

type TopAlbum = {
  position: number
  band: string
  album: string
  description: string
  cover: StrapiMedia
}

type TopTen = {
  header: string
  description: string
  albums: TopAlbum[]
}

type SecretArticle = {
  title: string
  lead: string
  text: Markdown
}
