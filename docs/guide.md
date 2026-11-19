# Operating guide

How to change the content of the site and get it online. For how the code works, read
[architecture.md](architecture.md); for why it is built this way, read [decisions.md](decisions.md).

## Contents

- [The edit loop](#the-edit-loop)
- [Content rules](#content-rules)
- [Recipes](#recipes): profile, projects, demo videos, experience and achievements, photos,
  hikes and trips, new categories, resume, link preview image, visual effects
- [Deploy](#deploy): first deploy on Vercel, updates, rollbacks, build failures
- [Troubleshooting](#troubleshooting)

## The edit loop

1. Run `pnpm dev` and open http://localhost:5173.
2. Edit a file in `src/data/` and save. The page updates without a reload.
3. Before committing, run `pnpm build && pnpm lint`. Both must pass. Vercel runs the same build
   and will not publish a version that fails it, so a passing local build means a working deploy.
4. Commit and push to `main`. Vercel publishes it about a minute later.

## Content rules

- **Order:** newest first in every list. Projects are the exception: strongest first.
- **Dates:** `Nov 2026` for a single month; `Aug 2025 – Dec 2025` or `Mar 2026 – Present` for a
  range. The en dash (–, with a space on each side) appears only inside date ranges, never as a
  separator in sentences or titles. Use a comma or a colon there instead.
- **Highlights:** concrete results, ideally with numbers ("for 85 participants and 13
  speakers"), not adjectives ("successfully led a great event").
- **One story everywhere:** keep the site, the CV, and LinkedIn saying the same thing.

## Recipes

### Change the profile

Everything in the left column and the About block comes from `src/data/profile.ts`:

| Field | Shown as |
|---|---|
| `name`, `tagline` | Big name and the line under it |
| `education`, `location` | Small gray lines under the tagline |
| `about` | About paragraphs, one string per paragraph |
| `socials` | Contact pills, in this order; the Email pill is added after them automatically |
| `skills` | Skill tags under About |
| `resumeUrl` | Optional Resume pill (see [Add a resume](#add-a-resume)) |

### Add a project

Add an object to `src/data/projects.ts`, at the position where it should appear:

```ts
{
  title: 'Project Name',
  description: 'The problem it solves and what is notable about it, in one or two sentences.',
  year: '2026',
  tech: ['Go', 'Gin', 'PostgreSQL'],
  repoUrl: 'https://github.com/FrenaldyH/project-name',
  demoUrl: 'https://project-name.vercel.app',
  videoUrl: 'https://youtu.be/VIDEO_ID',
},
```

`repoUrl`, `demoUrl`, and `videoUrl` are optional. Each one you fill in adds a link under the
project: `Code ↗`, `Live ↗`, `Video ↗`.

### Add a demo video to a project

1. Record the screen: OBS Studio, or the GNOME screenshot tool (press Print Screen, then switch
   to video). One to two minutes is enough: open with the problem, then show the main flow.
2. Upload it to YouTube (youtube.com/@Frenaldyh). "Unlisted" works if you do not want it on
   your channel page: anyone with the link can watch, but it does not appear in search.
3. Under the video, click Share and copy the link (`https://youtu.be/...`).
4. In `src/data/projects.ts`, add `videoUrl: 'https://youtu.be/...'` to the project.
5. Run `pnpm build`, then commit and push.

The site links to the video instead of embedding it. A YouTube embed loads about a megabyte of
player code for every visitor, including the many who never press play.

### Add an entry to Experience or Achievements

Pick the file by the section it belongs to:

| Section on the page | File |
|---|---|
| Competitions & Scholarships | `src/data/achievements.ts` |
| Certifications | `src/data/certifications.ts` |
| Teaching & Lab | `src/data/teaching.ts` |
| Organizations | `src/data/organizations.ts` |
| Committees | `src/data/committees.ts` |

All five use the same shape (`Experience` in `src/types.ts`). Only `role`, `org`, and `period`
are required:

```ts
{
  role: 'Staff, Research & Technology',
  org: 'Himpunan Mahasiswa Teknik Computer-Informatika (HMTC) ITS',
  period: 'Mar 2026 – Present',
  description: 'Optional: one sentence of context.',
  highlights: ['Optional: concrete results, one per line.'],
  link: 'https://example.com/credential',
  photos: album('organization/hmtc', 'HMTC members group photo'),
},
```

- `link` is shown under the entry, labeled with its domain (for example `icpc.global ↗`). Use it
  for credentials or certificates that anyone can verify.
- `photos` needs `import { album } from '../photos'` at the top of the file. Most data files
  already have it.

### Add photos

1. Create a folder under `src/assets/photos/`, lowercase with underscores, for example
   `src/assets/photos/committees/schematics_2026/`.
2. Name the files `1.jpg`, `2.jpg`, `3.jpg`, ... in the order they should appear. The sort is
   numeric, so `10.jpg` comes after `9.jpg`. jpg, jpeg, png, and webp are accepted.
3. Run `pnpm photos`. It shrinks any photo over 1600px and strips its EXIF metadata, which on
   phone photos includes the GPS location where the photo was taken. Photos that are already
   processed are left alone, so running it again is safe.
4. Point the entry at the folder:
   `photos: album('committees/schematics_2026', 'What the photos show')`.
   The second argument is the alt text that screen readers read aloud. Describe the scene.

To add more photos to an existing folder later, steps 2 and 3 are enough. No code changes.

### Add a hike or a trip

Hikes go in `src/data/hiking.ts`, other trips in `src/data/traveling.ts`. Same shape for both
(`Trip` in `src/types.ts`):

```ts
{
  place: 'Mount Penanggungan',
  elevation: 1653,
  location: 'Mojokerto, East Java',
  date: 'Nov 2026',
  photos: album('hiking/mt_penanggungan', 'Hike to the summit of Mount Penanggungan'),
  note: 'Optional: one line.',
},
```

`elevation` is in meters above sea level (mdpl), for hikes only; leave it out for trips. `photos`
is required here, because every card is built around its photos.

### Add a new category

When the new category fits one of the three existing layouts (numbered rows for experience,
numbered rows for projects, photo cards for trips), it takes three steps and no component
changes. Example: a "Volunteering" list.

1. Create `src/data/volunteering.ts`:
   ```ts
   import type { Experience } from '../types'

   export const volunteering: Experience[] = [
     { role: '...', org: '...', period: 'Jan 2027' },
   ]
   ```
2. Import it in `src/sections.ts`: `import { volunteering } from './data/volunteering'`.
3. Add one line to the `sections` array, at the position where it should appear:
   ```ts
   { group: 'Experience', title: 'Volunteering', kind: 'experience', items: volunteering },
   ```
   An existing `group` name puts it under that menu item. A new group name creates a new menu
   item and a new heading.

If `kind` and `items` do not match (for example `kind: 'trip'` with `Experience[]`),
`pnpm build` fails and names the line. A category that needs a completely new layout is a code
change: see "Add a new layout" in [architecture.md](architecture.md#add-a-new-layout).

### Add a resume

1. Export the CV as PDF and save it as `public/cv.pdf`.
2. In `src/data/profile.ts`, add `resumeUrl: '/cv.pdf',`.

A Resume pill appears after the Email pill. Files in `public/` are published as they are, so
the file is reachable at `https://<your-site>/cv.pdf`. Re-export it whenever the CV changes.

### Update the link preview image

`public/og.png` is the picture shown when the site's link is shared. It contains the name,
tagline, a short education line, and the social pills, so it goes out of date when those change
in `profile.ts`. To regenerate it, follow the four steps at the top of
`scripts/og-image.html`. If the tagline changed, also update the two `description` tags in
`index.html`. Chat apps cache previews for days; LinkedIn Post Inspector forces a refresh.

### Tune the visual effects

| What | Where | Knob |
|---|---|---|
| Dust brightness | `src/background.css`, `:root` | `--dust-near`, `--dust-far`: 0 hides a layer, 1 is full brightness |
| Mouse spotlight | `src/background.css`, `:root` | `--spot-strength`: 0.03 barely there, 0.08 clearly visible |
| Colors and fonts | `src/index.css`, `@theme` | `--color-*`, `--font-*` |

## Deploy

The site is static: `pnpm build` produces plain HTML, JS, CSS, and image files in `dist/`, and
any static host can serve them. Vercel is used because it builds and publishes automatically on
every push. The reasons are in [decisions.md](decisions.md#hosting-vercel).

### First deploy

The repository is already on GitHub (`FrenaldyH/portoburu`), so the first deploy is a one-time
import:

1. Go to vercel.com and sign up or log in with **Continue with GitHub**.
2. Click **Add New… → Project**. If `portoburu` is not in the list, click **Adjust GitHub App
   Permissions** and give Vercel access to that repository.
3. Click **Import** next to `portoburu`. Vercel reads `package.json` and `pnpm-lock.yaml`
   and fills in the settings. Check that they say:
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `pnpm build` (or the default, which runs the `build` script from
     `package.json`, the same thing)
   - Output Directory: `dist`
   - Environment Variables: none needed
4. Click **Deploy** and wait about a minute. The site is live at an address like
   `portoburu.vercel.app` (Vercel adds a suffix if the name is taken).

What happens during those minutes: Vercel clones the repository, installs exactly the versions
listed in `pnpm-lock.yaml`, runs `tsc` and `vite build`, and copies `dist/` to its CDN, a network
of servers around the world. A visitor gets the files from the server nearest to them. There is
no server-side code, so there is nothing to keep running and nothing to pay for on the free
Hobby plan.

### Updating the site

- **Push to `main`:** Vercel builds and publishes it as the new production site.
- **Push to any other branch:** Vercel builds a preview at its own URL and leaves production
  untouched. Useful for trying out a bigger change on a phone before merging.
- **Undo a bad deploy:** in the Vercel dashboard, open **Deployments**, pick the last good one,
  and choose **Promote to Production**. This switches back instantly without a rebuild.

Changes that only exist on your laptop are invisible to Vercel. It reacts to pushes: when you
connect the repository, Vercel installs a GitHub App on it, and GitHub notifies Vercel (a
webhook) every time commits arrive.

### Changing settings later

Everything chosen during the import can be changed afterwards in the project's **Settings**:

| Section | What it holds |
|---|---|
| Build and Deployment | Framework preset, build, install, and output settings, root directory; each field has an Override switch |
| Environment Variables | Values available during the build (this site needs none) |
| Domains | The `*.vercel.app` address and any domain you own |
| Git | The production branch, and an optional command that decides whether a push should be built at all |

A settings change applies to the next deployment. To apply it right away without pushing, open
**Deployments**, click the ⋯ menu on the latest one, and choose **Redeploy**.

### After the first deploy

1. **Choose the address.** Settings → Domains lets you rename the `*.vercel.app` address or
   connect a domain you own.
2. **Finish the link preview.** The header comment of `index.html` lists the five tags that
   need the site's full address (`og:url`, `og:image`, and the image's size and alt text). Add
   each one to `<head>` as `<meta property="..." content="..." />` with the real address, then
   commit and push. To see the card, paste the address into LinkedIn Post Inspector
   (linkedin.com/post-inspector) or opengraph.xyz. Post Inspector also refreshes LinkedIn's
   cached copy after you change the image.
3. **Share the address:** LinkedIn (Contact info and Featured), the GitHub profile, and the CV
   header.

### If the build fails on Vercel

- Open the failed deployment and read the build log. A type error looks like
  `src/data/projects.ts(12,5): error TS2322: ...`: file, line, column. It is the same error
  `pnpm build` shows locally, so reproduce it there and fix it.
- **pnpm version.** Vercel picks the pnpm version from `pnpm-lock.yaml`, not from your laptop.
  A clean install with pnpm 10 (`--frozen-lockfile`, as Vercel runs it) followed by a build was
  tested with this lockfile in November 2026 and passed. If a future pnpm release breaks that,
  add `"packageManager": "pnpm@11.18.0"` to `package.json` and set the environment variable
  `ENABLE_EXPERIMENTAL_COREPACK=1` in the Vercel project settings. That fallback has not been
  tested.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| Blank page; the browser console says `album(): no photos found in ...` | The folder name in `album('...')` has a typo, or the folder is empty | Fix the folder name; the error message shows the path it looked in |
| `pnpm build` fails with `error TS...` in `src/data/` | A required field is missing or a value has the wrong type | Go to the file, line, and column in the message |
| You saved a file but the page still shows the old version | The dev server missed the change; some editors and tools replace the file instead of writing into it | Save the file again, or stop `pnpm dev` (Ctrl+C) and start it again |
| A photo shows sideways | The camera stored the rotation in EXIF instead of rotating the pixels | Run `pnpm photos`; it rotates photos upright before stripping EXIF |
| `pnpm photos` says `magick: command not found` | ImageMagick 7 is not installed | Install ImageMagick 7; version 6 ships `convert` instead of `magick` |
| The live site still shows the old version after a push | The deploy is still running, or the browser cached the page | Check the Vercel dashboard; reload with Ctrl+Shift+R |
