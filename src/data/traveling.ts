import { album } from '../photos'
import type { Trip } from '../types'

// Places you traveled to. Add one block per trip (newest first).
// Photos: create src/assets/photos/traveling/<folder>/ with 1.jpeg, 2.jpeg, ... then run `pnpm photos`.
export const traveling: Trip[] = [
  {
    // Official name is "Coban Talun": Tulungrejo, Bumiaji, Batu, on the slopes of Mount Arjuno.
    place: 'Coban Talun Waterfall',
    location: 'Batu, East Java',
    date: 'TODO: e.g. "Aug 2025"',
    photos: album('traveling/air_terjun_coban_talu', 'Coban Talu waterfall and pine forest'),
  },
  {
    place: 'TODO: beach name',
    location: 'Malang, East Java',
    date: 'TODO: e.g. "Aug 2025"',
    photos: album('traveling/pantai_malang', 'Rocky beach on the southern coast of Malang'),
  },
  {
    place: 'Thousand Islands',
    location: 'Jakarta',
    date: 'TODO: e.g. "Aug 2025"',
    photos: album('traveling/pulau_seribu', 'Swimming and snorkeling at the Thousand Islands'),
  },
  {
    place: 'TODO: place name',
    location: 'Tulungagung, East Java',
    date: 'TODO: e.g. "Aug 2025"',
    photos: album('traveling/tulung_agung', 'Coastal hills and beach in Tulungagung'),
  },
]
