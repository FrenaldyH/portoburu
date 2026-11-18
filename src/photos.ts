import type { Image } from './types'

// Every photo under src/assets/photos, found by Vite at build time.
// Key: file path like "./assets/photos/hiking/mt_penanggungan/1.jpeg"
// Value: final URL with a content hash (e.g. /assets/1-a3f9c2.jpeg), so browsers can cache it forever.
const files = import.meta.glob<string>(
  './assets/photos/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, import: 'default' },
)

// Returns all photos inside one folder of src/assets/photos, ordered by file name
// with numeric sorting (1, 2, ..., 10). Adding a photo = dropping a file into the folder.
// `alt` describes the activity; each photo gets "(photo N of M)" appended for screen readers.
// ponytail: a wrong folder name throws when the page loads (blank page + console error in `pnpm dev`),
// not during `pnpm build`; add a build-time test if a typo ever reaches production.
export function album(folder: string, alt: string): Image[] {
  const prefix = `./assets/photos/${folder}/`
  const paths = Object.keys(files)
    .filter((path) => path.startsWith(prefix))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  if (paths.length === 0) {
    throw new Error(`album(): no photos found in src/assets/photos/${folder}/`)
  }

  return paths.map((path, i) => ({
    src: files[path],
    alt: `${alt} (photo ${i + 1} of ${paths.length})`,
  }))
}
