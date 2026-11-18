import { achievements } from './data/achievements'
import { certifications } from './data/certifications'
import { committees } from './data/committees'
import { hiking } from './data/hiking'
import { organizations } from './data/organizations'
import { projects } from './data/projects'
import { teaching } from './data/teaching'
import { traveling } from './data/traveling'
import type { Experience, Project, Trip } from './types'

// One block of the page. `kind` picks the layout and, like a tagged union in C
// (a struct with an enum tag + union), tells TypeScript which item type `items` must hold.
export type Section =
  | { group: string; title: string; kind: 'project'; items: Project[] }
  | { group: string; title: string; kind: 'experience'; items: Experience[] }
  | { group: string; title: string; kind: 'trip'; items: Trip[] }

// The page outline. Order here = order on the page and in the left menu.
// Sections that share a `group` share one menu item (e.g. "Experience").
//
// Add a new category that uses an existing layout:
//   1. create src/data/<name>.ts exporting Experience[], Project[], or Trip[]
//   2. import it at the top of this file
//   3. add one line below (a new `group` name creates a new menu item)
export const sections: Section[] = [
  { group: 'Projects', title: 'Projects', kind: 'project', items: projects },
  { group: 'Achievements', title: 'Competitions & Scholarships', kind: 'experience', items: achievements },
  { group: 'Achievements', title: 'Certifications', kind: 'experience', items: certifications },
  { group: 'Experience', title: 'Teaching & Lab', kind: 'experience', items: teaching },
  { group: 'Experience', title: 'Organizations', kind: 'experience', items: organizations },
  { group: 'Experience', title: 'Committees', kind: 'experience', items: committees },
  { group: 'Adventures', title: 'Hiking', kind: 'trip', items: hiking },
  { group: 'Adventures', title: 'Traveling', kind: 'trip', items: traveling },
]

// Turns a title into a URL-safe anchor id: "Teaching & Lab" -> "teaching-lab".
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// Sections bundled by group, in page order. Drives both the menu and the page body.
export const groups = [...Map.groupBy(sections, (section) => section.group)].map(([title, items]) => ({
  id: slug(title),
  title,
  sections: items,
}))
