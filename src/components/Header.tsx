import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { groups, slug } from '../sections'

// Menu entries: About first, then one per group, in page order.
const navItems = [{ id: 'about', title: 'About', sections: [] }, ...groups]
const navIds = navItems.map((item) => item.id)

// Returns the id of the section the reader is looking at:
//   - at the very top of the page: the first section
//   - at the very bottom: the last section (it may be too short to ever reach the line below)
//   - otherwise: the last section whose top edge has passed 40% of the screen height
// Short sections broke a "middle of the screen" rule, so the rule is explicit here.
function useActiveId(ids: string[]): string {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    function update() {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      let current = ids[0]
      if (atBottom) {
        current = ids[ids.length - 1]
      } else if (window.scrollY > 0) {
        for (const id of ids) {
          const top = document.getElementById(id)?.getBoundingClientRect().top
          if (top !== undefined && top <= window.innerHeight * 0.4) current = id
        }
      }
      setActive(current) // React skips the re-render when the value did not change
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return active
}

// Left column: name, tagline, section menu, and contact links.
// On large screens it stays in place (sticky) while the right column scrolls.
export function Header() {
  const active = useActiveId(navIds)

  return (
    <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-16">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-fg lg:text-5xl">{profile.name}</h1>
        <p className="mt-4 max-w-sm text-lg leading-snug text-muted">{profile.tagline}</p>
        <p className="mt-4 font-mono text-xs leading-relaxed text-subtle">
          {profile.education}
          <br />
          {profile.location}
        </p>

        {/* Section menu: desktop only. On phones the sticky section headings do this job. */}
        <nav aria-label="Sections" className="mt-12 hidden lg:block">
          <ul>
            {navItems.map((item) => {
              const isActive = item.id === active
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'location' : undefined}
                    className="group flex items-center gap-4 py-1.5"
                  >
                    <span
                      className={`h-px transition-all motion-reduce:transition-none ${
                        isActive ? 'w-14 bg-fg' : 'w-7 bg-subtle group-hover:w-14 group-hover:bg-fg'
                      }`}
                    />
                    <span
                      className={`font-mono text-xs tracking-widest uppercase ${
                        isActive ? 'text-fg' : 'text-subtle group-hover:text-fg'
                      }`}
                    >
                      {item.title}
                    </span>
                  </a>
                  {/* Groups with several sections list them as small links on one line. */}
                  {item.sections.length > 1 && (
                    <ul className="mb-1 ml-11 flex flex-wrap gap-x-3">
                      {item.sections.map((section) => (
                        <li key={section.title}>
                          <a href={`#${slug(section.title)}`} className="font-mono text-[11px] text-subtle hover:text-fg">
                            {section.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </div>

      <ul aria-label="Contact" className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs">
        {profile.socials.map((social) => (
          <li key={social.url}>
            <a href={social.url} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
              {social.label} ↗
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${profile.email}`} className="text-muted hover:text-fg">
            Email
          </a>
        </li>
        {profile.resumeUrl && (
          <li>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-muted hover:text-fg">
              Resume ↗
            </a>
          </li>
        )}
      </ul>
    </header>
  )
}
