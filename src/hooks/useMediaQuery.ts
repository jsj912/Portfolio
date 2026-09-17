"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Subscribe to a media query as an external store.
 *
 * `useSyncExternalStore` rather than `useState` + `useEffect`: it is the API
 * built for exactly this, it avoids the cascading render that setState-in-effect
 * causes, and it lets the server snapshot be stated explicitly instead of
 * guessed.
 */
export function useMediaQuery(query: string, serverSnapshot: boolean): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);

  return useSyncExternalStore(subscribe, getSnapshot, () => serverSnapshot);
}
