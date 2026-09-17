/**
 * Public base URL of the site.
 *
 * Set NEXT_PUBLIC_SITE_URL in the Vercel project after the first deploy so the
 * sitemap, canonical URL and OG tags point at the real domain. The localhost
 * fallback keeps local builds working.
 */
export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
