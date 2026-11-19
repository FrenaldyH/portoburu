/**
 * Teaching data (Teaching & Lab)
 *
 * Teaching, tutoring, and academic lab roles, ongoing or most recent first.
 * Optional per entry: description, highlights (e.g. "Led weekly labs for 40 students"), link,
 * photos (album folders under src/assets/photos).
 *
 * Notes
 *   - Laboratory Administrator highlights come from your message (Nov 2026). Add numbers when known
 *     (team size, Timor-Leste training topic and participants). The OSN instructor role also came
 *     through the lab. Photos of these activities go in assets/photos/admin_lab_algoritma_dan_pemrograman.
 *   - The OSN organizer was read from the event banner (East Java province logos); confirm the
 *     exact organizing agency if needed.
 *
 * Source: LinkedIn (Experience, Volunteer Experience, OSN post of Sep 2026).
 */
import { album } from '../photos'
import type { Experience } from '../types'

export const teaching: Experience[] = [
  {
    role: 'Laboratory Administrator',
    org: 'Algorithms and Programming Laboratory, ITS',
    period: 'May 2026 – Present',
    highlights: [
      'Coordinated the teaching assistants for Programming Fundamentals class E in 2026',
      'Prepared a training program for a university in Timor-Leste',
      'Carried out community service activities with the laboratory',
    ],
    photos: album('admin_lab_algoritma_dan_pemrograman', 'Session at the Algorithms and Programming Laboratory'),
  },
  {
    role: 'Teaching Assistant, Data Structures and Algorithms',
    org: 'Institut Teknologi Sepuluh Nopember (ITS)',
    period: 'Jan 2026 – Present',
    photos: album('asdos/struktur_data_2025', 'Data Structures teaching assistants group photo'),
  },
  {
    role: 'Instructor, OSN Informatics Training (High School)',
    org: 'OSN Training Center, East Java Province',
    period: 'Sep 2026',
    highlights: [
      'One of four instructors in a 4-day training for students preparing for the OSN 2026 national final',
      'Taught algorithms, problem solving, and competitive programming',
    ],
    photos: album('tutor_osn', 'OSN Training Center group photo, East Java 2026'),
  },
  {
    role: 'Teaching Assistant, Programming Fundamentals',
    org: 'Institut Teknologi Sepuluh Nopember (ITS)',
    period: 'Aug 2025 – Dec 2025',
    photos: album('asdos/dasar_pemrograman_2025', 'Programming Fundamentals teaching assistants group photo'),
  },
  {
    role: 'Tutor, Programming Fundamentals',
    org: 'Jago Teknik',
    period: 'Sep 2025 – Dec 2025',
  },
]
