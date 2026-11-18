/**
 * Shared class names
 *
 * Tailwind class strings used by more than one component, kept in one place so the same kind
 * of element always looks the same.
 *
 * Exports
 *   pillClass          outlined contact pill (GitHub, LinkedIn, Email, ...): thin gray border and
 *                      white text; border and background light up on hover
 *   tagClass           small rounded label for skills and tech stacks; brightens on hover
 *   groupHeadingClass  section heading (ABOUT, PROJECTS, ...); on phones it sticks to the top of
 *                      the screen while its section scrolls, on desktop it is a plain heading
 */
export const pillClass =
  'inline-block rounded-full border border-border px-3 py-1.5 text-fg transition-colors hover:border-fg hover:bg-surface motion-reduce:transition-none'

export const tagClass =
  'rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted transition-colors hover:border-subtle hover:text-fg motion-reduce:transition-none'

export const groupHeadingClass =
  'sticky top-0 z-10 -mx-6 bg-bg px-6 py-4 font-mono text-xs tracking-widest text-fg uppercase md:-mx-12 md:px-12 lg:static lg:mx-0 lg:bg-transparent lg:px-0'
