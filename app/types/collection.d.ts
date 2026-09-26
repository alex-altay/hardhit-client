type PhotosCollection = {
  id: number
  title: string
  date?: string
  photos: StrapiMedia[]
}

type LiveVideo = {
  id: number
  title: string
  date?: string
  video: StrapiMedia
}

type Story = {
  title: string
  cover: StrapiMedia
  text?: string
  issue: IssueRef
  bands: Pick<Band, 'id' | 'name' | 'slug'>[]
}

type Issue = {
  title: string
  date?: string
  cover: StrapiMedia
  pdf: StrapiMedia
  description?: string
  volume: number
  stories: Pick<Story, 'title' | 'cover' | 'text'>[]
}
type IssueRef = Pick<Issue, 'title' | 'volume' | 'date' | 'cover' | 'pdf' | 'description'>

type Band = {
  id: number
  name: string
  slug: string
  stories: Story[]
  photos_collections: PhotosCollection[]
  live_videos: LiveVideo[]
}
