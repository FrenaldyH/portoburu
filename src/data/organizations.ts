/**
 * Organizations data
 *
 * Student associations (himpunan) and other organizations, ongoing roles first.
 * Optional per entry: description, highlights (concrete results, ideally with numbers), link, photos.
 *
 * Notes
 *   - Bluecamp (event chair, Mar – Jul 2026) was an HMTC event, so it is a highlight of the HMTC
 *     entry instead of a separate committee entry.
 *   - 3C KMK is listed here as a longer-running role; move it to committees.ts if 3C was a
 *     one-off event.
 *
 * Source: LinkedIn (Experience, Volunteer Experience).
 */
import { album } from '../photos'
import type { Experience } from '../types'

export const organizations: Experience[] = [
  {
    role: 'Staff, Research & Technology',
    org: 'Himpunan Mahasiswa Teknik Computer-Informatika (HMTC) ITS',
    period: 'Mar 2026 – Present',
    highlights: ['Chaired Bluecamp, a scientific workshop for 85 participants and 13 speakers.'],
    photos: album('organization/hmtc', 'HMTC members group photo'),
  },
  {
    role: 'Expert Staff, Event Division (3C KMK)',
    org: 'KMK ITS St. Ignatius Loyola',
    period: 'Feb 2026 – Jun 2026',
  },
]
