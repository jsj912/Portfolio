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

**Decision.** Define the phases and their checks here rather than block on it. The
plan is recorded in `PLAN.md` and each phase ends with: typecheck, lint, production
build, and the phase's own acceptance checks — then a commit.

**Revisit if** the original prompt file resurfaces and its phases differ.

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
See the question raised at the end of the phase-0 report.

**Revisit** once the install route is chosen; record the outcome as D-003a.
