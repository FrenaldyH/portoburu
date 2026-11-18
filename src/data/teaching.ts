import { album } from '../photos'
import type { Experience } from '../types'

// Teaching, tutoring, and academic lab roles. Ongoing / most recent first.
// Source: LinkedIn (Experience, Volunteer Experience, OSN post of Sep 2026), Nov 2026.
export const teaching: Experience[] = [
  {
    role: 'Laboratory Administrator',
    org: 'Algorithms and Programming Laboratory, ITS',
    period: 'May 2026 – Present',
    // highlights: ['TODO (optional): what the role involves, e.g. practicum, problem setting'],
    photos: album('admin_lab_algoritma_dan_pemrograman', 'Session at the Algorithms and Programming Laboratory'),
  },
  {
    role: 'Teaching Assistant, Data Structures and Algorithms',
    org: 'Institut Teknologi Sepuluh Nopember (ITS)',
    period: 'Jan 2026 – Present',
    // highlights: ['TODO (optional): e.g. "Led weekly labs for 40 students"'],
    photos: album('asdos/struktur_data_2025', 'Data Structures teaching assistants group photo'),
  },
  {
    role: 'Instructor, OSN Informatics Training (High School)',
    // Read from the event banner (East Java province logos). Confirm the exact organizing agency.
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
