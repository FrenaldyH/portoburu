import { Header } from './components/Header'
import { SectionBody } from './components/SectionBody'
import { profile } from './data/profile'
import { groups, slug } from './sections'

// Shared look for each group heading. On phones it sticks to the top while you scroll that group.
const groupHeading =
  'sticky top-0 z-10 -mx-6 bg-bg px-6 py-4 font-mono text-xs tracking-widest text-fg uppercase md:-mx-12 md:px-12 lg:static lg:mx-0 lg:bg-transparent lg:px-0'

// Page layout: sticky header on the left, scrolling content on the right.
// All content comes from src/data through src/sections.ts, so adding items never touches this file.
export function App() {
  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-12 lg:px-16">
        <Header />

        <main id="content" className="pt-16 pb-24 lg:w-[54%] lg:py-16">
          <section id="about" aria-labelledby="about-title" className="scroll-mt-16">
            {/* The left header already introduces you on desktop, so this heading shows on phones only. */}
            <h2 id="about-title" className={`${groupHeading} lg:hidden`}>
              About
            </h2>
            {profile.about.map((paragraph) => (
              <p key={paragraph} className="mb-4 leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
            <ul aria-label="Skills" className="mt-6 flex flex-wrap gap-1.5">
              {profile.skills.map((skill) => (
                <li key={skill} className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
                  {skill}
                </li>
              ))}
            </ul>
          </section>

          {groups.map((group) => {
            const hasSubsections = group.sections.length > 1
            return (
              <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="mt-24 scroll-mt-16">
                <h2 id={`${group.id}-title`} className={groupHeading}>
                  {group.title}
                </h2>
                {group.sections.map((section) => (
                  <div
                    key={section.title}
                    id={hasSubsections ? slug(section.title) : undefined}
                    className="mt-6 scroll-mt-16"
                  >
                    {/* Subsection title is visible only when a group holds several sections. */}
                    <h3 className={hasSubsections ? 'mb-2 text-sm font-medium text-muted' : 'sr-only'}>
                      {section.title}
                    </h3>
                    <SectionBody section={section} />
                  </div>
                ))}
              </section>
            )
          })}
        </main>
      </div>
    </>
  )
}
