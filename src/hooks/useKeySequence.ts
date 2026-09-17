"use client";

import { useEffect, useRef } from "react";

/** Typing into a field should never trigger a shortcut. */
function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

/**
 * Fire `onMatch` when `sequence` is typed in order.
 *
 * Case-insensitive, and forgiving of a wrong key: the buffer keeps the longest
 * suffix that could still lead to a match, so "FFLY" works.
 *
 * The buffer is a ref rather than state — it changes on every keystroke and
 * nothing renders from it. Callers should pass a stable `onMatch`
 * (a `useCallback`), since the listener is rebound when it changes.
 */
export function useKeySequence(
  sequence: string,
  onMatch: () => void,
  enabled = true,
): void {
  const buffer = useRef("");

  useEffect(() => {
    if (!enabled) return;

    const target = sequence.toLowerCase();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTyping(event.target)) return;
      if (event.key.length !== 1) return;

      const next = (buffer.current + event.key.toLowerCase()).slice(-target.length);
      buffer.current = next;

      if (next === target) {
        buffer.current = "";
        onMatch();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [sequence, enabled, onMatch]);
}
