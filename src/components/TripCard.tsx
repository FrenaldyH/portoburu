import { useState } from 'react'
import type { Trip } from '../types'
import { Lightbox } from './Gallery'

// One hike or trip, laid out like an album card: cover photo (opens the viewer),
// then place, height, location, and date.
export function TripCard({ trip }: { trip: Trip }) {
  const [open, setOpen] = useState<number | null>(null)
  const cover = trip.photos[0]
  const details = [trip.elevation && `${trip.elevation.toLocaleString('en-US')} mdpl`, trip.location]
    .filter(Boolean)
    .join(' · ')

  return (
    <li className="rounded-lg p-2 transition-colors hover:bg-surface motion-reduce:transition-none">
      {cover && (
        <button
          type="button"
          onClick={() => setOpen(0)}
          className="relative block aspect-[4/5] w-full overflow-hidden rounded-md bg-surface"
        >
          <img src={cover.src} alt={cover.alt} loading="lazy" decoding="async" className="size-full object-cover" />
          {trip.photos.length > 1 && (
            <span className="absolute right-2 bottom-2 rounded bg-black/75 px-1.5 py-0.5 font-mono text-[10px] text-fg">
              {trip.photos.length} photos
            </span>
          )}
        </button>
      )}
      <h4 className="mt-3 text-sm font-medium text-fg">{trip.place}</h4>
      <p className="mt-1 font-mono text-xs text-subtle">{details}</p>
      <p className="font-mono text-xs text-subtle">{trip.date}</p>
      {trip.note && <p className="mt-2 text-sm text-muted">{trip.note}</p>}
      <Lightbox photos={trip.photos} index={open} onChange={setOpen} />
    </li>
  )
}
