"use client";

import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Whether the visitor has asked for reduced motion.
 *
 * Deliberately not `useReducedMotion` from motion: that one snapshots the
 * setting with `useState` on first render, which is `false` during SSR, so a
 * visitor with the setting on would render `false` on the server and `true` on
 * the client and change inline styles between the two.
 *
 * The server snapshot here is `true` — motion stays off until we positively
 * know it is wanted. Use this for imperative, client-only effects (particles,
 * the bird, the loading overlay, the easter egg), which render nothing on the
 * server and so cannot mismatch.
 *
 * Scroll reveals do not use this; they are CSS-driven so the media query can
 * decide before hydration. See DECISIONS.md D-009.
 */
export function useReducedMotionSafe(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", true);
}
