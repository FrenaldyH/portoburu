/**
 * Hiking data
 *
 * Mountains you climbed, newest first. Each entry: place, elevation (mdpl, number only), location,
 * date, photos, and an optional note (route, team, or something memorable).
 *
 * Add a hike: create src/assets/photos/hiking/<folder>/ with 1.jpeg, 2.jpeg, ..., run `pnpm photos`,
 * then add an entry with `photos: album('hiking/<folder>', '<short description>')`.
 *
 * Sources
 *   Mount Penanggungan      1,653 mdpl from the summit sign (Puncak Pawitra); location from Kompas
 *                           Travel, 24 Jun 2024
 *   Puncak Sarah Klopo      southwest peak of Penanggungan; 1,235 mdpl per Kompas Travel, 24 Jun 2024
 *   Bukit Premium           the peak sign reads "PREMIUM 2235 MDPL" (Kompasiana agrees); savanna on the
 *                           western slope of Bromo, Pasuruan, per Kompas Travel, 1 Jul 2025
 */
import { album } from '../photos'
import type { Trip } from '../types'

export const hiking: Trip[] = [
  {
    place: 'Mount Penanggungan',
    elevation: 1653,
    location: 'Mojokerto, East Java',
    date: 'Nov 2026',
    photos: album('hiking/mt_penanggungan', 'Hike to the summit of Mount Penanggungan'),
  },
  {
    place: 'Puncak Sarah Klopo, Mount Penanggungan',
    elevation: 1235,
    location: 'Mojokerto, East Java',
    date: 'Jun 2026',
    photos: album('hiking/sarah_klopo', 'Hike to Puncak Sarah Klopo with cloudy green ridges'),
  },
  {
    place: 'Bukit Premium',
    elevation: 2235,
    location: 'Pasuruan, East Java',
    date: 'Apr 2026',
    photos: album('hiking/mt_premium', 'Hike across the green savanna of Bukit Premium'),
  },
]
