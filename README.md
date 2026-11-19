# portoburu

Personal portfolio of Frenaldy Bestabba Hasugian: one static page with projects, achievements,
experience, and hiking and travel photos. Black, minimal, and data driven. All content lives in
typed files under `src/data/`, so updating the site means editing data, not components.

Built with React 19, TypeScript 7, Vite 8, and Tailwind CSS 4. Hosted on Vercel.

## Quick start

Requirements: Node.js 24, pnpm 11, and ImageMagick 7 (only for `pnpm photos`).

```bash
pnpm install   # once, after cloning
pnpm dev       # http://localhost:5173, updates on every save
```

## Scripts

| Command | What it does | When to run it |
|---|---|---|
| `pnpm dev` | Local server; the page updates when you save a file | While editing |
| `pnpm build` | Type-checks (`tsc`), then builds the static site into `dist/` | Before every commit |
| `pnpm lint` | Oxlint: catches React hook mistakes and suspicious code | Before every commit |
| `pnpm preview` | Serves the built `dist/` at http://localhost:4173 | To check a production build |
| `pnpm photos` | Shrinks photos over 1600px and strips EXIF metadata (including GPS) | After adding photos |

## Project map

```
index.html              page shell: title, favicon, fonts
public/                 copied as-is to the site root (favicon.svg, og.png link preview image)
scripts/                optimize-photos.sh (`pnpm photos`), og-image.html (source of og.png)
src/
  main.tsx              entry point: mounts <App />
  App.tsx               layout: sticky header on the left, content on the right
  sections.ts           page outline: which data, in which order, with which layout
  types.ts              the shape of every data file
  photos.ts             album(): turns a photo folder into a list of images
  data/                 THE CONTENT: this is the folder you edit
  components/           UI pieces, one job per file
  hooks/                useActiveSection: which menu item is highlighted
  assets/photos/        photos, one folder per activity
  assets/dust/          the background dot tiles
  index.css             design tokens (colors, fonts) and base styles
  background.css        dust parallax and mouse spotlight
docs/
  guide.md              operating manual
  architecture.md       how the code works
  decisions.md          why it is built this way
```

## Documentation

- [Operating guide](docs/guide.md): step-by-step recipes for every kind of content change,
  deploying, and troubleshooting.
- [Architecture](docs/architecture.md): a guided tour of the code in reading order, with the
  React and Tailwind basics needed to follow it.
- [Decisions](docs/decisions.md): why each tool and pattern was chosen, what it costs, and what
  was left out on purpose.

Every source file also opens with a header comment that says what the file does and how to
extend it.
