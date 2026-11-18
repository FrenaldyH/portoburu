import { album } from '../photos'
import type { Experience } from '../types'

// Student associations (himpunan) and other organizations. Ongoing roles first.
// Source: LinkedIn (Experience, Volunteer Experience), Nov 2026.
export const organizations: Experience[] = [
  {
    role: 'Staff, Research & Technology',
    org: 'Himpunan Mahasiswa Teknik Computer-Informatika (HMTC) ITS',
    period: 'Mar 2026 – Present',
    // Bluecamp was an HMTC event, so it lives here instead of in committees.ts.
    highlights: ['Chaired Bluecamp, a scientific workshop for 85 participants and 13 speakers.'],
    photos: album('organization/hmtc', 'HMTC members group photo'),
  },
  {
    // Ongoing role, so listed as an organization. Move to committees.ts if 3C is a one-off event.
    role: 'Expert Staff, Event Division (3C KMK)',
    org: 'KMK ITS St. Ignatius Loyola',
    period: 'Feb 2026 – Jun 2026',
    // highlights: ['TODO (optional): what events you ran and for how many people'],
  },
]
