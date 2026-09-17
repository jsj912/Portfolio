/**
 * Faint court markings in perspective. Straight lines only — original geometry,
 * nothing traced or referenced. Purely decorative, so it is hidden from
 * assistive tech and never takes pointer events.
 */
export function CourtLines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        strokeLinecap="square"
        opacity="0.13"
      >
        {/* Court boundary, receding toward the back line. */}
        <path d="M200 560 L1000 560 L760 200 L440 200 Z" />
        {/* Net line across the middle. */}
        <line x1="320" y1="380" x2="880" y2="380" />
        {/* Attack lines either side of it. */}
        <line x1="260" y1="470" x2="940" y2="470" />
        <line x1="380" y1="290" x2="820" y2="290" />
        {/* Centre line running away from the viewer. */}
        <line x1="600" y1="560" x2="600" y2="200" />
      </g>
    </svg>
  );
}
