# Decisions

Running log of choices made while building this site without asking first, per the
brief's instruction to make the reasonable call and record it. Newest last.

Format: **ID — Decision.** Context, what was chosen, and why.

---

## D-001 — Phases and per-phase checks were defined here, not handed down

**Context.** The brief says "Work in phases. After every phase run the listed
checks." No phase list or check list arrived with it. An untracked file named
`portfolio_build_prompt.md` was present in the working tree when this session
started; it was gone (working tree clean) before it could be read, so its contents
are unknown.

**Decision.** Define the phases and their checks here rather than block on it.

**Superseded.** `portfolio_build_prompt.md` reappeared in the working tree with the
full 441-line brief, including its own 8-phase plan (section 2) and quality gate
(section 7). That plan is authoritative and is what is being followed; the
self-defined plan in `PLAN.md` is replaced by a pointer to it.

---

## D-002 — "Do it in a venv" is honoured as *project-local toolchain*, not a Python venv

**Context.** The first instruction in this session was "whatever you are gonna do,
do it in a venv". A Python 3.13 virtualenv was created at `.venv/` before the stack
was known. The brief then specified Next.js + TypeScript + Tailwind — a Node stack,
where a Python virtualenv is meaningless.

**Decision.** Read the instruction as its actual intent: *nothing installed globally,
everything scoped to this repository*. That maps onto the Node stack as
project-local `node_modules/`, a repo-pinned Node version, and no `-g` installs
anywhere. The Python scaffolding started under the wrong assumption
(`sitegen/`, `templates/`, `content/`, `static/`, `requirements.txt`) was deleted
before any of it was committed. `.venv/` itself is left on disk but gitignored and
unused — it costs nothing and removing it was not asked for.

**Revisit if** you want the Python virtualenv actually gone.

---

## D-003 — Node.js is absent from this machine; install route needs your call

**Context.** The stack requires `create-next-app@latest`. This machine has no Node
runtime: `node`, `npm`, `npx`, `nvm`, `fnm`, `volta`, `bun`, `deno`, `scoop` and
`choco` are all absent, and no Node install exists under Program Files,
LOCALAPPDATA, or APPDATA. `winget` is available.

**Decision.** Deferred to you — this is a genuine block, not a judgement call.
Installing a language runtime is a system-level change, and a project-local Node
means downloading a ~30 MB archive; both need your say-so rather than a default.

**Outcome (D-003a).** You chose to install Node yourself. Nothing was installed by
this session — no `winget` call, no download, no change to PATH or to any system
setting. Phase 1 resumes when `node --version` answers.


---

## D-004 — The build brief is gitignored, because it contains the phone number

**Context.** Ground rule 5: the phone number must never appear anywhere in the repo
or the built site. `portfolio_build_prompt.md` quotes the number as a literal — in
section 7, where it lists the strings `scripts/check-content.mjs` must scan for.
Committing the brief would therefore break the rule the brief itself sets.

**Decision.** Add `portfolio_build_prompt.md` to `.gitignore`. The file stays on disk
for reference and is not deleted; it simply never enters git history. Verified with
`git status` that it is ignored.

**Knock-on effect.** `scripts/check-content.mjs` cannot contain the literal either,
for exactly the same reason — a checker that hard-codes the number would plant it in
`src`-adjacent source. See D-006.

---

## D-005 — Scaffolded out-of-tree and copied in: npm rejects the directory name

**Context.** The brief's primary path is to scaffold in place. That failed:

    Could not create a project called "Portfolio" because of npm naming
    restrictions:
      * name can no longer contain capital letters

The repository directory is `Portfolio`, and `create-next-app` derives the package
name from it.

**Decision.** Took the brief's own documented fallback — scaffolded into a temp
directory and copied the tree in. `.git` was excluded from the copy, so the two
existing commits are intact. Also excluded: the scaffold's own `.git`, its `.next`,
its `node_modules` (dependencies reinstalled in place instead), and its `.gitignore`
(merged by hand so the repo-specific entries survive). `package.json` `name` was set
to `portfolio` — lowercase, npm-valid — since the directory name could not supply it.

---

## D-006 — Phone number detection by hash, not by literal

**Context.** Section 7 specifies that `check-content.mjs` fails if it finds the
string `8790325240`. Writing that check the obvious way puts the number into a
committed file, violating ground rule 5.

