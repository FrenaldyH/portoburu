/**
 * Spotlight
 *
 * A very faint light that follows the mouse behind the page content. The mouse position is written
 * to the CSS variables --spot-x and --spot-y, so React never re-renders while the mouse moves; the
 * light itself is the .spotlight style in background.css (strength: --spot-strength).
 * Shown only on devices with a precise pointer (mouse or trackpad) and when the visitor has not
 * asked their OS for reduced motion; hidden on phones and tablets.
 *
 * Exports: Spotlight
 */
import { useEffect } from 'react'

export function Spotlight() {
  useEffect(() => {
    function move(event: PointerEvent) {
      const style = document.documentElement.style
      style.setProperty('--spot-x', `${event.clientX}px`)
      style.setProperty('--spot-y', `${event.clientY}px`)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="spotlight pointer-events-none fixed inset-0 -z-10 hidden pointer-fine:motion-safe:block"
    />
  )
}
