/**
 * Lightbox
 *
 * Full-size photo viewer built on the native <dialog> element: the browser provides the dark
 * backdrop, focus trapping, and closing with Esc. Left/right arrow keys and the Prev/Next buttons
 * switch photos, wrapping around at both ends. Clicking the backdrop (which lands on the <dialog>
 * itself, not on the photo) or the Close button closes it. While it is open, index.css stops the
 * page behind it from scrolling.
 *
 * Exports
 *   Lightbox({ photos, index, onChange })
 *     index     which photo is open, or null when the viewer is closed
 *     onChange  called with the new index, or null when the viewer closes
 */
import { useEffect, useRef } from 'react'
import type { Image } from '../types'

type LightboxProps = {
  photos: Image[]
  index: number | null
  onChange: (index: number | null) => void
}

export function Lightbox({ photos, index, onChange }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (index !== null && !dialog.open) dialog.showModal()
    if (index === null && dialog.open) dialog.close()
  }, [index])

  function step(delta: number) {
    if (index !== null) onChange((index + delta + photos.length) % photos.length)
  }

  return (
    <dialog
      ref={ref}
      aria-label="Photo viewer"
      onClose={() => onChange(null)}
      onClick={(event) => {
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
