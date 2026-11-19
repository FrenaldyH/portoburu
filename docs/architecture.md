# Architecture

How the site works, explained in the order worth reading the code. Written for someone who
knows C or C++ and is new to React and Tailwind, so it starts with the minimum of both and uses
C analogies where they fit. For changing content without reading code, use
[guide.md](guide.md). For why things were chosen, see [decisions.md](decisions.md).

## Contents

1. [The big picture](#the-big-picture)
2. [From source to website: the build](#from-source-to-website-the-build)
3. [React in five ideas](#react-in-five-ideas)
4. [Tailwind in five ideas](#tailwind-in-five-ideas)
5. [Reading order](#reading-order)
6. [Data, types, and the page outline](#data-types-and-the-page-outline)
7. [Layout](#layout)
8. [Components, one by one](#components-one-by-one)
9. [How the interactive parts work](#how-the-interactive-parts-work)
10. [Accessibility built in](#accessibility-built-in)
11. [Extending the code](#extending-the-code)
12. [Exercises](#exercises)

## The big picture

The site is **one static page**. There is no server code and no database: the content in
`src/data/` is compiled into the JavaScript bundle at build time, the same way a C program's
string constants end up inside its binary.

Data flows in one direction, from data files down to small components:

```
src/data/*.ts  ->  sections.ts  ->  App.tsx  ->  GroupSection  ->  SectionBody  ->  Row / TripCard  ->  PhotoStack  ->  Lightbox
 the content       the outline      the layout   one group        picks layout     one item           photo deck      full-size viewer

src/data/profile.ts  ->  Header (Nav, ContactLinks, EmailPill) and About
```

No component reaches back up or edits data. To find where something on the screen comes from,
follow the arrows backwards.

## From source to website: the build

| Step | Tool | What it does | C analogy |
|---|---|---|---|
| Type check | `tsc` (TypeScript 7) | Checks every file against the types; writes no output (`noEmit`) | `gcc -fsyntax-only -Werror` |
| Bundle | `vite build` (Vite 8, using Rolldown) | Follows every `import` from `src/main.tsx`, drops unused code, minifies, and writes one JS file, one CSS file, and the photos | Compile and link into one binary |
| CSS | Tailwind plugin | Scans the source for class names and generates CSS only for the ones used | Dead-code elimination for styles |
| Photos | `import.meta.glob` in `photos.ts` | Lists the photo files and copies them with a content hash in the name | A table generated at compile time |

`pnpm build` runs both steps (`tsc && vite build`). The `&&` means the bundle is only built if
the type check passes. The result in `dist/` (November 2026): `index.html`, about 243 kB of JS
(76 kB gzipped, mostly React itself), about 23 kB of CSS (6 kB gzipped), and the photos.

`pnpm dev` works differently. Vite does not bundle; it serves each source file to the browser
on request, translating TypeScript and JSX on the fly. When you save a file, it pushes just that
module to the open page (Hot Module Replacement), which is why the page updates without
reloading. `pnpm dev` does not type-check; only `pnpm build` does.

File names in `dist/` carry a content hash, such as `index-HL5C5AOA.js`. When a file changes,
its name changes, so browsers can cache files forever and still never show a stale version.

## React in five ideas

Enough React to read every file here:

1. **A component is a function that returns markup.** The markup is JSX, which looks like HTML
   inside JavaScript. `<Row title="CertSend" />` calls the function `Row` with
   `{ title: 'CertSend' }`. Component names start with a capital letter.
2. **Props are the function's arguments.** They are read-only. A parent passes data down
   through props; a child never changes them.
3. **State is a variable that redraws the component when it changes.**
   `const [copied, setCopied] = useState(false)` gives a value and a setter. Calling
   `setCopied(true)` re-runs the component function, and React updates only the parts of the
   page that changed.
4. **Effects connect to the world outside React.** `useEffect(() => { ... }, [deps])` runs after
   the component is drawn: adding event listeners, calling browser APIs. The function it returns
   is the cleanup, run before the effect runs again or when the component disappears (like a
   destructor). `[deps]` lists the values that make it run again.
5. **Lists use `.map()` with a `key`.** `items.map((item) => <Row key={item.title} ... />)`. The
   key lets React tell which item is which when the list changes.

Only three places in this codebase hold state: `PhotoStack` (current photo, open viewer),
`EmailPill` ("Copied"), and `useActiveSection` (active menu item). `Lightbox` has none of its
own: `PhotoStack` passes it the open photo and a function to change it. Everything else is a
pure function: same data in, same markup out.

## Tailwind in five ideas

Styling is done with Tailwind classes written directly on the elements:

1. **One class, one CSS rule.** `mt-4` is `margin-top: 1rem`; `text-sm` sets the font size;
   `rounded-md` rounds corners. The design tokens in `src/index.css` (`@theme`) become classes
   too: `--color-muted` gives `text-muted`, `bg-muted`, `border-muted`.
2. **Responsive prefixes, mobile first.** A class without a prefix applies at every width.
   `sm:` applies from 640px, `md:` from 768px, `lg:` from 1024px. So `lg:sticky` means "sticky
   on desktop only", and the phone layout is the one written without prefixes.
3. **State prefixes.** `hover:`, `focus-visible:`, and `group-hover:`. The last one styles a
   child when a parent marked `group` is hovered. Named groups such as `group/email` keep
   nested groups apart.
4. **Preference prefixes.** `motion-reduce:` and `motion-safe:` follow the visitor's operating
   system setting for reduced motion. `pointer-fine:` matches devices with a mouse or trackpad.
5. **Arbitrary values in brackets.** `w-[42%]` or `grid-cols-[1.75rem_1fr_auto]` (underscores
   stand for spaces) when the built-in scale has no fitting value.

Class strings used by several components live in `src/components/classes.ts`, so the same kind
of element always looks the same.

## Reading order

Each file starts with a header comment; read it first, then the code.

1. `index.html`: the page shell. React draws everything inside `<div id="root">`.
2. `src/main.tsx`: the entry point, the equivalent of `main()`.
3. `src/App.tsx`: the page layout.
4. `src/types.ts`: the shape of all content. Think of it as the header file.
5. `src/data/*.ts`: the content itself. Skim one or two.
6. `src/sections.ts`: how data files become the page outline and the menu.
7. `src/components/GroupSection.tsx` → `SectionBody.tsx` → `Row.tsx` → `TripCard.tsx`: from
   a group down to a single item.
8. `src/components/PhotoStack.tsx` → `Lightbox.tsx`: the photo deck and the viewer.
9. `src/components/Header.tsx` → `Nav.tsx` → `src/hooks/useActiveSection.ts` →
   `ContactLinks.tsx` → `EmailPill.tsx`, then `About.tsx`: the left column.
10. `src/photos.ts`: how photo folders become image lists.
11. `src/index.css`, `src/background.css`, `src/components/Spotlight.tsx`: styling and the
    background effects.
12. `scripts/optimize-photos.sh`: the photo pipeline.

## Data, types, and the page outline

**Types (`src/types.ts`).** Six types describe all content: `Image`, `Social`, `Profile`,
`Project`, `Trip`, and `Experience`. A `?` marks an optional field. `Experience` is shared by
five sections (achievements, certifications, teaching, organizations, committees) because they
all have the same parts: a role, an organization, a period, and optional details.

**The outline (`src/sections.ts`).** The `sections` array lists what appears on the page, in
order:

```ts
{ group: 'Experience', title: 'Teaching & Lab', kind: 'experience', items: teaching },
```

The `Section` type is a *discriminated union*, the TypeScript version of a C tagged union:

```ts
type Section =
  | { group: string; title: string; kind: 'project'; items: Project[] }
  | { group: string; title: string; kind: 'experience'; items: Experience[] }
  | { group: string; title: string; kind: 'trip'; items: Trip[] }
```

`kind` is the tag. When code checks `section.kind === 'trip'`, TypeScript knows `items` is
`Trip[]` inside that branch, so a mismatched pair fails the build instead of breaking the page.

**Groups.** `Map.groupBy` bundles sections that share a `group` name, keeping the order in which
each group first appears. Each group becomes one menu item and one heading. `slug()` turns titles
into anchor ids: `"Teaching & Lab"` becomes `teaching-lab`, so `#teaching-lab` jumps there.

## Layout

`App.tsx` sets up two columns on desktop and one on phones:

- **Desktop (from 1024px):** a centered container (`max-w-6xl`) with `flex`. The `Header` takes
  42% of the width and is `sticky top-0 h-screen`: it stays in place while `<main>` (54%)
  scrolls. Its content is spread with `justify-between`, so the contact pills sit at the
  bottom. This layout follows Brittany Chiang's portfolio.
- **Phones:** the header comes first, then the content. The menu (`Nav`) is hidden; instead,
  each group heading sticks to the top of the screen while its section scrolls past
  (`groupHeadingClass`), so you always know where you are.

A "Skip to content" link sits first in the page. It is invisible until a keyboard user presses
Tab, and lets them jump past the header.

## Components, one by one

| File | Job | State | Worth noticing |
|---|---|---|---|
| `App.tsx` | Page layout | none | Never changes when content is added |
| `Header.tsx` | Left column | none | Name doubles as a "back to top" link (`href="#"`) |
| `Nav.tsx` | Section menu | via hook | Built from `groups`, so new groups appear automatically |
| `ContactLinks.tsx` | Contact pills | none | Socials, then Email, then Resume if set |
| `EmailPill.tsx` | Email pill | `copied` | Label swap is pure CSS; only "Copied" uses state |
| `About.tsx` | About text and skills | none | Heading visible on phones only |
| `GroupSection.tsx` | One group | none | Subheadings and anchors only when a group has several sections |
| `SectionBody.tsx` | Picks the layout | none | `switch` on `kind` with a checked return type |
| `Row.tsx` | One numbered row | none | Grid of 2 columns on phones, 3 from 640px |
| `TripCard.tsx` | One photo card | none | Joins elevation and location with ` · ` |
| `PhotoStack.tsx` | Photo deck | `current`, `open` | Crossfade without any animation library |
| `Lightbox.tsx` | Full-size viewer | none (controlled by `PhotoStack`) | Native `<dialog>` |
| `Spotlight.tsx` | Mouse light | none | Writes CSS variables, never re-renders |
| `classes.ts` | Shared class strings | none | Not a component; plain constants |

`SectionBody` turns each data item into the props `Row` expects (`fromProject`,
`fromExperience`). This keeps `Row` independent of the data types: it only knows titles, tags,
and links. Projects get `Code`, `Live`, and `Video` links; an experience link is labeled with
its domain using the browser's `URL` parser.

## How the interactive parts work

### The active menu item (`useActiveSection`)

On every scroll and resize, the hook measures where each section's top edge is and applies
three rules:

1. Scrolled to the very top: the first section (About).
2. Scrolled to the very bottom: the last section, because a short last section may never
   reach the line in rule 3.
3. Otherwise: the last section whose top edge has passed 40% of the screen height.

The more common tool for this, `IntersectionObserver` ("tell me when an element enters the
screen"), was tried first. It picked the wrong item at the top of the page because About is
short, so the hook uses the explicit rule instead. Calling `setActive` with an unchanged value
does not redraw anything, so running it on every scroll event is cheap.

### The photo deck (`PhotoStack`)

- **The deck look.** Up to two copies of the next photos sit behind the front one, each moved
  up (`-translate-y`), narrowed (`scale-x`), and darkened (`brightness`). On hover they move
  up further, which reads as the deck spreading.
- **The crossfade.** Every photo of the deck is in the frame at once, stacked on top of each
  other (`absolute inset-0`). Only the current one has `opacity-100`; the rest are
  `opacity-0`. Clicking changes `current`, and because opacity has a CSS transition, the
  browser fades the old photo out and the new one in at the same time. No animation library
  and no timers.
- **Loading.** `loading="lazy"` tells the browser not to download a photo until it is near the
  screen; `decoding="async"` decodes it off the main thread.
- **Screen readers.** Hidden photos have empty `alt` and `aria-hidden`, so a screen reader
  hears only the front photo's description, which includes "(photo 2 of 4)". The dots are
  hidden from it for the same reason.

### The viewer (`Lightbox`)

Built on the browser's own `<dialog>` element. `showModal()` gives, for free, the dark
backdrop, Esc to close, and a focus trap: Tab cycles inside the dialog instead of escaping to
the page behind. React state and the dialog are kept in sync in both directions:

- state to dialog: an effect calls `showModal()` or `close()` when `index` changes;
- dialog to state: the `onClose` event sets `index` back to `null`, which also covers Esc.

While a dialog is open, the CSS rule `html:has(dialog[open]) { overflow: hidden }` stops the
page behind it from scrolling.

### The email pill (`EmailPill`)

Both labels ("Email" and the address) are always in the markup; CSS shows one or the other
with `group-hover/email:` and `group-focus-visible/email:`. Clicking calls
`navigator.clipboard.writeText` and shows "Copied" for two seconds. If the browser refuses the
clipboard, it falls back to a `mailto:` link. A visually hidden element with `role="status"`
makes screen readers announce "Copied to clipboard".

### The spotlight (`Spotlight`)

A `pointermove` listener writes the mouse position into two CSS variables on `<html>`
(`--spot-x`, `--spot-y`). A full-screen element behind the content paints a
`radial-gradient` centered on those variables (`.spotlight` in `background.css`). Storing the
position in React state would redraw the component around 60 times a second; CSS variables
update the paint without React being involved at all. It is hidden on touch devices and for
visitors who prefer reduced motion.

### The dust parallax (`background.css`)

Two tiles of tiny dots (`src/assets/dust/near.svg` and `far.svg`) are painted by
`body::before` and `body::after`, which are pseudo-elements: extra boxes that CSS can draw
without any markup.

- The far layer is `position: fixed`: it stays still while you scroll.
- The near layer is `position: absolute` over the whole page: it scrolls with the content.

One layer moving and the other not reads as depth. There is no JavaScript involved, so it costs
nothing on scroll. The two tiles have different sizes (389px and 607px), which makes the
repetition hard to spot. With reduced motion, both layers scroll together.

### The photo pipeline (`photos.ts` and `scripts/optimize-photos.sh`)

`import.meta.glob('./assets/photos/**/*.{jpg,...}', { eager: true })` is replaced at build
time by an object mapping every matching path to its final URL. `album(folder, alt)` filters
that object by folder, sorts numerically, and returns `Image[]`. Because the list is built
from the file system, adding a photo to a folder needs no code change.

`optimize-photos.sh` runs separately, before committing photos. For every image with a long
side over 1600px or with EXIF metadata, ImageMagick rotates it upright, removes the metadata,
and shrinks it to fit 1600 by 1600. Already processed photos are skipped, so JPEG quality does
not degrade with repeated runs.

## Accessibility built in

- Landmarks: `header`, `nav`, `main`, `section`, with headings in order (h1 → h2 → h3 → h4).
- A skip link, and a visible focus ring for keyboard users (`:focus-visible` in `index.css`).
- `aria-current` on the active menu item.
- `alt` is a required field of `Image`, so a photo without a description fails the build.
- Every transition has a `motion-reduce:` counterpart, and the spotlight and parallax switch off
  for reduced motion.
- `role="status"` for the copy confirmation, so it is announced, not just shown.

## Extending the code

### Add a new category

No code changes if an existing layout fits: one data file and one line in `sections.ts`. The
steps are in [guide.md](guide.md#add-a-new-category).

### Add a new layout

Example: a `talk` layout for talks and presentations.

1. Add the item type to `src/types.ts`, for example `Talk = { title; event; date; slidesUrl? }`.
2. Add a member to the `Section` union in `src/sections.ts`:
   `| { group: string; title: string; kind: 'talk'; items: Talk[] }`.
3. Run `pnpm build`. It now fails in `SectionBody.tsx`, because the `switch` no longer covers
   every `kind` and the function promises to return `JSX.Element`. This is intentional: the
   compiler gives you the to-do list, like `-Wswitch` in C.
4. Add `case 'talk':` to `SectionBody`, either mapping talks onto `Row` (often enough) or
   rendering a new component in `src/components/`.
5. Add the data file and a line in `sections`, as for any category.

### Conventions to keep

- One responsibility per file; the largest component is about 120 lines.
- Documentation goes in the header comment at the top of each file, not between code lines.
- No new dependency for something a few lines of code or a browser feature can do.

## Exercises

Short ways to see the mechanisms above for yourself. Undo each change afterwards.

1. **Data drives the page.** Copy one project in `projects.ts` and change its title. Watch it
   appear in `pnpm dev`, numbered automatically.
2. **Types catch mistakes.** Delete `year` from a project and run `pnpm build`. Read the error:
   it names the file, the line, and the missing field.
3. **The tagged union.** In `sections.ts`, change the Hiking line to `kind: 'project'`. Run
   `pnpm build` and read why `Trip[]` is not accepted.
4. **CSS variables.** In `background.css`, set `--spot-strength` to `0.2` and move the mouse.
5. **Responsive classes.** In `Header.tsx`, remove `lg:sticky` and scroll on a wide screen.
