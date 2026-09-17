"use client";

import { ChevronDown } from "lucide-react";
import { useCallback, useRef, useSyncExternalStore } from "react";

import { MatchRecap, type RecapSubject } from "@/components/match/MatchRecap";
import { Reveal } from "@/components/ui/Reveal";
import type { Education, Experience } from "@/content/site";
import {
  closeMatchDialog,
  getOpenMatchSlug,
  getServerMatchSlug,
  openMatchDialog,
} from "@/lib/matchDialog";
import { subscribeMatchDialog } from "@/lib/matchDialog";

/** A rung on the bracket: either a role, or the degree it leads to. */
type Rung =
  | { kind: "role"; entry: Experience; slug: string }
  | { kind: "milestone"; entry: Education };

type TournamentBracketProps = {
  experience: Experience[];
  degree: Education;
};

const slugFor = (org: string) =>
  `exp-${org.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

/**
 * Bracket-style progression, oldest at the bottom advancing upward.
 *
 * That is the brief's primary ordering and it also reads correctly as a single
 * mobile column: most recent first, the way a resume is read. See DECISIONS.md
 * D-014.
 *
 * Roles expand with native <details> rather than a toggle built from state —
 * keyboard and screen-reader behaviour come for free, and it works before
 * hydration.
 */
export function TournamentBracket({ experience, degree }: TournamentBracketProps) {
  const openSlug = useSyncExternalStore(
    subscribeMatchDialog,
    getOpenMatchSlug,
    getServerMatchSlug,
  );
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleOpen = useCallback((slug: string, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    openMatchDialog(slug);
  }, []);

  const handleClose = useCallback(() => {
    closeMatchDialog("#experience");
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  // Newest at the top so the bracket advances upward.
  const byNewest = [...experience].reverse();
  const rungs: Rung[] = [
    { kind: "milestone", entry: degree },
    ...byNewest.map(
      (entry): Rung => ({ kind: "role", entry, slug: slugFor(entry.org) }),
    ),
  ];

  const openSubject: RecapSubject | null = (() => {
    const match = byNewest.find(
      (entry) => entry.recap !== null && slugFor(entry.org) === openSlug,
    );
    if (!match || !match.recap) return null;
    return {
      slug: slugFor(match.org),
      title: `${match.role}, ${match.org}`,
      period: match.date,
      recap: match.recap,
      bullets: match.bullets,
    };
  })();

  return (
    <>
      <ol className="relative border-l border-border pl-8 sm:pl-10">
        {rungs.map((rung, index) => (
          <li
            key={rung.kind === "role" ? rung.slug : rung.entry.school}
            className="relative pb-10 last:pb-0"
          >
            <Reveal delay={index * 60}>
              <span
                aria-hidden="true"
                className={
                  rung.kind === "milestone"
                    ? "absolute top-2 -left-[calc(2rem+7px)] block h-[14px] w-[14px] rounded-full border-2 border-accent bg-accent/20 sm:-left-[calc(2.5rem+7px)]"
                    : "absolute top-2 -left-[calc(2rem+5px)] block h-[10px] w-[10px] rounded-full border border-accent bg-accent sm:-left-[calc(2.5rem+5px)]"
                }
              />

              {rung.kind === "milestone" ? (
                <div className="rounded-2xl border border-dashed border-accent/40 bg-surface/40 p-6">
                  <p className="tabular text-xs tracking-[0.18em] text-accent">
                    {rung.entry.date}
                  </p>
                  <h3 className="mt-2 font-display text-xl tracking-wide sm:text-2xl">
                    {rung.entry.degree}
                  </h3>
                  <p className="mt-1 text-sm text-muted normal-case">
                    {rung.entry.school}
                    {rung.entry.detail ? ` · ${rung.entry.detail}` : ""}
                  </p>
                </div>
              ) : (
                <RoleRung
                  entry={rung.entry}
                  slug={rung.slug}
                  onOpenRecap={handleOpen}
                />
              )}
            </Reveal>
          </li>
        ))}
      </ol>

      <MatchRecap match={openSubject} onClose={handleClose} />
    </>
  );
}

function RoleRung({
  entry,
  slug,
  onOpenRecap,
}: {
  entry: Experience;
  slug: string;
  onOpenRecap: (slug: string, trigger: HTMLElement) => void;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <p className="tabular text-xs tracking-[0.18em] text-accent">{entry.date}</p>

      <h3 className="mt-2 font-display text-xl leading-tight tracking-wide sm:text-2xl">
        {entry.role}
      </h3>
      <p className="mt-1 text-sm text-muted normal-case">{entry.org}</p>

      <details className="group mt-5">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-sm text-accent-soft marker:content-none">
          <ChevronDown
            className="h-4 w-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
          What the role involved
        </summary>

        <ul className="mt-4 space-y-3">
          {entry.bullets.map((bullet) => (
            <li
              key={bullet}
              className="border-l-2 border-accent/30 pl-4 text-sm leading-relaxed text-muted"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </details>

      {entry.recap ? (
        <button
          ref={buttonRef}
          type="button"
          onClick={() => {
            if (buttonRef.current) onOpenRecap(slug, buttonRef.current);
          }}
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm transition-colors hover:border-accent/60 hover:text-accent-soft"
        >
          Match Recap
        </button>
      ) : null}
    </div>
  );
}
