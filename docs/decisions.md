# Decisions

Why the site is built the way it is. Every entry gives the reason, the cost, and the
alternatives that were not chosen. A decision without its cost reads like an advertisement, and
knowing the cost is what tells you when to change your mind.

For how the code works, see [architecture.md](architecture.md).

## Contents

- [Stack](#stack): React, TypeScript, Vite, Tailwind CSS, pnpm, Oxlint, fonts, Vercel
- [Architecture](#architecture): static page, content as typed data, the outline, photos,
  file structure
- [Design](#design): layout, color, the rules against generic-looking design, motion
- [Left out on purpose](#left-out-on-purpose)

## Stack

### React 19

- **Why:** the page is made of repeated pieces (rows, cards, photo decks), and components fit
  that well. React is also the most widely used UI library, so the experience carries over to
  jobs and to other projects (Buddy and Minesweeper already use it).
- **Cost:** React adds most of the 76 kB (gzipped) of JavaScript, for a page that is mostly
  static text. The page also needs JavaScript to show anything at all.
- **Alternatives:** Astro would send almost no JavaScript and render the text as plain HTML, at
  the price of learning a second framework and splitting the interactive parts into "islands".
  Plain HTML with a little JavaScript would be lightest, but every list item would be copied by
  hand, which is exactly what the data files avoid.

### TypeScript 7 (strict)

- **Why:** content mistakes become build errors. A missing `period`, a misspelled field, or a
  `kind` that does not match its items stops `pnpm build`, the way a C compiler stops on a type
  mismatch, instead of producing a broken page. TypeScript 7 ships its compiler as a native
  binary for each platform, so type-checking the whole project is fast.
- **Cost:** a little syntax on top of JavaScript, and a type check step in every build.
- **Alternative:** plain JavaScript, where those mistakes show up only in the browser, possibly
  after deploying.

### Vite 8

- **Why:** the dev server starts instantly and updates the page on save; the production build
  (with Rolldown) produces a small static site. The whole configuration is two plugins in
  `vite.config.ts`.
- **Alternatives:** Next.js offers server rendering, routing, and API routes, none of which a
  one-page static portfolio uses, and it would tie the site more closely to a hosting setup.
  Create React App is deprecated.

### Tailwind CSS 4

- **Why:** styles sit next to the markup they affect, so a component is understood from one
  file. The spacing and color scales keep things consistent, the design tokens live in one
  `@theme` block, and only classes that are actually used end up in the CSS (23 kB). Version 4
  needs no separate config file.
- **Cost:** long class strings. Repeated ones are kept in `src/components/classes.ts`.
- **Alternative:** CSS Modules or plain CSS files: shorter markup, but every style lives in a
  second file and dead styles pile up unnoticed.

### pnpm

- **Why:** fast installs, a shared store that saves disk space across projects, and strict
  dependency resolution: code can only import packages listed in `package.json`, so nothing
  works by accident on one machine and breaks on another.
- **Alternative:** npm works too; pnpm was already the tool in the other projects.

### Oxlint

- **Why:** works with almost no configuration and runs in a fraction of a second. The rule that
  matters most here is `react/rules-of-hooks`, which catches hook mistakes that otherwise appear
  as confusing runtime bugs.
- **Cost:** fewer rules and plugins than ESLint. Nothing this project needs is missing.

### Fonts: Geist and Geist Mono from Google Fonts

- **Why:** Vercel's own typeface fits the Vercel-inspired look; the mono variant gives the
  metadata (dates, indexes, tags) a technical feel. Loading from Google Fonts needs no
  dependency.
- **Cost:** one request to a third party, and text appears in a fallback font for a moment
  before Geist loads (`display=swap`).
- **Alternative:** self-hosting the font files removes both costs, if they ever matter.

### Hosting: Vercel

- **Why:** detects Vite with no configuration, builds and publishes on every push to `main`,
  gives every other branch its own preview URL, serves from a worldwide CDN, and the Hobby plan
  is free. Buddy and Minesweeper are already hosted there.
- **Alternatives:** Netlify is equivalent. Cloudflare Pages is just as fast but takes a bit more
  setup. GitHub Pages has no preview deployments and needs a `base` path setting unless the site
  is `username.github.io`.

## Architecture

### One static page, no router, no backend

- **Why:** the content fits on one scrolling page, and anchor links (`#projects`) with smooth
  scrolling cover navigation. With nothing running on a server there is nothing to secure,
  patch, or pay for, and the host needs no rewrite rules.
- **When to change:** if a project ever needs its own page (a long write-up), add a router or
  move to a framework with file-based pages.

### Content as typed TypeScript data

- **Why:** the build checks the content against `src/types.ts`, the editor autocompletes field
  names, and the content's history is in git next to the code. The header comment at the top of
  each data file holds its sources and to-do notes.
- **Cost:** updating content means editing a file and pushing; there is no admin page.
- **Alternatives:** a CMS (Contentful, Sanity) adds an account, an API, and a dependency for a
  site with one author. JSON files cannot hold comments and get no type checking without extra
  tooling. Markdown fits long prose, which this site does not have.

### One `Experience` shape for five sections

- **Why:** achievements, certifications, teaching, organizations, and committees all consist of
  a role, an organization, a period, and optional details. One type means one row component and
  one way of writing entries.
- **Cost:** some field names fit loosely. For an achievement, `role` holds the award and `org`
  holds the organizer.

### The page outline as a tagged union (`src/sections.ts`)

- **Why:** the page structure is data, not markup. Adding a category is one line, and the menu,
  headings, and anchors follow automatically. Because `kind` is the tag of a union, pairing a
  layout with the wrong item type fails the build, and adding a new layout without handling it
  in `SectionBody` fails the build too.
- **Alternative:** one hand-written section per category in `App.tsx`. Simpler to read at first,
  but every new category means touching layout code and the menu separately.

### Photos in `src/assets/photos`, not `public/`

- **Why:** Vite only processes files it imports. In `src/assets`, `import.meta.glob` can list a
  folder at build time (so adding a photo needs no code change), every photo gets a content hash
  in its URL (so browsers cache it forever and still get replaced photos), and a missing folder
  fails loudly instead of showing a broken image.
- **Cost:** a typo in a folder name surfaces when the page loads in `pnpm dev`, not in
  `pnpm build`. That ceiling is noted in `photos.ts`.

### Photo processing as a shell script

- **Why:** `pnpm photos` (ImageMagick) shrinks large photos and strips EXIF once, before the
  photos are committed. The originals from a phone can be several megabytes and carry the GPS
  location of where they were taken. No build dependency is added.
- **Cost:** ImageMagick 7 must be installed. Photos stay JPEG at one size; there are no WebP
  versions or per-screen sizes, so the largest photo in the build is about 570 kB.
- **When to change:** if page weight becomes a problem, convert to WebP in the same script, or
  add a build plugin such as `vite-imagetools` for responsive sizes.

### Small files, documented at the top

- **Why:** each file has one responsibility, so a change has an obvious place. The header
  comment says what the file does, what it exports, and how to extend it; code lines carry no
  comments in between, so the code reads without interruption.
- **Cost:** more files to open. The reading order in [architecture.md](architecture.md#reading-order)
  is the map.

### An explicit scroll rule for the active menu item

- **Why:** `IntersectionObserver`, the usual tool, highlighted the wrong item at the top of the
  page because the About section is short. A three-line rule (top of page, bottom of page,
  otherwise the last section past 40% of the screen) is predictable and easy to test.
- **Cost:** it runs on every scroll event. It only measures a handful of elements, and React
  skips redrawing when the result is unchanged.

## Design

### Split layout with a sticky left column

The name, menu, and contact links stay visible while the content scrolls, so a visitor can
jump around and reach a contact link from anywhere. The pattern follows Brittany Chiang's
portfolio. On phones the menu gives way to sticky section headings.

### Monochrome, with no accent color

Pure black, four grays, and off-white text, after Vercel's palette. Without an accent, hierarchy
comes from size, weight, and brightness, and the photos supply the only color on the page.

### Tracklist rows and album cards

Lists are numbered rows with the date on the right, like a Spotify tracklist: easy to scan, and
the numbers make the list feel finite. Hikes and trips are cards with the photo on top, like
album covers, because there the photos are the content.

### Rules against generic-looking design

Set at the start of the project:

- 1px borders instead of shadows; no glassmorphism or gradient blobs.
- No emoji in headings, no skill bars or percentages: a "70% Python" bar measures nothing.
- Copy states facts ("for 85 participants"), not adjectives ("passionate", "innovative").
- Two typefaces only: Geist and Geist Mono.

Two effects were added later on request, the dust and the mouse spotlight. Both stay faint
(their strength is one variable each in `background.css`), cost no JavaScript on scroll, and
switch off for visitors who prefer reduced motion.

### Motion

Transitions only respond to the visitor (hover, click), last 150 to 300 ms, and every one has a
`motion-reduce:` counterpart. Nothing animates on its own while the page is idle.

## Left out on purpose

Each of these was considered and left out because it adds a dependency or complexity for a need
the site does not have yet:

| Left out | Reason | Add it when |
|---|---|---|
| Command palette (⌘K) | One page with a visible menu | The site grows to several pages |
| Light mode toggle | The design is black by intent | Visitors ask for it |
| Map of hikes | Needs a map library and tiles | There are enough hikes to make a map interesting |
| Blog | No posts yet | There are three or more posts ready |
| Contact form | Needs a backend or a third-party service; the Email pill covers it | Never, most likely |
| Analytics | A third-party script and a privacy notice | You want to know where visitors come from |
| Animation library | CSS transitions cover every motion on the page | A motion CSS cannot express |
| Live Codeforces rating | One more request to a third party on every visit, plus loading and error states | The rating changes often enough that editing one line is a burden |
