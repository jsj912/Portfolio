import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import type { SectionMeta } from "@/lib/sections";

type SectionProps = {
  meta: SectionMeta;
  children?: ReactNode;
  className?: string;
  /** Hero supplies its own full-bleed layout and heading. */
  bare?: boolean;
};

/**
 * Standard section shell: rotation number, themed heading with the plain name
 * beside it, optional plain-English subtitle, then the content.
 *
 * The themed name is what you see; the plain name is what the nav uses, so the
 * theme never gets in the way of finding anything.
 */
export function Section({ meta, children, className, bare = false }: SectionProps) {
  if (bare) {
    return (
      <section id={meta.id} aria-label={meta.plain} className={className}>
        {children}
      </section>
    );
  }

  const headingId = `${meta.id}-heading`;

  return (
    <section
      id={meta.id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-24 py-24 sm:py-32", className)}
    >
      <div className="mx-auto w-full max-w-content px-6">
        <Reveal as="header" className="mb-12 sm:mb-16">
          <p className="tabular mb-3 text-sm text-accent">
            <span className="sr-only">Rotation </span>
            {String(meta.chapter).padStart(2, "0")}
          </p>

          <h2 id={headingId} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-4xl leading-[0.95] font-semibold sm:text-6xl lg:text-7xl">
              {meta.themed}
            </span>
            <span
              aria-hidden="true"
              className="font-sans text-sm tracking-[0.2em] text-muted normal-case"
            >
              · {meta.plain}
            </span>
          </h2>

          {meta.subtitle ? (
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">{meta.subtitle}</p>
          ) : null}
        </Reveal>

        {children}
      </div>
    </section>
  );
}
