/**
 * Photos
 *
 * Finds every photo under src/assets/photos at build time (Vite's import.meta.glob) and turns
 * one folder into a list of images for the data files.
 *
 * Exports
 *   album(folder, alt): Image[]
 *     All photos in src/assets/photos/<folder>/, ordered by file name with numeric sorting
 *     (1, 2, ..., 10). Each alt text is `alt` plus "(photo N of M)" for screen readers.
 *     Adding a photo to an existing activity = dropping a file into its folder; no code change.
 *
 * Notes
 *   - Photo URLs get a content hash (e.g. /assets/1-a3f9c2.jpeg), so browsers can cache them
 *     forever and still load a replaced photo.
 *   - Accepted extensions: jpg, jpeg, png, webp, in lower or upper case.
 *   - Run `pnpm photos` after adding photos: it shrinks large ones and strips GPS metadata.
 *   - ponytail: a wrong folder name throws when the page loads (blank page plus a console error
 *     in `pnpm dev`), not during `pnpm build`. Add a build-time check if a typo ever reaches
 *     production.
 */
import type { Image } from './types'

const files = import.meta.glob<string>('./assets/photos/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})

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
