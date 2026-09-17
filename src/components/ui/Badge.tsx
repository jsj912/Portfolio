import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type BadgeProps = {
  children: ReactNode;
  /** `accent` is reserved for status that matters, e.g. a paper's state. */
  tone?: "default" | "accent";
  className?: string;
};

/** Small chip used for tech, topics and statuses. */
export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs tracking-wide whitespace-nowrap",
        tone === "accent"
          ? "border-accent/40 bg-accent/10 text-accent-soft"
          : "border-border bg-surface text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
