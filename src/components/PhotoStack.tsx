/**
 * PhotoStack
 *
 * Photos shown as a small deck: the current photo in front and up to two more peeking out behind
 * it, each a little higher, narrower, and darker, so the deck reads as "more photos here".
 *   - Hover spreads the deck and zooms/brightens the front photo slightly.
 *   - Clicking the front photo brings the next one forward with a crossfade: every photo sits in
 *     the same frame and only the current one is visible, so the old one fades out while the new
 *     one fades in.
 *   - The corner button (expand icon) opens the Lightbox at the photo currently shown.
 *   - Dots under the deck show the position; they are hidden from screen readers, which hear the
 *     front photo's alt text ("... (photo 2 of 4)") instead.
 * A single photo shows no deck, no dots, and no click-to-cycle.
 *
 * Exports
 *   PhotoStack({ photos, frame })
 *     frame  Tailwind classes for the front photo's size and shape, e.g. "aspect-[4/5] w-full"
 * Uses: Lightbox
 */
import { useState } from 'react'
import type { Image } from '../types'
import { Lightbox } from './Lightbox'

const layerStyles = [
  '-translate-y-2.5 scale-x-[0.92] brightness-50 group-hover:-translate-y-4',
  '-translate-y-5 scale-x-[0.84] brightness-[0.3] group-hover:-translate-y-7',
]

const frontStyle = 'group/front relative block size-full overflow-hidden rounded-md border border-border bg-surface'

type PhotoStackProps = {
  photos: Image[]
  frame: string
}

export function PhotoStack({ photos, frame }: PhotoStackProps) {
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  if (photos.length === 0) return null

  const count = photos.length
  const photo = photos[current]
  const depths = [2, 1].filter((depth) => depth < count)

  const frontImages = photos.map((item, i) => (
    <img
      key={item.src}
      src={item.src}
      alt={i === current ? item.alt : ''}
      aria-hidden={i === current ? undefined : true}
      loading="lazy"
      decoding="async"
      className={`absolute inset-0 size-full object-cover transition duration-300 ease-out motion-reduce:transition-none ${
        i === current
          ? 'opacity-100 group-hover/front:scale-[1.03] group-hover/front:brightness-110'
          : 'scale-[0.98] opacity-0'
      }`}
    />
  ))

  return (
    <div className="group pt-7">
      <div className={`relative ${frame}`}>
        {depths.map((depth) => {
          const behind = photos[(current + depth) % count]
          return (
            <img
              key={depth}
              src={behind.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 size-full rounded-md border border-border object-cover transition-transform duration-300 motion-reduce:transition-none ${layerStyles[depth - 1]}`}
            />
          )
        })}

        {count > 1 ? (
          <button
            type="button"
            onClick={() => setCurrent((current + 1) % count)}
            aria-label={`${photo.alt}. Show next photo`}
            className={frontStyle}
          >
            {frontImages}
          </button>
        ) : (
          <div className={frontStyle}>{frontImages}</div>
        )}

        <button
          type="button"
          onClick={() => setOpen(current)}
          aria-label="View photo full size"
          className="absolute right-2 bottom-2 rounded bg-black/70 p-1.5 text-fg hover:bg-black"
        >
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5">
            <path d="M10 2h4v4M6 14H2v-4M14 2 9 7M2 14l5-5" />
          </svg>
        </button>
      </div>

      {count > 1 && (
        <ol aria-hidden="true" className="mt-2 flex gap-1">
          {photos.map((item, i) => (
            <li key={item.src} className={`size-1.5 rounded-full ${i === current ? 'bg-fg' : 'bg-subtle/50'}`} />
          ))}
        </ol>
      )}

      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </div>
  )
}
