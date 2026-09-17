"use client";

import { useEffect, useRef } from "react";

import { Volleyball } from "@/components/court/Volleyball";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { copy } from "@/content/site";

const SESSION_KEY = "portfolio:served";
const HOLD_MS = 800;
const FADE_MS = 400; // HOLD + FADE stays within the 1.2s budget.

/**
 * Brief overlay on the first visit of a session.
 *
 * It sits on top of a fully rendered hero and fades away — it never gates
 * rendering, so if JS fails or is slow the page is simply there. Shown once per
 * session, skipped entirely under reduced motion, and gone within 1.2s.
 *
 * State is written straight to the DOM rather than held in React: nothing else
 * depends on it, and this way the overlay cannot survive a failed render.
 */
export function LoadingOverlay() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      // Storage can be unavailable (private mode). Treat as already seen so a
      // blocked API can never leave an overlay stuck on screen.
      seen = true;
    }
    if (seen) return;

    try {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // Not fatal — worst case it shows again next navigation.
    }

    node.setAttribute("data-state", "visible");

    const leave = window.setTimeout(() => {
      node.setAttribute("data-state", "leaving");
    }, HOLD_MS);

    const done = window.setTimeout(() => {
      node.setAttribute("data-state", "hidden");
    }, HOLD_MS + FADE_MS);

    return () => {
      window.clearTimeout(leave);
      window.clearTimeout(done);
    };
  }, [reduced]);

  return (
    <div
      ref={ref}
      data-state="hidden"
      aria-hidden="true"
      className="loading-overlay"
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="flex flex-col items-center gap-5">
        <Volleyball size={34} className="text-accent" />
        <p className="font-display text-sm tracking-[0.22em] text-muted uppercase">
          {copy.loading.line}
        </p>
      </div>
    </div>
  );
}
