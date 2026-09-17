"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";

import { MatchCard } from "@/components/match/MatchCard";
import { MatchRecap } from "@/components/match/MatchRecap";
import { Reveal } from "@/components/ui/Reveal";
import type { Match } from "@/content/site";
import {
  closeMatchDialog,
  getOpenMatchSlug,
  getServerMatchSlug,
  openMatchDialog,
  subscribeMatchDialog,
} from "@/lib/matchDialog";

/**
 * The match grid, plus the recap dialog it opens.
 *
 * Which recap is open lives in the URL hash rather than in state, so
 * `#match-<slug>` is deep-linkable and the address bar can never disagree with
 * what is on screen.
 */
export function MatchGrid({ matches }: { matches: Match[] }) {
  const openSlug = useSyncExternalStore(
    subscribeMatchDialog,
    getOpenMatchSlug,
    getServerMatchSlug,
  );

  // Whatever opened the dialog, so focus can go back to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);

  const handleOpen = useCallback((slug: string, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    openMatchDialog(slug);
  }, []);

  const handleClose = useCallback(() => {
    closeMatchDialog();
    // Deep-linked opens have no trigger to return to; the page keeps focus.
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  const openMatch = matches.find((match) => match.slug === openSlug) ?? null;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        {matches.map((match, index) => (
          <Reveal
            key={match.slug}
            delay={index * 60}
            className={match.featured ? "lg:col-span-2" : undefined}
          >
            <MatchCard match={match} onOpen={handleOpen} />
          </Reveal>
        ))}
      </div>

      <MatchRecap match={openMatch} onClose={handleClose} />
    </>
  );
}
