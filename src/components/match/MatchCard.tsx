"use client";

// lucide-react 1.x ships no brand icons, so the repository link uses a neutral
// code glyph rather than a GitHub mark. See DECISIONS.md D-012.
import { Code, ExternalLink, FileText } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/ui/Badge";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";
import type { Match } from "@/content/site";
import { cn } from "@/lib/utils";

/** The motion spec caps the tilt at 4 degrees. */
const MAX_TILT = 4;

type MatchCardProps = {
  match: Match;
  onOpen: (slug: string, trigger: HTMLElement) => void;
};

export function MatchCard({ match, onOpen }: MatchCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const recapButtonRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotionSafe();
  const finePointer = useMediaQuery("(pointer: fine)", false);
  const interactive = finePointer && !reduced;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (event: React.MouseEvent) => {
    if (!interactive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    px.set(0);
    py.set(0);
  };

  const open = () => {
    if (recapButtonRef.current) onOpen(match.slug, recapButtonRef.current);
  };

  const links = [
    match.links.github ? { href: match.links.github, label: "GitHub", Icon: Code } : null,
    match.links.demo ? { href: match.links.demo, label: "Demo", Icon: ExternalLink } : null,
    match.links.report ? { href: match.links.report, label: "Report", Icon: FileText } : null,
  ].filter((link): link is { href: string; label: string; Icon: typeof Code } => link !== null);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={open}
      style={interactive ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      whileHover={interactive ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "group flex h-full cursor-pointer flex-col rounded-2xl border border-border bg-surface p-6 transition-shadow duration-300 sm:p-8",
        "hover:border-accent/40 hover:shadow-[0_18px_50px_-24px_var(--color-accent)]",
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        <p className="font-display text-xs tracking-[0.18em] text-accent">
          {match.opponent}
        </p>
        {match.period ? (
          <p className="tabular text-xs text-muted">· {match.period}</p>
        ) : null}
      </div>

      <h3
        className={cn(
          "mt-3 font-display leading-tight tracking-wide",
          match.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
        )}
      >
        {match.title}
      </h3>

      <p className="mt-4 text-sm leading-relaxed text-muted">{match.result}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {match.tech.map((tech) => (
          <li key={tech}>
            <Badge>{tech}</Badge>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <button
          ref={recapButtonRef}
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            open();
          }}
          className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-soft"
        >
          Match Recap
        </button>

        {/* Only links that actually exist are rendered. */}
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border px-5 text-sm transition-colors hover:border-accent/60 hover:text-accent-soft"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {label}
            <span className="sr-only"> for {match.title} (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
