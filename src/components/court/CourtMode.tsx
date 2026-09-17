"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { Volleyball } from "@/components/court/Volleyball";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import { SECTIONS, SECTION_IDS } from "@/lib/sections";
import { cn } from "@/lib/utils";

/**
 * The rotation rail: a thin orange line with one marker per section and a ball
 * that rides it as you scroll.
 *
 * Scroll position comes from `useScroll`'s motion value, which updates outside
 * React — no scroll listener writing to state on every frame. Active section
 * detection is an IntersectionObserver in `useActiveSection`.
 *
 * Right-hand side from 1024px up, left edge below that, where it is narrower
 * and the page carries extra left padding so it never sits on top of text.
 */
export function CourtMode() {
  const active = useActiveSection();
  const activeIndex = SECTION_IDS.indexOf(active);
  const reduced = useReducedMotionSafe();

  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.3,
  });

  // Both transforms are created unconditionally; only which one is bound to
  // the element depends on the motion preference.
  const smoothTop = useTransform(smoothed, [0, 1], ["0%", "100%"]);
  const instantTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const lastIndex = SECTIONS.length - 1;

  return (
    <nav
      aria-label="Section progress"
      className="pointer-events-none fixed top-1/2 left-0 z-40 h-[62vh] max-h-[560px] min-h-[320px] w-11 -translate-y-1/2 lg:right-3 lg:left-auto"
    >
      {/* The rail itself. */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-accent/25 lg:w-[3px]"
      />

      {/* The ball, tied to scroll progress rather than to a timer. */}
      <motion.div
        aria-hidden="true"
        style={{ top: reduced ? instantTop : smoothTop }}
        className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-accent"
      >
        <Volleyball size={14} className="lg:h-4 lg:w-4" />
      </motion.div>

      <ul className="relative h-full">
        {SECTIONS.map((section, index) => {
          const state =
            index === activeIndex ? "active" : index < activeIndex ? "passed" : "upcoming";

          return (
            <li
              key={section.id}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${(index / lastIndex) * 100}%` }}
            >
              <a
                href={`#${section.id}`}
                aria-label={`${section.plain} — ${section.themed}`}
                aria-current={state === "active" ? "true" : undefined}
                className="pointer-events-auto flex h-11 w-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block rounded-full border transition-all duration-300",
                    state === "active" &&
                      "h-[10px] w-[10px] border-accent bg-accent shadow-[0_0_10px_2px_var(--color-accent)]",
                    state === "passed" && "h-2 w-2 border-accent bg-accent opacity-40",
                    state === "upcoming" && "h-2 w-2 border-accent/50 bg-transparent",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
