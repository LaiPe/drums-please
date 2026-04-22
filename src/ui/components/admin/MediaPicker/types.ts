export type MediaType = 'image' | 'video'
export type Tab = 'library' | 'upload'

export const BUCKETS: Record<MediaType, string> = {
  image: 'images',
  video: 'videos',
}

export const ACCEPT: Record<MediaType, string> = {
  image: 'image/*',
  video: 'video/*',
}

export const MAX_SIZE_MB = 10
export const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024
