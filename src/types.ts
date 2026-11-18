/**
 * Types
 *
 * The shape of every data file in src/data. Like a C header: if a data file has a wrong
 * or missing field, `pnpm build` fails. A `?` after a field name means it is optional.
 *
 * Image       src, alt
 *             src comes from album() in photos.ts; alt describes the photo for screen readers.
 * Social      label, url
 *             One contact pill, e.g. { label: 'GitHub', url: 'https://github.com/...' }.
 * Profile     name, tagline, location, education, about, email, socials, skills, resumeUrl?
 *             about holds one string per paragraph; resumeUrl is e.g. '/cv.pdf' after putting
 *             cv.pdf in public/.
 * Project     title, description, year, tech, repoUrl?, demoUrl?, videoUrl?, image?
 *             description is 1-2 sentences: the problem it solves and what is notable.
 * Trip        place, elevation?, location, date, photos, note?
 *             elevation is the height in meters above sea level (mdpl), for hikes only.
 * Experience  role, org, period, description?, highlights?, link?, photos?
 *             One shape for organizations, committees, teaching, achievements, and
 *             certifications; period is e.g. 'Aug 2024 – Present'; highlights are concrete
 *             results, ideally with numbers.
 */

export type Image = {
  src: string
  alt: string
}

export type Social = {
  label: string
  url: string
}

export type Profile = {
  name: string
  tagline: string
  location: string
  education: string
  about: string[]
  email: string
  socials: Social[]
  skills: string[]
  resumeUrl?: string
}

export type Project = {
  title: string
  description: string
  year: string
  tech: string[]
  repoUrl?: string
  demoUrl?: string
  videoUrl?: string
  image?: Image
}

export type Trip = {
  place: string
  elevation?: number
  location: string
  date: string
  photos: Image[]
  note?: string
}

export type Experience = {
  role: string
  org: string
  period: string
  description?: string
  highlights?: string[]
  link?: string
  photos?: Image[]
}
