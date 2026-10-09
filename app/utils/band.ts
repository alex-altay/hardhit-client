function getBandMedia(band: Band): BandMedia {
  return {
    hasPhotos: band.photos_collections.length > 0,
    hasInterview: band.interview_links.length > 0,
    hasVideo: band.live_links.length > 0,
  }
}

function hasAnyMedia(media: BandMedia): boolean {
  return media.hasPhotos || media.hasInterview || media.hasVideo
}

export { getBandMedia, hasAnyMedia }
