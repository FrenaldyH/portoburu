/**
 * Nav
 *
 * Section menu in the left column, desktop only (on phones the sticky section headings do this
 * job). One item per group from sections.ts, with About first. The item for the section in view
 * gets a longer white line; hovering an item does the same. Groups that hold several sections
 * list them as small links on one line under the group name.
 *
 * Exports: Nav
 * Uses: useActiveSection, sections.ts (groups, slug)
 */
import { useActiveSection } from '../hooks/useActiveSection'
import { groups, slug } from '../sections'

const navItems = [{ id: 'about', title: 'About', sections: [] }, ...groups]
const navIds = navItems.map((item) => item.id)

export function Nav() {
  const active = useActiveSection(navIds)

  return (
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
  )
}
