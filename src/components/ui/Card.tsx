import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

/** Surface panel. Hover behaviour lives with the components that need it. */
export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 sm:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
