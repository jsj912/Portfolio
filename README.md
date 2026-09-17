# Portfolio

Personal portfolio site for Joan Sara Joe — a single-page, volleyball-inspired
dark site covering projects, research, experience and contact.

Built with Next.js (App Router) and TypeScript, Tailwind CSS v4, `motion` for
animation and `lucide-react` for icons. No backend, no database, no CMS, no
analytics, no environment secrets. The contact form composes a `mailto:` link
rather than posting anywhere.

---

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generates route types, then `tsc --noEmit` |
| `npm run check:content` | Content guard — see below |
| `npx playwright test` | Browser smoke tests |

### A note on typechecking

Next generates `PageProps` / `LayoutProps` into `.next/types` during a build, so
a bare `npx tsc --noEmit` fails on a fresh clone before anything has been built.
`npm run typecheck` runs `next typegen` first and works from a clean checkout.

### `npm run check:content`

Fails the build if anything that must not ship has crept in: the private phone
number, placeholder text (`lorem`, `example.com`, `your-`, `Coming soon`, stray
`TODO`s), protected words, or an external URL that is not on the allowlist. It
scans `src/`, `public/` and the rendered build output, so run it after
`npm run build` to have the output checked too.

### Playwright

```bash
npx playwright install chromium   # first time only
npx playwright test
```

The tests run against a real production build on port 3100 — the config builds
and starts the server itself, so no server needs to be running first. Full-page
screenshots at 375, 768 and 1440 land in `test-results/screens/`.

---

## Editing the content

**Everything factual on this site lives in one file: `src/content/site.ts`.**
Components read from it and hard-code nothing, so changing anything there
changes the site — no component edits needed.

It holds `profile`, `education`, `experience`, `matches` (the projects),
`publications`, `awards`, `statLines`, `skills` and `leadership`, all typed.

Two rules the codebase relies on:

- **Anything unknown is `null`, never a placeholder.** A `null` link renders no
  button; a `null` venue renders no line. Filling the value in makes the element
  appear on its own. Every `null` is listed in [TODO.md](TODO.md).
- **Numbers render exactly as written.** The count-up animation lands on the
  literal string, so `"0.932"` stays `"0.932"` and never rounds to `"0.93"`.

The phone number is deliberately absent and must stay that way —
`npm run check:content` fails if it ever appears.

### Adding your resume

Drop the PDF at exactly `public/resume.pdf`. The build checks for that path: when
it exists, the "Download Resume" button appears in the hero and a "Resume" button
in the nav. When it does not, both are hidden rather than linking to a 404.

---

## Deploying to Vercel

1. Sign in to Vercel with GitHub, **Add New → Project**, import the `Portfolio`
   repo, keep the detected Next.js settings, and **Deploy**.
2. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the production URL in
   **Project Settings → Environment Variables**, then redeploy so the sitemap,
   canonical URL and Open Graph tags point at the real domain instead of the
   `http://localhost:3000` fallback.
3. Every push to the default branch redeploys automatically.

---

## Project structure

```
src/app/            layout, page, not-found, opengraph-image, sitemap, robots, globals.css
src/components/     ui/ court/ sections/ match/ layout/ effects/
src/content/        site.ts — the single source of truth
src/hooks/          useActiveSection, useKeySequence, useReducedMotionSafe, useMediaQuery, useScrolled
src/lib/            utils, mailto, sections, resume, siteUrl, matchDialog
scripts/            check-content.mjs
tests/              smoke.spec.ts
```

## Accessibility and motion

Semantic landmarks, one `h1`, ordered headings, a skip-to-content link, visible
orange focus rings, 44px touch targets, and AA contrast throughout (the lowest
pair in use measures 6.40:1).

`prefers-reduced-motion` is respected everywhere. Scroll reveals are CSS-driven
so the media query decides before hydration rather than after; drifting
particles, the feathers, the bird, the loading overlay and the easter egg are
all removed outright rather than merely sped up.

---

Design and implementation decisions, including the ones that deviate from the
original spec and why, are recorded in [DECISIONS.md](DECISIONS.md).
