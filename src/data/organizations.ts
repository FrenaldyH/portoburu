import type { Experience } from '../types'

// Student associations (himpunan) and other organizations. Ongoing roles first.
// Source: LinkedIn (Experience, Volunteer Experience), Nov 2026.
export const organizations: Experience[] = [
  {
    role: 'Staff, Research & Technology',
    org: 'Himpunan Mahasiswa Teknik Computer-Informatika (HMTC) ITS',
    period: 'Mar 2026 – Present',
    // highlights: ['TODO (optional): a concrete result, e.g. "Ran 4 workshops for 120+ students"'],
  },
  {
    // Ongoing role, so listed as an organization. Move to committees.ts if 3C is a one-off event.
    role: 'Expert Staff, Event Division (3C KMK)',
    org: 'KMK ITS St. Ignatius Loyola',
    period: 'Feb 2026 – Jun 2026',
    // highlights: ['TODO (optional): what events you ran and for how many people'],
  },
]
