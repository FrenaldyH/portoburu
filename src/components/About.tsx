/**
 * About
 *
 * First block of the right column: the about paragraphs and the skill tags from
 * src/data/profile.ts. Its heading is shown on phones only, because on desktop the left header
 * already introduces you.
 *
 * Exports: About
 * Uses: classes.ts (groupHeadingClass, tagClass), data/profile
 */
import { profile } from '../data/profile'
import { groupHeadingClass, tagClass } from './classes'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16">
      <h2 id="about-title" className={`${groupHeadingClass} lg:hidden`}>
        About
      </h2>
      {profile.about.map((paragraph) => (
        <p key={paragraph} className="mb-4 leading-relaxed text-muted">
          {paragraph}
        </p>
      ))}
      <ul aria-label="Skills" className="mt-6 flex flex-wrap gap-1.5">
        {profile.skills.map((skill) => (
          <li key={skill} className={tagClass}>
            {skill}
          </li>
        ))}
      </ul>
    </section>
  )
}
