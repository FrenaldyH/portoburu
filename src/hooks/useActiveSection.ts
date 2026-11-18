/**
 * useActiveSection
 *
 * Tells the menu which section the reader is looking at, by checking section positions on every
 * scroll and resize:
 *   - at the very top of the page: the first id
 *   - at the very bottom: the last id (a short last section may never reach the line below)
 *   - otherwise: the last section whose top edge has passed 40% of the screen height
 * A "middle of the screen" rule was tried first and failed for the short About section, so the
 * rule is explicit. React skips the re-render when the result did not change.
 *
 * Exports
 *   useActiveSection(ids): string
 *     `ids` are element ids in page order. Pass a stable array (defined outside the component),
 *     or the listeners are re-attached on every render.
 */
import { useEffect, useState } from 'react'

export function useActiveSection(ids: string[]): string {
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
      setActive(current)
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
