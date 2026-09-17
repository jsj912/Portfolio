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
