import type { JSX } from 'react'
import type { Section } from '../sections'
import type { Experience, Project } from '../types'
import { Row, type Link, type RowProps } from './Row'
import { TripCard } from './TripCard'

// Project -> Row: year on the right, tech stack as tags, links to code / live demo / video.
function fromProject(project: Project): Omit<RowProps, 'index'> {
  const links: Link[] = []
  if (project.repoUrl) links.push({ label: 'Code', url: project.repoUrl })
  if (project.demoUrl) links.push({ label: 'Live', url: project.demoUrl })
  if (project.videoUrl) links.push({ label: 'Video', url: project.videoUrl })

  return {
    title: project.title,
    meta: project.year,
    description: project.description,
    tags: project.tech,
    links,
    photos: project.image ? [project.image] : undefined,
  }
}

// Experience -> Row: role as title, organization under it, period on the right.
// An optional link is labeled with its domain, e.g. "icpc.global ↗".
function fromExperience(item: Experience): Omit<RowProps, 'index'> {
  const links: Link[] = []
  if (item.link) {
    const label = URL.canParse(item.link) ? new URL(item.link).hostname.replace(/^www\./, '') : 'Link'
    links.push({ label, url: item.link })
  }

  return {
    title: item.role,
    subtitle: item.org,
    meta: item.period,
    description: item.description,
    highlights: item.highlights,
    links,
    photos: item.photos,
  }
}

// Renders one section's items with the layout its `kind` asks for.
// The explicit return type makes TypeScript report an error if a new `kind`
// is added to Section in src/sections.ts without a matching case here.
export function SectionBody({ section }: { section: Section }): JSX.Element {
  switch (section.kind) {
    case 'project':
      return (
        <ol>
          {section.items.map((project, i) => (
            <Row key={project.title} index={i + 1} {...fromProject(project)} />
          ))}
        </ol>
      )
    case 'experience':
      return (
        <ol>
          {section.items.map((item, i) => (
            <Row key={`${item.role}|${item.org}|${item.period}`} index={i + 1} {...fromExperience(item)} />
          ))}
        </ol>
      )
    case 'trip':
      return (
        <ul className="-mx-2 grid grid-cols-2 gap-1 sm:grid-cols-3">
          {section.items.map((trip, i) => (
            <TripCard key={`${trip.place}|${i}`} trip={trip} />
          ))}
        </ul>
      )
  }
}
