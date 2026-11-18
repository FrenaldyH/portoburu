import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { groups, slug } from '../sections'

// Menu entries: About first, then one per group, in page order.
const navItems = [{ id: 'about', title: 'About', sections: [] }, ...groups]
const navIds = navItems.map((item) => item.id)

// Outlined pill for contact links: thin gray border, white text; border and background light up on hover.
const pill =
  'inline-block rounded-full border border-border px-3 py-1.5 text-fg transition-colors hover:border-fg hover:bg-surface motion-reduce:transition-none'

// Email pill: hovering or focusing it shows the address above it; clicking copies the address.
// Copying works for visitors without a mail app, for whom a mailto: link does nothing.
function EmailPill({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  // Copy the address; if the browser blocks the clipboard, fall back to opening the mail app.
  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  return (
    <span className="group/email relative inline-block">
      <button type="button" onClick={copy} aria-label={`Copy email address ${email}`} className={pill}>
        Email
      </button>
      {/* Shown below the pill: the space under the contact row is always empty, while the row above
          may hold other pills. Left-aligned so it never sticks out past the left side of a phone screen.
          role="status" makes screen readers announce "Copied to clipboard". */}
      <span
        role="status"
        className={`pointer-events-none absolute top-full left-0 z-10 mt-2 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] whitespace-nowrap text-fg transition-opacity motion-reduce:transition-none ${
          copied ? 'opacity-100' : 'opacity-0 group-focus-within/email:opacity-100 group-hover/email:opacity-100'
        }`}
      >
        {copied ? 'Copied to clipboard' : `${email} · click to copy`}
      </span>
    </span>
  )
}

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
    <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-12">
      <div>
        {/* The name doubles as a "back to top" link. */}
        <h1 className="text-4xl font-semibold tracking-tight text-fg lg:text-5xl">
          <a href="#" className="transition-colors hover:text-muted motion-reduce:transition-none">
            {profile.name}
          </a>
        </h1>
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

      {/* Contact links as outlined pills: the main thing a visitor should find. */}
      <ul aria-label="Contact" className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
        {profile.socials.map((social) => (
          <li key={social.url}>
            <a href={social.url} target="_blank" rel="noreferrer" className={pill}>
              {social.label} ↗
            </a>
          </li>
        ))}
        <li>
          <EmailPill email={profile.email} />
        </li>
        {profile.resumeUrl && (
          <li>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className={pill}>
              Resume ↗
            </a>
          </li>
        )}
      </ul>
    </header>
  )
}
