/**
 * SectionBody
 *
 * Renders the items of one section with the layout its `kind` asks for:
 *   project     -> numbered Rows: year on the right, tech stack as tags, links to Code / Live / Video
 *   experience  -> numbered Rows: role as title, organization under it, period on the right; an
 *                  optional link is labeled with its domain, e.g. "icpc.global ↗"
 *   trip        -> a grid of TripCards (two columns on phones, three on wider screens)
 *
 * The explicit JSX.Element return type makes TypeScript report an error if a new `kind` is added
 * to Section in sections.ts without a matching case here.
 *
 * Exports: SectionBody({ section })
 * Uses: Row, TripCard
 */
import type { JSX } from 'react'
import type { Section } from '../sections'
import type { Experience, Project } from '../types'
import { Row, type Link, type RowProps } from './Row'
import { TripCard } from './TripCard'

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
