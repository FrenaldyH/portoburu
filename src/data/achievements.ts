import type { Experience } from '../types'

// Competitions, awards, and scholarships. Newest first.
// Reuses the Experience shape: role = what you achieved, org = who ran it, period = when.
export const achievements: Experience[] = [
  {
    role: 'Regional Contestant, ICPC Asia Jakarta 2026',
    org: 'International Collegiate Programming Contest (ICPC)',
    period: '2026',
    description:
      'Qualified for the ICPC Asia Jakarta Regional by placing 30th with team DFS in the 2026 Indonesia National Contest.',
    // Three seasons in a row, from the ICPC ID record linked below.
    highlights: [
      '2026 Indonesia National Contest: 30th place (team DFS)',
      '2025 Indonesia National Contest: 53rd place (team Bingung)',
      '2024 Indonesia National Contest: 57th place (team FSD)',
    ],
    link: 'https://icpc.global/ICPCID/H2I2ANG1YSVS',
    // When the photos arrive: put them in src/assets/photos/achievements/icpc_jakarta_2026/
    // (1.jpeg, 2.jpeg, ...), run `pnpm photos`, then uncomment the line below.
    // photos: album('achievements/icpc_jakarta_2026', 'ICPC Asia Jakarta Regional 2026'),
  },
  {
    // Source: LinkedIn, Honors & Awards.
    role: 'Asrama Mahasiswa Nusantara Undergraduate Scholarship',
    org: 'Beasiswa Pendidikan Indonesia (BPI)',
    period: '2024',
  },
]
