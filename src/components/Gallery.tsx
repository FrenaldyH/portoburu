import { useEffect, useRef, useState } from 'react'
import type { Image } from '../types'

type LightboxProps = {
  photos: Image[]
  index: number | null // which photo is open, or null when the viewer is closed
  onChange: (index: number | null) => void
}

// Full-size photo viewer built on the native <dialog> element: the browser provides
// the backdrop, focus trapping, and closing with Esc. Arrow keys switch photos.
export function Lightbox({ photos, index, onChange }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)

  // Open or close the dialog whenever `index` changes.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
    if (index === null && dialog.open) dialog.close()
  }, [index])

  // Show the previous (-1) or next (+1) photo, wrapping around at both ends.
  function step(delta: number) {
    if (index !== null) onChange((index + delta + photos.length) % photos.length)
  }

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      onClose={() => onChange(null)}
      onClick={(event) => {
        // A click on the dark backdrop lands on the <dialog> itself, not on the photo.
        if (event.target === event.currentTarget) event.currentTarget.close()
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') step(-1)
        if (event.key === 'ArrowRight') step(1)
      }}
      className="m-auto max-h-none max-w-none bg-transparent p-0 text-fg backdrop:bg-black/90"
    >
      {index !== null && (
        <figure className="flex flex-col items-center gap-4">
          <img
            src={photos[index].src}
            alt={photos[index].alt}
            className="max-h-[80vh] max-w-[92vw] rounded-md object-contain"
          />
          <figcaption className="flex items-center gap-6 font-mono text-xs text-muted">
            {photos.length > 1 && (
              <button type="button" onClick={() => step(-1)} className="hover:text-fg">
                ← Prev
              </button>
            )}
            <span className="tabular-nums">
              {index + 1} / {photos.length}
            </span>
            {photos.length > 1 && (
              <button type="button" onClick={() => step(1)} className="hover:text-fg">
                Next →
              </button>
            )}
            <button type="button" onClick={() => ref.current?.close()} className="hover:text-fg">
              Close
            </button>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}

// Resting and hover positions of the 1st and 2nd photo behind the front one:
// each sits a little higher, narrower, and darker, so the deck reads as "more photos here".
const layerStyles = [
  '-translate-y-2.5 scale-x-[0.92] brightness-50 group-hover:-translate-y-4',
  '-translate-y-5 scale-x-[0.84] brightness-[0.3] group-hover:-translate-y-7',
]

type PhotoStackProps = {
  photos: Image[]
  frame: string // Tailwind classes for the front photo's size and shape, e.g. "aspect-[4/5] w-full"
}

// Photos shown as a small deck: the current photo in front, up to two more peeking out behind.
// Hover spreads the deck; clicking the photo brings the next one to the front;
// the corner button opens the full-size viewer at the photo currently shown.
export function PhotoStack({ photos, frame }: PhotoStackProps) {
  const [current, setCurrent] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  if (photos.length === 0) return null

  const count = photos.length
  const photo = photos[current]
  // Depths to draw behind the front photo, farthest first so nearer ones paint on top.
  const depths = [2, 1].filter((depth) => depth < count)
  const frontImage = (
    <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="size-full object-cover" />
  )
  const frontStyle = 'relative block size-full overflow-hidden rounded-md border border-border bg-surface'

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
            {frontImage}
          </button>
        ) : (
          <div className={frontStyle}>{frontImage}</div>
        )}

        <button
          type="button"
          onClick={() => setOpen(current)}
          aria-label="View photo full size"
          className="absolute right-2 bottom-2 rounded bg-black/70 p-1.5 text-fg hover:bg-black"
        >
          {/* "Expand" icon: two arrows pointing to opposite corners. */}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3.5">
            <path d="M10 2h4v4M6 14H2v-4M14 2 9 7M2 14l5-5" />
          </svg>
        </button>
      </div>

      {/* Position dots: one per photo, the current one filled. */}
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
