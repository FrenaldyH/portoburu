/**
 * ContactLinks
 *
 * Contact pills at the bottom of the left column: every entry of profile.socials in order, then
 * the Email pill, then a Resume pill when profile.resumeUrl is set. External links open in a new
 * tab. To add or reorder links, edit `socials` in src/data/profile.ts.
 *
 * Exports: ContactLinks
 * Uses: EmailPill, classes.ts (pillClass), data/profile
 */
import { profile } from '../data/profile'
import { pillClass } from './classes'
import { EmailPill } from './EmailPill'

export function ContactLinks() {
  return (
    <ul aria-label="Contact" className="mt-8 flex flex-wrap gap-2 font-mono text-xs">
      {profile.socials.map((social) => (
        <li key={social.url}>
          <a href={social.url} target="_blank" rel="noreferrer" className={pillClass}>
            {social.label} ↗
          </a>
        </li>
      ))}
      <li>
        <EmailPill email={profile.email} />
      </li>
      {profile.resumeUrl && (
        <li>
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className={pillClass}>
            Resume ↗
          </a>
        </li>
      )}
    </ul>
  )
}
