/**
 * TripCard
 *
 * One hike or trip, laid out like an album card: a photo deck, then the place, the height in
 * mdpl (hikes only) with the location, and the date. The card gets a subtle background on hover.
 *
 * Exports: TripCard({ trip })
 * Uses: PhotoStack
 */
import type { Trip } from '../types'
import { PhotoStack } from './PhotoStack'

export function TripCard({ trip }: { trip: Trip }) {
  const details = [trip.elevation && `${trip.elevation.toLocaleString('en-US')} mdpl`, trip.location]
    .filter(Boolean)
    .join(' · ')

  return (
    <li className="rounded-lg p-2 transition-colors hover:bg-surface motion-reduce:transition-none">
      <PhotoStack photos={trip.photos} frame="aspect-[4/5] w-full" />
      <h4 className="mt-3 text-sm font-medium text-fg">{trip.place}</h4>
      <p className="mt-1 font-mono text-xs text-subtle">{details}</p>
      <p className="font-mono text-xs text-subtle">{trip.date}</p>
      {trip.note && <p className="mt-2 text-sm text-muted">{trip.note}</p>}
    </li>
  )
}
