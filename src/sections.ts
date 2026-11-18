/**
 * Sections
 *
 * The outline of the page. The order of `sections` is the order on the page and in the left
 * menu. Sections that share a `group` share one menu item (e.g. "Experience" holds Teaching &
 * Lab, Organizations, and Committees).
 *
 * `kind` picks the layout and works like a tagged union in C (a struct with an enum tag plus a
 * union): it tells TypeScript which item type `items` must hold.
 *   project     -> Project[]     numbered rows with tech tags and links
 *   experience  -> Experience[]  numbered rows with role, organization, and period
 *   trip        -> Trip[]        photo cards
 *
 * Add a new category that uses an existing layout:
 *   1. create src/data/<name>.ts exporting Experience[], Project[], or Trip[]
 *   2. import it below
 *   3. add one line to `sections` (a new `group` name creates a new menu item)
 *
 * Exports
 *   Section, Group   types
 *   sections         the outline above
 *   groups           sections bundled by group, in page order; drives the menu and the page
 *   slug(text)       URL-safe anchor id: "Teaching & Lab" -> "teaching-lab"
 */
import { achievements } from './data/achievements'
import { certifications } from './data/certifications'
import { committees } from './data/committees'
import { hiking } from './data/hiking'
import { organizations } from './data/organizations'
import { projects } from './data/projects'
import { teaching } from './data/teaching'
import { traveling } from './data/traveling'
import type { Experience, Project, Trip } from './types'

export type Section =
  | { group: string; title: string; kind: 'project'; items: Project[] }
  | { group: string; title: string; kind: 'experience'; items: Experience[] }
  | { group: string; title: string; kind: 'trip'; items: Trip[] }

export type Group = {
  id: string
  title: string
  sections: Section[]
}

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

export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export const groups: Group[] = [...Map.groupBy(sections, (section) => section.group)].map(([title, items]) => ({
  id: slug(title),
  title,
  sections: items,
}))
