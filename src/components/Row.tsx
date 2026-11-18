/**
 * Row
 *
 * One numbered line in a list, laid out like a music tracklist. Used by projects and every
 * Experience section.
 *   Without photos:  number | title, subtitle, details | date on the right
 *   With photos:     number | title, subtitle, date, details | photo deck on the right
 *                    (on phones the deck moves under the text)
 * Details are optional and shown in this order: description, highlights (bulleted), tags, links.
 * The whole row gets a subtle background on hover.
 *
 * Exports
 *   Row(props)  the component
 *   RowProps    index (shown as 01, 02, ...), title, subtitle?, meta (a period or a year),
 *               description?, highlights?, tags?, links?, photos?
 *   Link        { label, url } for the links under a row
 * Uses: PhotoStack, classes.ts (tagClass)
 */
import type { Image } from '../types'
import { tagClass } from './classes'
import { PhotoStack } from './PhotoStack'

export type Link = { label: string; url: string }

export type RowProps = {
  index: number
  title: string
  subtitle?: string
  meta: string
  description?: string
  highlights?: string[]
  tags?: string[]
  links?: Link[]
  photos?: Image[]
}

export function Row({ index, title, subtitle, meta, description, highlights, tags, links, photos }: RowProps) {
  const hasPhotos = photos !== undefined && photos.length > 0

  return (
    <li
      className={`-mx-3 grid grid-cols-[1.75rem_1fr] gap-x-3 rounded-lg p-3 transition-colors hover:bg-surface motion-reduce:transition-none ${
        hasPhotos ? 'sm:grid-cols-[1.75rem_1fr_10.5rem]' : 'sm:grid-cols-[1.75rem_1fr_auto]'
      }`}
    >
      <span aria-hidden="true" className="pt-px font-mono text-xs text-subtle tabular-nums">
        {String(index).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <h4 className="text-sm font-medium text-fg">{title}</h4>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        <p className={`mt-1 font-mono text-xs text-subtle ${hasPhotos ? '' : 'sm:hidden'}`}>{meta}</p>

        {description && <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>}

        {highlights && highlights.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span aria-hidden="true" className="text-subtle">
                  •
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag} className={tagClass}>
                {tag}
              </li>
            ))}
          </ul>
        )}

        {links && links.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs">
            {links.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted underline-offset-4 hover:text-fg hover:underline"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {hasPhotos ? (
        <div className="col-start-2 w-48 sm:col-start-3 sm:row-start-1 sm:-mt-4 sm:w-auto sm:pl-2">
          <PhotoStack photos={photos} frame="aspect-[4/3] w-full" />
        </div>
      ) : (
        <span className="hidden pt-px text-right font-mono text-xs whitespace-nowrap text-subtle sm:block">{meta}</span>
      )}
    </li>
  )
}
