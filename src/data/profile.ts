import type { Profile } from '../types'

// About you: used by the left sticky header and the About section.
// Replace every "TODO" value. Find what is left with: grep -rn TODO src/data
export const profile: Profile = {
  name: 'Frenaldy Bestabba Hasugian',
  // Draft based on your LinkedIn (ICPC, NPC manager, OSN instructor, Algorithms lab). Edit freely.
  tagline: 'Informatics student at ITS building backend systems, grounded in competitive programming.',
  location: 'Surabaya, Indonesia',
  education: 'Informatics, Sepuluh Nopember Institute of Technology (2024 – Present)',

  // One string per paragraph. Keep it short: who you are, what you build, what you care about.
  about: [
    "I'm an Informatics student at ITS focused on backend development, big data, and optimization.",
    'Outside of coding, I spend my free time traveling and hiking.',
  ],

  email: 'frenaldyh@gmail.com',

  // Contact links shown in the header. Add or remove entries freely.
  socials: [
    { label: 'GitHub', url: 'https://github.com/FrenaldyH' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/frenaldyh/' },
  ],

  // Plain list, no percentages or skill bars.
  skills: ['Go', 'React', 'TypeScript', 'PostgreSQL'],

  // Optional: put cv.pdf in public/ and uncomment.
  // resumeUrl: '/cv.pdf',
}
