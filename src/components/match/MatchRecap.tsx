"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import type { Match } from "@/content/site";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type MatchRecapProps = {
  match: Match | null;
  onClose: () => void;
};

/**
 * Full-screen scoreboard for a single match.
 *
 * Carries the full dialog contract: role="dialog" + aria-modal, focus moved in
 * on open and trapped while open, Escape and click-outside both close, the page
 * behind is scroll-locked, and focus returns to whatever opened it (handled by
 * the caller, which owns the trigger).
 */
export function MatchRecap({ match, onClose }: MatchRecapProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();
  const open = match !== null;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    // Move focus into the dialog rather than leaving it behind on the page.
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, handleKeyDown]);

  // A null arena is dropped rather than rendered as an empty row.
  const rows: Array<[string, string]> = match
    ? (
        [
          ["Opponent", match.recap.opponent],
          ["Arena", match.recap.arena],
          ["Final Score", match.recap.finalScore],
          ["MVP Move", match.recap.mvpMove],
          ["Takeaway", match.recap.takeaway],
        ] as Array<[string, string | null]>
      ).filter((row): row is [string, string] => row[1] !== null)
    : [];

  return (
    <AnimatePresence>
      {match ? (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          onMouseDown={(event) => {
            // Only a click on the backdrop itself closes it.
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`recap-title-${match.slug}`}
            className="my-auto w-full max-w-3xl rounded-2xl border border-border bg-surface"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: 8 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-border p-6 sm:p-8">
              <div>
                <p className="tabular mb-2 text-xs tracking-[0.2em] text-accent">
                  MATCH RECAP
                </p>
                <h3
                  id={`recap-title-${match.slug}`}
                  className="font-display text-2xl leading-tight tracking-wide sm:text-3xl"
                >
                  {match.title}
                </h3>
                {match.period ? (
                  <p className="tabular mt-2 text-xs text-muted">{match.period}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close match recap"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:border-accent/60 hover:text-accent-soft"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Scoreboard */}
            <dl className="divide-y divide-border">
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 px-6 py-4 sm:grid-cols-[180px_1fr] sm:gap-6 sm:px-8"
                >
                  <dt className="font-display text-xs tracking-[0.18em] text-muted">
                    {label}
                  </dt>
                  <dd className="text-sm text-text sm:text-base">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="border-t border-border p-6 sm:p-8">
              <h4 className="mb-4 font-display text-xs tracking-[0.18em] text-muted">
                Play by play
              </h4>
              <ul className="space-y-4">
                {match.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="border-l-2 border-accent/40 pl-4 text-sm leading-relaxed text-muted"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
