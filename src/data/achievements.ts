/**
 * Achievements data (Competitions & Scholarships)
 *
 * Competitions, awards, and scholarships, newest first. Reuses the Experience shape:
 * role = what you achieved, org = who ran it, period = when.
 *
 * Sources
 *   ICPC  your ICPC ID record (linked in the entry): three Indonesia National Contest seasons in a row
 *   BPI   LinkedIn, Honors & Awards; photos in src/assets/photos/AMN (Asrama Mahasiswa Nusantara)
 *
 * To add ICPC photos: put them in src/assets/photos/achievements/icpc_jakarta_2026/ (1.jpeg,
 * 2.jpeg, ...), run `pnpm photos`, then add to the ICPC entry:
 *   photos: album('achievements/icpc_jakarta_2026', 'ICPC Asia Jakarta Regional 2026'),
 * After the Regional, add the final rank to `description` and one line to `highlights`.
 */
import { album } from '../photos'
import type { Experience } from '../types'

export const achievements: Experience[] = [
  {
    role: 'Regional Contestant, ICPC Asia Jakarta 2026',
    org: 'International Collegiate Programming Contest (ICPC)',
    period: '2026',
    description:
      'Qualified for the ICPC Asia Jakarta Regional by placing 30th with team DFS in the 2026 Indonesia National Contest.',
    highlights: [
      '2026 Indonesia National Contest: 30th place (team DFS)',
      '2025 Indonesia National Contest: 53rd place (team Bingung)',
      '2024 Indonesia National Contest: 57th place (team FSD)',
    ],
    link: 'https://icpc.global/ICPCID/H2I2ANG1YSVS',
  },
  {
    role: 'Asrama Mahasiswa Nusantara Undergraduate Scholarship',
    org: 'Beasiswa Pendidikan Indonesia (BPI)',
    period: '2024',
    photos: album('AMN', 'Asrama Mahasiswa Nusantara scholarship community in Surabaya'),
  },
]