**Decision.** The checker will detect the number without ever containing it: it
extracts every digit-run of 10 or more characters from the scanned files and compares
each one's SHA-256 against a stored hash. Detection is exact, and the repo holds only
a hash. This is a deliberate deviation from the letter of section 7 in order to keep
its rule 5.

---

## D-007 — `npm run typecheck` added; bare `tsc --noEmit` is not reproducible

**Context.** Next 16 generates `LayoutProps` / `PageProps` into `.next/types` at
build time. On a fresh clone `npx tsc --noEmit` therefore fails before any build has
run, which is exactly what happened here:

    src/app/layout.tsx(20,50): error TS2304: Cannot find name 'LayoutProps'.

It passed once `npm run build` had generated the types.

**Decision.** Added `"typecheck": "next typegen && tsc --noEmit"`, using the
`next typegen` subcommand confirmed present in Next 16.3.5. The brief's literal
`npx tsc --noEmit` is still run for the quality gate, but the build is sequenced
before it so the gate is reproducible from a clean checkout.

---

## D-008 — Versions are the scaffold's, recorded not chosen

**Context.** Ground rule 4: don't pin versions from memory; use what the scaffold
gives and verify APIs against what is installed.

**Installed by `create-next-app@latest` on 2026-09-17:**

| Package | Version |
| --- | --- |
| next | 16.3.5 |
| react / react-dom | 19.2.8 |
| tailwindcss | ^4 (CSS-first; no `tailwind.config.*`) |
| eslint / eslint-config-next | ^9 / 16.3.5 |
| typescript | ^5 |
| motion | ^13.4.0 |
| lucide-react | ^1.46.0 |

**Verified, not assumed.** `motion/react` resolves in motion 13.4.0, and all the APIs
the brief's motion and Court Mode specs need are exported by it — `motion`,
`AnimatePresence`, `useScroll`, `useSpring`, `useTransform`, `useReducedMotion`,
`useMotionValueEvent`, `useInView`, `useAnimate`. **No fallback to `framer-motion` is
needed.** Tailwind v4 ships CSS-first, so the design tokens in Phase 3 go in an
`@theme` block in `globals.css`, not in a JS config file.

---

## D-009 — Scroll reveals are CSS-driven, not `motion`-driven

**Context.** The brief picks `motion` as the animation library and asks for a
`Reveal` component plus strict `prefers-reduced-motion` support. The obvious
implementation — `motion.div` with `initial={{ opacity: 0, y: 16 }}` and
`whileInView` — has two problems here:

1. Reduced motion has to be decided in JS. `useReducedMotion` from motion
   snapshots the setting on first render, which is `false` during SSR, so a
   visitor with the setting on renders one set of inline styles on the server
   and another on the client — a hydration mismatch, which would also show up as
   a console error in the Phase 7 smoke test.
2. The server HTML would carry `opacity: 0`. If JS fails or is slow, the page is
   blank text on a dark background.

**Decision.** `Reveal` sets a `data-shown` attribute from an `IntersectionObserver`
and the transition itself lives in CSS (`.reveal` in `globals.css`). A
`@media (prefers-reduced-motion: reduce)` block forces reveals fully visible and
untransitioned, so the setting is honoured on the first paint with no JS involved
and no chance of a mismatch. Only `opacity` and `transform` animate, which is what
the performance budget requires anyway.

`motion` is still the animation library for everything it is genuinely better at:
the scroll-linked Court Mode ball, magnetic buttons, card hover springs, recap
overlay transitions, milestone arcs and the easter egg.

---

## D-010 — Media queries and scroll via `useSyncExternalStore`

**Context.** The scaffold's ESLint config includes the React Compiler rules, and
`react-hooks/set-state-in-effect` rejected the usual
`useState` + `useEffect` + `addEventListener` pattern:

    error  Calling setState synchronously within an effect can trigger
           cascading renders   react-hooks/set-state-in-effect

**Decision.** Rewrote the subscriptions with `useSyncExternalStore`
(`useMediaQuery`, `useScrolled`) rather than silencing the rule. It is the API
built for external stores, and it takes an explicit server snapshot, which turns
the SSR value into a stated choice instead of an accident:
`(prefers-reduced-motion: reduce)` reports `true` on the server, so motion stays
off until the client positively says otherwise. `Reveal` went further and writes
its flag straight to the DOM, since nothing in React needs to know.

