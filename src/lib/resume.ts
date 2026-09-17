import { existsSync } from "node:fs";
import path from "node:path";

export const RESUME_PATH = "/resume.pdf";

/**
 * Whether the resume actually exists, checked at build time on the server.
 *
 * The brief is explicit that a download button pointing at a missing file is
 * worse than no button, so every resume affordance is gated on this. Drop the
 * PDF into `public/resume.pdf` and the buttons appear on the next build.
 */
export const hasResume: boolean = existsSync(
  path.join(process.cwd(), "public", "resume.pdf"),
);
