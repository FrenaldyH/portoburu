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

type GalleryProps = {
  photos: Image[]
  max?: number // how many thumbnails to show before collapsing the rest into "+N"
}

// A row of small thumbnails plus a "+N" tile for the rest. Any tile opens the Lightbox there.
// ponytail: thumbnails load the full photo (<=1600px, ~150 KB, lazy-loaded);
// generate real thumbnails in `pnpm photos` if total page weight ever becomes a problem.
export function Gallery({ photos, max = 3 }: GalleryProps) {
  const [open, setOpen] = useState<number | null>(null)
  const shown = photos.slice(0, max)
  const hidden = photos.length - shown.length

  return (
    <>
      <ul className="mt-3 flex gap-2">
        {shown.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block size-14 overflow-hidden rounded-md border border-border"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                className="size-full object-cover opacity-80 transition-opacity hover:opacity-100 motion-reduce:transition-none"
              />
            </button>
          </li>
        ))}
        {hidden > 0 && (
          <li>
            <button
              type="button"
              onClick={() => setOpen(max)}
              aria-label={`Show ${hidden} more photos`}
              className="flex size-14 items-center justify-center rounded-md border border-border font-mono text-xs text-muted hover:text-fg"
            >
              +{hidden}
            </button>
          </li>
        )}
      </ul>
      <Lightbox photos={photos} index={open} onChange={setOpen} />
    </>
  )
}
