// Shapes of every data file in src/data.
// Like a C header: if a data file has a wrong or missing field, `pnpm build` fails.
// A `?` after a field name means the field is optional.

// An image in public/images. `alt` is required so screen readers can describe it.
export type Image = {
  src: string // path from public/, e.g. "/images/hiking/semeru.jpg"
  alt: string // short description of what the image shows
}

// A social or contact link.
export type Social = {
  label: string // e.g. "GitHub"
  url: string
}

// Who you are: left sticky header + About section.
export type Profile = {
  name: string
  tagline: string // one line under your name
  location: string
  education: string
  about: string[] // one string per paragraph
  email: string
  socials: Social[]
  skills: string[]
  resumeUrl?: string // e.g. "/cv.pdf" after putting cv.pdf in public/
}

// A software project.
export type Project = {
  title: string
  description: string // 1-2 sentences: the problem it solves and what is notable
  year: string
  tech: string[]
  repoUrl?: string
  demoUrl?: string // live site
  videoUrl?: string // demo video, e.g. YouTube (unlisted is fine)
  image?: Image
}

// One trip: a hike (with elevation) or a travel destination (without).
// Used by both hiking.ts and traveling.ts.
export type Trip = {
  place: string
  elevation?: number // summit height in meters above sea level (mdpl), hikes only
  location: string
  date: string
  photos: Image[] // use album('<folder>', '<description>') from src/photos.ts
  note?: string
}

// A role in an organization, a committee, or a teaching activity.
// One shape for all three because each is "role + organization + period".
export type Experience = {
  role: string
  org: string
  period: string // e.g. "Aug 2024 – Present"
  description?: string
  highlights?: string[] // concrete results, ideally with numbers
  link?: string
  photos?: Image[] // use album('<folder>', '<description>') from src/photos.ts
}
