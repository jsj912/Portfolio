import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/siteUrl";

/** One page, so one entry. Sections are anchors on it, not separate routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
