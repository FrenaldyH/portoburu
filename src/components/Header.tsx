/**
 * Header
 *
 * Left column of the page: name (also a "back to top" link), tagline, education and location,
 * the section menu, and the contact pills. On large screens it stays in place (sticky) while the
 * right column scrolls; on phones it sits at the top of the page.
 *
 * Exports: Header
 * Uses: Nav, ContactLinks, data/profile
 */
import { profile } from '../data/profile'
import { ContactLinks } from './ContactLinks'
import { Nav } from './Nav'

export function Header() {
  return (
    <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-12">
      <div>
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
        <Nav />
      </div>
      <ContactLinks />
    </header>
  )
}
