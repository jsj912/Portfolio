/**
 * Which Match Recap is open, stored in the URL hash.
 *
 * Keeping it in the hash rather than in React state is what makes recaps
 * deep-linkable: `#match-ringshield` opens that recap on load, and sharing the
 * URL shares the open dialog. It is exposed as an external store so components
 * can read it with `useSyncExternalStore` — no state to fall out of sync with
 * the address bar, and no setState-in-effect to reconcile the two.
 *
 * `replaceState` rather than `pushState`, so opening and closing a recap does
 * not fill the back button with entries.
 */

const PREFIX = "#match-";

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function subscribeMatchDialog(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("hashchange", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("hashchange", listener);
  };
}

export function getOpenMatchSlug(): string | null {
  const hash = window.location.hash;
  return hash.startsWith(PREFIX) ? hash.slice(PREFIX.length) : null;
}

/** Nothing is open during SSR; the hash is a client-side concern. */
export function getServerMatchSlug(): null {
  return null;
}

export function openMatchDialog(slug: string): void {
  window.history.replaceState(null, "", `${PREFIX}${slug}`);
  notify();
}

export function closeMatchDialog(fallbackHash = "#projects"): void {
  window.history.replaceState(null, "", fallbackHash);
  notify();
}
