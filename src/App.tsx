import { achievements } from './data/achievements'
import { committees } from './data/committees'
import { hiking } from './data/hiking'
import { organizations } from './data/organizations'
import { profile } from './data/profile'
import { projects } from './data/projects'
import { teaching } from './data/teaching'
import { traveling } from './data/traveling'

// Temporary Phase 1 page: dumps every data file so you can watch your edits appear on save.
// Replaced by the real split layout in Phase 2.
const sections = [
  ['profile', profile],
  ['projects', projects],
  ['achievements', achievements],
  ['hiking', hiking],
  ['traveling', traveling],
  ['organizations', organizations],
  ['committees', committees],
  ['teaching', teaching],
] as const

// Renders one labeled block of raw JSON per data file.
export function App() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">portoburu · data preview</h1>
      <p className="mt-2 font-mono text-sm text-subtle">
        Edit the files in src/data. This page reloads on save.
      </p>

      {sections.map(([name, data]) => (
        <section key={name} className="mt-10">
          <h2 className="font-mono text-xs tracking-widest text-subtle uppercase">{name}</h2>
          <pre className="mt-3 overflow-x-auto rounded-md border border-border p-4 font-mono text-xs text-muted">
            {JSON.stringify(data, null, 2)}
          </pre>
        </section>
      ))}
    </main>
  )
}
