/**
 * App
 *
 * Page layout: the sticky Header on the left and the scrolling content on the right (About, then
 * one GroupSection per group from sections.ts). Also renders the mouse Spotlight and a "Skip to
 * content" link that appears when a keyboard user presses Tab.
 *
 * All content comes from src/data through src/sections.ts, so adding items or categories never
 * touches this file.
 *
 * Exports: App
 * Uses: Header, About, GroupSection, Spotlight, sections.ts (groups)
 */
import { About } from './components/About'
import { GroupSection } from './components/GroupSection'
import { Header } from './components/Header'
import { Spotlight } from './components/Spotlight'
import { groups } from './sections'

export function App() {
  return (
    <>
      <Spotlight />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>

      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-12 lg:px-16">
        <Header />
        <main id="content" className="pt-16 pb-24 lg:w-[54%] lg:py-16">
          <About />
          {groups.map((group) => (
            <GroupSection key={group.id} group={group} />
          ))}
        </main>
      </div>
    </>
  )
}
