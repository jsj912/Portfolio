"use client";

import { useEffect, useRef } from "react";

import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const DURATION_MS = 1100;

/**
 * Splits a stat value into the bit that can count and the bits that cannot.
 *
 * Values are not all plain numbers — "96%", "#1 / 350+" and "0.932" all appear —
 * so only the first numeric run is animated and everything around it is held
 * fixed. Returns null when there is no number to count at all.
 */
function parse(value: string) {
  const match = /^([^\d-]*)(-?\d+(?:\.\d+)?)([\s\S]*)$/.exec(value);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const dot = digits.indexOf(".");
  return {
    prefix,
    suffix,
    target: Number(digits),
    decimals: dot === -1 ? 0 : digits.length - dot - 1,
  };
}

/**
 * Counts up to a stat when it first scrolls into view.
 *
 * The final frame writes `value` back verbatim rather than a formatted number,
 * so what ends up on screen is character-for-character what the content layer
 * says — which is also what the content check asserts.
 *
 * Renders the real value server-side, so the number is correct before any JS
 * runs and for anyone who never gets it.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotionSafe();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const parsed = parse(value);
    if (reduced || !parsed || typeof IntersectionObserver === "undefined") {
      node.textContent = value;
      return;
    }

    let frame = 0;
    let started = false;

    const run = (startedAt: number) => {
      const tick = (now: number) => {
        const elapsed = now - startedAt;
        const t = Math.min(1, elapsed / DURATION_MS);
        // Ease out, so it decelerates into the final number.
        const eased = 1 - Math.pow(1 - t, 3);

        if (t < 1) {
          const current = (parsed.target * eased).toFixed(parsed.decimals);
          node.textContent = `${parsed.prefix}${current}${parsed.suffix}`;
          frame = requestAnimationFrame(tick);
        } else {
          // Land on the exact string from the content layer.
          node.textContent = value;
        }
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            observer.disconnect();
            node.textContent = `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
            run(performance.now());
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, reduced]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
