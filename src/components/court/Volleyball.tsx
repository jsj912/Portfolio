type VolleyballProps = {
  className?: string;
  /** Pixel size of the square viewport. */
  size?: number;
};

/**
 * A ball, drawn from scratch: one circle plus three seam curves.
 *
 * Deliberately generic geometry — no logo, no branding, nothing referencing any
 * existing design.
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
        fill="none"
        stroke="var(--color-bg)"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M12 1.5 C 7 7, 6 15, 9 22.2" />
        <path d="M22.3 9 C 15.5 8.2, 8.6 11.8, 4.2 18.6" />
        <path d="M2.2 8.2 C 8.4 11, 13.4 17, 14.6 22.2" />
      </g>
    </svg>
  );
}
