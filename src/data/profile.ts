/**
 * Profile data
 *
 * Who you are. Shown in the left header (name, tagline, education, location, contact pills) and in
 * the About section (about paragraphs, skill tags).
 *
 * Fields
 *   tagline    one line under your name
 *   about      one string per paragraph; keep it short
 *   socials    contact pills, in this order; the Email pill is added after them automatically
 *   skills     plain list, no percentages or skill bars
 *   resumeUrl  optional: put cv.pdf in public/ and add `resumeUrl: '/cv.pdf'` to show a Resume pill
 *
 * The field types are documented in src/types.ts (Profile).
 */
import type { Profile } from '../types'

export const profile: Profile = {
  name: 'Frenaldy Bestabba Hasugian',
  tagline: 'Informatics student at ITS building backend systems, grounded in competitive programming.',
  location: 'Surabaya, Indonesia',
  education: 'Informatics, Sepuluh Nopember Institute of Technology (2024 – Present)',
  about: [
    "I'm an Informatics student at ITS focused on backend development, big data, and optimization.",
    'Outside of coding, I spend my free time traveling and hiking.',
  ],
  email: 'frenaldyh@gmail.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/FrenaldyH' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/frenaldyh/' },
    { label: 'Codeforces', url: 'https://codeforces.com/profile/FrenH' },
    { label: 'YouTube', url: 'https://www.youtube.com/@Frenaldyh' },
  ],
  skills: [
    'Go',
    'C/C++',
    'TypeScript',
    'JavaScript',
    'Python',
    'SQL',
    'React',
    'Gin',
    'GORM',
    'PostgreSQL',
    'Supabase',
    'Tailwind CSS',
    'Docker',
    'Git',
    'Linux',
  ],
}
