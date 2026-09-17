"use client";

import { useCallback, useSyncExternalStore } from "react";

/** Whether the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 8): boolean {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener("scroll", onChange, { passive: true });
    return () => window.removeEventListener("scroll", onChange);
  }, []);

  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold]);

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
