"use client";

import { useEffect, useState } from "react";

import { CourtLines } from "@/components/effects/CourtLines";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

/** Fixed rather than random, so server and client render the same thing. */
const PARTICLES = [
  { left: "12%", bottom: "18%", size: 3, duration: 15, delay: 0 },
  { left: "27%", bottom: "8%", size: 2, duration: 19, delay: 3.5 },
  { left: "46%", bottom: "24%", size: 2, duration: 17, delay: 7 },
  { left: "63%", bottom: "12%", size: 3, duration: 21, delay: 1.5 },
  { left: "78%", bottom: "30%", size: 2, duration: 16, delay: 5 },
  { left: "89%", bottom: "16%", size: 2, duration: 23, delay: 9 },
];

const FEATHERS = [
  { left: "18%", duration: 26, delay: 2 },
  { left: "71%", duration: 32, delay: 14 },
];

/** How long after load the bird crosses, once. */
const BIRD_DELAY_MS = 4000;

function Feather({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 48"
      width="14"
      height="28"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {/* A vane either side of a curved spine. */}
      <path d="M12 2 C 20 14, 20 30, 12 46 C 4 30, 4 14, 12 2 Z" fill="var(--color-accent-soft)" />
      <path d="M12 4 L12 45" stroke="var(--color-bg)" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

function Bird({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 20"
      width="34"
      height="14"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Two arcs meeting at the body — the whole silhouette. */}
      <path
        d="M2 14 C 10 2, 18 2, 24 11 C 30 2, 38 2, 46 14"
        fill="none"
        stroke="var(--color-text)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Hero backdrop: court lines, a soft orange glow, a few slow particles, the odd
 * feather, and one bird that crosses about four seconds after load.
 *
 * CSS and SVG only — no canvas. Everything here is decorative, hidden from
 * assistive tech, and takes no pointer events. Under reduced motion the moving
 * parts are removed by a media query and the bird never mounts at all.
 */
export function HeroAtmosphere() {
  const reduced = useReducedMotionSafe();
  const [birdFlown, setBirdFlown] = useState(false);

  useEffect(() => {
    if (reduced || birdFlown) return;
    const timer = window.setTimeout(() => setBirdFlown(true), BIRD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [reduced, birdFlown]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft orange glow, low and centred behind the headline. */}
      <div
        className="absolute top-1/2 left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-accent) 0%, transparent 62%)",
        }}
      />

      <CourtLines className="absolute inset-x-0 bottom-0 h-[62%] w-full" />

      {PARTICLES.map((particle, index) => (
        <span
          key={index}
          className="atmosphere-motion particle absolute rounded-full bg-accent-soft"
          style={{
            left: particle.left,
            bottom: particle.bottom,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {FEATHERS.map((feather, index) => (
        <Feather
          key={index}
          className="atmosphere-motion feather absolute top-0"
          style={{
            left: feather.left,
            animationDuration: `${feather.duration}s`,
            animationDelay: `${feather.delay}s`,
          }}
        />
      ))}

      {birdFlown ? <Bird className="bird absolute top-[22%] left-0" /> : null}
    </div>
  );
}
