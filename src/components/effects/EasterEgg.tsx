"use client";

import { useCallback, useRef } from "react";

import { useKeySequence } from "@/hooks/useKeySequence";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const DURATION_MS = 3000;

const EGG_FEATHERS = [
  { left: "14%", duration: 2.9, delay: 0.1 },
  { left: "38%", duration: 3, delay: 0.5 },
  { left: "59%", duration: 2.7, delay: 0.25 },
  { left: "82%", duration: 3, delay: 0.7 },
];

/**
 * Type FLY for a three-second sunrise.
 *
 * Ignored while focus is in a field, so it cannot fire mid-message in the
 * contact form, and not wired up at all under reduced motion.
 */
export function EasterEgg() {
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const reduced = useReducedMotionSafe();

  const trigger = useCallback(() => {
    const node = ref.current;
    if (!node || node.getAttribute("data-active") === "true") return;

    node.setAttribute("data-active", "true");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      node.setAttribute("data-active", "false");
    }, DURATION_MS);
  }, []);

  useKeySequence("FLY", trigger, !reduced);

  return (
    <div ref={ref} data-active="false" aria-hidden="true" className="sunrise">
      {EGG_FEATHERS.map((feather, index) => (
        <svg
          key={index}
          viewBox="0 0 24 48"
          width="16"
          height="32"
          className="feather absolute top-0"
          style={{
            left: feather.left,
            animationDuration: `${feather.duration}s`,
            animationDelay: `${feather.delay}s`,
            animationIterationCount: 1,
          }}
        >
          <path
            d="M12 2 C 20 14, 20 30, 12 46 C 4 30, 4 14, 12 2 Z"
            fill="var(--color-text)"
            opacity="0.75"
          />
        </svg>
      ))}
    </div>
  );
}
