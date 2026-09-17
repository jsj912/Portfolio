type VolleyballProps = {
  className?: string;
  /** Pixel size of the square viewport. */
  size?: number;
};

/**
 * A volleyball, drawn from scratch: one circle plus three seams.
 *
 * The seams are rim-to-rim arcs bowing around a curved central panel, repeated
 * at 120°. That arrangement is what distinguishes a volleyball from a
 * basketball, whose seams instead radiate from two poles and cross the middle.
 * The whole set is tipped 20° so the ball reads as in play rather than as a
 * static diagram.
 *
 * Deliberately generic geometry — no logo, no branding, nothing traced.
 */
export function Volleyball({ className, size = 16 }: VolleyballProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="12" cy="12" r="10.5" fill="currentColor" />
      <g
        transform="rotate(20 12 12)"
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M3.85 18.62 Q12 11.38 20.15 18.62" />
        <path d="M3.85 18.62 Q12 11.38 20.15 18.62" transform="rotate(120 12 12)" />
        <path d="M3.85 18.62 Q12 11.38 20.15 18.62" transform="rotate(240 12 12)" />
      </g>
    </svg>
  );
}
