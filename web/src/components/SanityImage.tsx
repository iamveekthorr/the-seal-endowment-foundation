import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export type SanityImageValue = {
  asset?: {
    _id: string
    url: string
    metadata?: {
      lqip?: string
      dimensions?: { width: number; height: number }
    }
  }
  alt?: string
  credit?: string
  hotspot?: unknown
  crop?: unknown
} | null | undefined

/**
 * Renders a `creditedImage` field as a fill-mode next/image, sized by its
 * parent (give the parent `relative` + a height or aspect-ratio). Respects
 * hotspot cropping via urlFor and uses the queried LQIP as a blur-up
 * placeholder — see the Sanity image best-practice guide.
 */
export function SanityImage({
  image,
  sizes,
  priority,
  className,
}: {
  image: SanityImageValue
  sizes: string
  priority?: boolean
  className?: string
}) {
  if (!image?.asset) return null

  const src = urlFor(image).width(1600).fit('crop').auto('format').url()

  return (
    <Image
      src={src}
      alt={image.alt || ''}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      placeholder={image.asset.metadata?.lqip ? 'blur' : 'empty'}
      blurDataURL={image.asset.metadata?.lqip}
    />
  )
}
