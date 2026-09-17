"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  /** Stagger offset in ms. The motion spec calls for 60ms between siblings. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Fade + 16px rise when the element first scrolls into view. Triggers once.
 *
 * The animation itself is CSS (see `.reveal` in globals.css); this only flips
 * `data-shown`. That split means `prefers-reduced-motion` is handled by a media
 * query rather than by JS, so it is correct on the very first paint and does
 * not depend on hydration.
 *
 * The flag is written straight to the DOM rather than held in React state:
 * it drives nothing else, and a state update here would re-render the whole
 * subtree once per reveal for no benefit.
 */
export function Reveal({ children, delay = 0, className, as }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.setAttribute("data-shown", "true");

    // If the observer is unavailable, show the content rather than hide it.
    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      data-shown="false"
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={cn("reveal", className)}
    >
      {children}
    </Tag>
  );
}