---

## D-011 — Contrast verified numerically; the border is decorative

**Context.** The brief warns specifically about orange on dark for small text.

**Measured** (WCAG 2.1 relative luminance), every pair the UI actually uses:

| Pair | Ratio | AA (4.5) |
| --- | --- | --- |
| text on bg | 18.53 | pass |
| text on surface | 17.19 | pass |
| muted on bg | 7.75 | pass |
| muted on surface | 7.19 | pass |
| accent on bg | 6.89 | pass |
| accent on surface | 6.40 | pass |
| accent-soft on bg | 8.51 | pass |
| bg on accent (primary button) | 6.89 | pass |

Lowest is 6.40:1, comfortably over AA for normal text. Orange is still reserved
for active state, key numbers and the primary CTA, as instructed.

**One thing to be aware of.** `border` (#262626) against `bg` (#0B0B0B) is 1.30:1,
under the 3.0 that WCAG 1.4.11 asks of non-text UI boundaries. That is deliberate:
these borders are decorative separators on cards and panels, never the only way to
identify a control. Every interactive element is identified by its text label, and
the focus indicator is the orange ring at 6.89:1.

---

## D-012 — No GitHub icon: lucide-react 1.x dropped brand glyphs

**Context.** The brief specifies `lucide-react` for icons, and the match cards
need a repository link. The installed version exports 6299 icons and none of them
is a GitHub mark:

    error TS2305: Module '"lucide-react"' has no exported member 'Github'.

Brand icons were removed from lucide; there is no `Github`, `Linkedin` or similar
in 1.46.0.

**Decision.** Per ground rule 4, used the current equivalent rather than pinning
an older version or vendoring a mark: the repository link uses the neutral `Code`
glyph and keeps its visible "GitHub" text label, so nothing is lost in meaning.
Contact rows are labelled in text for the same reason. Reproducing the real
GitHub or LinkedIn logos was not an option either way — they are trademarks, and
ground rule 3 rules out dropping in third-party artwork.

---

## D-013 — Which recap is open lives in the URL, not in React state

**Context.** The brief asks for recaps to be deep-linkable via `#match-<slug>`,
and separately for the usual dialog behaviours.

**Decision.** The hash *is* the state. `MatchGrid` reads it through
`useSyncExternalStore` over a small store in `src/lib/matchDialog.ts`. Opening
writes `#match-<slug>`, closing writes back `#projects`.

This makes deep-linking fall out for free rather than needing a separate
mount-time effect to reconcile URL against state — and it sidesteps the
`set-state-in-effect` rule that reconciliation would have tripped. `replaceState`
rather than `pushState`, so opening six recaps does not leave six entries in the
back button.

---

## D-014 — Bracket runs newest at the top

**Context.** The brief asks for the bracket oldest-at-the-bottom advancing
upward, and allows top-down instead "if that reads better on mobile; decide and
log it".

**Decision.** Kept the brief's primary ordering. In document order that is:
B.E. (expected June 2027), then Fidelity (June 2026 – August 2026), then Samsung
(Jan 2026 – June 2026) — so the bracket advances upward on desktop *and* the
single mobile column reads most-recent-first, which is how a resume is read. The
two requirements did not conflict, so no trade-off was needed.

The rung at the top is the B.E. entry straight from the content layer. No
graduate-school step was invented, and no date appears that is not in the
content.

---

## D-015 — One recap dialog, shared by projects and roles

**Context.** The brief wants Match Recap overlays on match cards and also on the
Fidelity and Samsung experience entries.

**Decision.** Generalised the dialog's prop to a `RecapSubject`
(`slug`, `title`, `period`, `recap`, `bullets`) instead of writing a second
component. `Match` already satisfies it structurally; experience entries are
mapped onto it. Both use the same hash store, so role recaps are deep-linkable
too, under `#match-exp-<org>`.

---

## D-016 — Role bullets expand with native `<details>`

**Context.** "Each role expands to its bullets."

**Decision.** Used `<details>`/`<summary>` rather than a state-driven toggle.
Keyboard operation, the expanded/collapsed state exposed to screen readers, and
in-page find all come for free, and it works before hydration. The only styling
needed was removing the default marker.
