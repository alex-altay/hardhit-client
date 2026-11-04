type PhotosCollection = {
  id: number
  title: string
  date?: string
  photos: StrapiMedia[]
}

type Story = {
  title: string
  cover: StrapiMedia
  text?: Markdown
  issue: IssueRef
  bands: Pick<Band, 'id' | 'name' | 'slug'>[]
}

type Issue = {
  title: string
  date?: string
  cover: StrapiMedia
  pdf: StrapiMedia
  description?: Markdown
  volume: number
  stories: Pick<Story, 'title' | 'cover' | 'text'>[]
}
type IssueRef = Pick<Issue, 'title' | 'volume' | 'date' | 'cover' | 'pdf' | 'description'>

type VideoLink = {
  id: string
  url: string
  title?: string
}

type Band = {
  id: number
  name: string
  slug: string
  description: string
  stories: Story[]
  photos_collections: PhotosCollection[]
  live_links: VideoLink[]
  interview_links: VideoLink[]
}

type BandMedia = {
  hasPhotos: boolean
  hasInterview: boolean
  hasVideo: boolean
}

type BandIndexEntry = {
  name: string
  slug: string
  media: BandMedia
}

type DesignArticle = {
  title: string
  slug: string
  summary: string
  cover: StrapiMedia
  issue?: IssueRef
  text?: Markdown
  isVerticalFeatured?: boolean | null
  isHorizontalFeatured?: boolean | null
}
