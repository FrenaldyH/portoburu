import { album } from '../photos'
import type { Trip } from '../types'

// Mountains you climbed. Add one block per trip (newest first).
// Photos: create src/assets/photos/hiking/<folder>/ with 1.jpeg, 2.jpeg, ... then run `pnpm photos`.
export const hiking: Trip[] = [
  {
    place: 'Mount Penanggungan',
    elevation: 1653, // from the summit sign (Puncak Pawitra)
    location: 'Mojokerto, East Java', // Kompas Travel, 24 Jun 2024
    date: 'TODO: e.g. "Aug 2025"',
    photos: album('hiking/mt_penanggungan', 'Hike to the summit of Mount Penanggungan'),
  },
  {
    place: 'Bukit Premium', // the peak sign reads "PREMIUM 2235 MDPL"; a sign behind it reads "B. PRE…"
    elevation: 2235, // peak sign + Kompasiana "Bukit Premium 2235 MDPL"
    location: 'Pasuruan, East Java', // Kompas Travel, 1 Jul 2025: savanna on the western slope of Bromo
    date: 'TODO: e.g. "Aug 2025"',
    photos: album('hiking/mt_premium', 'Hike across the green savanna of Bukit Premium'),
  },
  {
    place: 'Puncak Sarah Klopo, Mount Penanggungan', // southwest peak of Penanggungan
    elevation: 1235, // Kompas Travel, 24 Jun 2024: "1.235 meter di atas permukaan laut"
    location: 'Mojokerto, East Java',
    date: 'TODO: e.g. "Aug 2025"',
    photos: album('hiking/sarah_klopo', 'Hike to Puncak Sarah Klopo with cloudy green ridges'),
  },
]
