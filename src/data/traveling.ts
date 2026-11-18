/**
 * Traveling data
 *
 * Places you traveled to, newest first. Same shape as hiking (Trip) without elevation.
 *
 * Add a trip: create src/assets/photos/traveling/<folder>/ with 1.jpeg, 2.jpeg, ..., run
 * `pnpm photos`, then add an entry with `photos: album('traveling/<folder>', '<short description>')`.
 *
 * Notes
 *   - The photo folder is named air_terjun_coban_talu, but the official name is Coban Talun
 *     (Tulungrejo, Bumiaji, Batu, on the slopes of Mount Arjuno).
 */
import { album } from '../photos'
import type { Trip } from '../types'

export const traveling: Trip[] = [
  {
    place: 'Coban Talun Waterfall',
    location: 'Batu, East Java',
    date: 'Jul 2026',
    photos: album('traveling/air_terjun_coban_talu', 'Coban Talun waterfall and pine forest'),
  },
  {
    place: 'Thousand Islands',
    location: 'Jakarta',
    date: 'Jul 2026',
    photos: album('traveling/pulau_seribu', 'Swimming and snorkeling at the Thousand Islands'),
  },
  {
    place: 'Coro Beach',
    location: 'Tulungagung, East Java',
    date: 'Jun 2026',
    photos: album('traveling/tulung_agung', 'Coastal hills and the shore of Coro Beach, Tulungagung'),
  },
  {
    place: 'Batu Bengkung Beach',
    location: 'Malang, East Java',
    date: 'Feb 2026',
    photos: album('traveling/pantai_malang', 'Rock cliffs and tidal pools at Batu Bengkung Beach, Malang'),
  },
]
