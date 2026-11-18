import type { Image } from '../types'
import { Gallery } from './Gallery'

export type Link = { label: string; url: string }

export type RowProps = {
  index: number // position in the list, shown as 01, 02, ...
  title: string
  subtitle?: string
  meta: string // right-aligned: a period or a year
  description?: string
  highlights?: string[]
  tags?: string[]
  links?: Link[]
  photos?: Image[]
}

// One numbered line in a list, laid out like a music tracklist:
// number | title and details | date on the right. Used by projects and every Experience section.
export function Row({ index, title, subtitle, meta, description, highlights, tags, links, photos }: RowProps) {
  return (
    <li className="-mx-3 grid grid-cols-[1.75rem_1fr] gap-x-3 rounded-lg p-3 transition-colors hover:bg-surface motion-reduce:transition-none sm:grid-cols-[1.75rem_1fr_auto]">
      <span aria-hidden="true" className="pt-px font-mono text-xs text-subtle tabular-nums">
        {String(index).padStart(2, '0')}
      </span>

      <div className="min-w-0">
        <h4 className="text-sm font-medium text-fg">{title}</h4>
        {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        {/* On phones the date sits under the title; on wider screens it moves to the right column. */}
        <p className="mt-1 font-mono text-xs text-subtle sm:hidden">{meta}</p>

        {description && <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>}

        {highlights && highlights.length > 0 && (
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2">
                <span aria-hidden="true" className="text-subtle">
                  –
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}

        {tags && tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
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

        {photos && photos.length > 0 && <Gallery photos={photos} />}
      </div>

      <span className="hidden pt-px text-right font-mono text-xs whitespace-nowrap text-subtle sm:block">{meta}</span>
    </li>
  )
}
