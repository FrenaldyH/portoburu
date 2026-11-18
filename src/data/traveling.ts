import { album } from '../photos'
import type { Trip } from '../types'

// Places you traveled to. Add one block per trip (newest first).
// Photos: create src/assets/photos/traveling/<folder>/ with 1.jpeg, 2.jpeg, ... then run `pnpm photos`.
export const traveling: Trip[] = [
  {
    // Official name is "Coban Talun": Tulungrejo, Bumiaji, Batu, on the slopes of Mount Arjuno.
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
