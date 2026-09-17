# Build plan

Phases for building this portfolio. Recorded here because the brief asked for phased
work but the phase list itself never arrived (`DECISIONS.md` D-001).

**Every phase ends with the same four gates**, then a commit. A phase is not done
until all four pass:

| Gate | Command |
| --- | --- |
| Typecheck | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Production build | `npm run build` |
| Phase acceptance | listed per phase below |

---

### Phase 0 — Foundation *(in progress)*

Repo hygiene and the decision/TODO logs, before any code.

*Acceptance:* `.gitignore` covers Node/Next/Vercel; `DECISIONS.md`, `TODO.md` and
this file exist; no scaffolding from an abandoned stack remains.

### Phase 1 — Scaffold

`create-next-app@latest` (App Router, TypeScript, Tailwind, ESLint, `src/`), then
`motion` and `lucide-react`, then the three Google fonts via `next/font/google`
(Barlow Condensed, Inter, JetBrains Mono).

*Acceptance:* dev server serves a page; all three fonts load as CSS variables;
installed versions of every library recorded in `DECISIONS.md`.

### Phase 2 — Content model

`src/content/site.ts` — the single source of truth. Every field explicitly typed,
every unknown field `null`. Components read from it and never hard-code a fact.

*Acceptance:* types compile; a grep for stray literals finds no facts outside
`site.ts`; every `null` field has a `TODO.md` line.

### Phase 3 — Design system

Dark palette, type scale across the three fonts, spacing, and the hand-drawn SVG
primitives (court lines, ball, feather, bird silhouette) — all original simple
geometry, no third-party or referenced artwork.

*Acceptance:* renders correctly at 375 / 768 / 1440 px with no horizontal scroll;
contrast meets WCAG AA.

### Phase 4 — Sections

Hero, about, projects, skills, experience, contact (`mailto:` compose). Each section
unmounts entirely when its backing data is `null` — no empty shells, no "coming soon".

*Acceptance:* a section with `null` data renders nothing; landmarks, heading order
and alt text all present; keyboard navigable.

### Phase 5 — Motion

Scroll and hover motion via `motion/react`, tuned to read as premium rather than
busy. `prefers-reduced-motion` fully respected.

*Acceptance:* no layout shift from animation; with reduced motion on, content is
immediately visible and static.

### Phase 6 — SEO and polish

Metadata API, Open Graph image, favicon, `sitemap.ts`, `robots.ts`, 404 page.

*Acceptance:* every route has title/description/OG tags; sitemap and robots resolve.

### Phase 7 — Ship

README with local-dev and deploy instructions, Vercel settings, final pass.

*Acceptance:* clean install from a fresh clone builds; deploy steps written for you
to connect the repo yourself.
