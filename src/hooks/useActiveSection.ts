"use client";

import { useEffect, useState } from "react";

import { SECTION_IDS, type SectionId } from "@/lib/sections";

/**
 * Which section is currently in view.
 *
 * Uses a single IntersectionObserver with a narrow band across the middle of
 * the viewport, so a section becomes active when it crosses the centre rather
 * than the moment its first pixel appears. No scroll listener, no per-frame
 * state updates.
 */
export function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>(SECTION_IDS[0]);

  useEffect(() => {
    const visible = new Set<SectionId>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as SectionId;
          if (entry.isIntersecting) {
            visible.add(id);
          } else {
            visible.delete(id);
          }
        }

        // Several can straddle the band at once; the earliest in document
        // order is the one being read.
        const current = SECTION_IDS.find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    for (const id of SECTION_IDS) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, []);

  return active;
}
