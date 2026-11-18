/**
 * GroupSection
 *
 * One group of the page (Projects, Achievements, Experience, Adventures): its heading, then each
 * of its sections. When a group holds several sections, each gets a visible subheading and its own
 * anchor id (e.g. #teaching-lab) for the menu links; a group with a single section keeps the
 * subheading for screen readers only.
 *
 * Exports: GroupSection({ group })
 * Uses: SectionBody, classes.ts (groupHeadingClass), sections.ts (Group, slug)
 */
import { slug, type Group } from '../sections'
import { groupHeadingClass } from './classes'
import { SectionBody } from './SectionBody'

export function GroupSection({ group }: { group: Group }) {
  const hasSubsections = group.sections.length > 1

  return (
    <section id={group.id} aria-labelledby={`${group.id}-title`} className="mt-24 scroll-mt-16">
      <h2 id={`${group.id}-title`} className={groupHeadingClass}>
        {group.title}
      </h2>
      {group.sections.map((section) => (
        <div key={section.title} id={hasSubsections ? slug(section.title) : undefined} className="mt-6 scroll-mt-16">
          <h3 className={hasSubsections ? 'mb-2 text-sm font-medium text-muted' : 'sr-only'}>{section.title}</h3>
          <SectionBody section={section} />
        </div>
      ))}
    </section>
  )
}
