"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

import { buttonClasses, type ButtonVariant } from "@/components/ui/Button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** The motion spec caps the pull at 6px. */
const MAX_PULL = 6;

type MagneticButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  download?: boolean;
};

/**
 * A button that leans very slightly toward the cursor.
 *
 * Only on devices with a fine pointer — on touch there is no cursor to lean
 * toward. The motion values are always attached so that server and client
 * render the same transform (both start at 0); only the handlers are gated, so
 * there is nothing for hydration to disagree about.
 */
export function MagneticButton({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  ariaLabel,
  download,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotionSafe();
  const finePointer = useMediaQuery("(pointer: fine)", false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const magnetic = finePointer && !reduced;

  const handleMove = (event: React.MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const scale = (MAX_PULL * 2) / Math.max(rect.width, rect.height);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * scale)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * scale)));
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const style = { x: springX, y: springY };
  const classes = buttonClasses(variant, className);

  if (href) {
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        download={download}
        className={classes}
        style={style}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type="button"
      aria-label={ariaLabel}
      className={classes}
      style={style}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.button>
  );
}
