/**
 * Site structure: the six rotations, in order.
 *
 * These are navigation labels, not facts about anyone, so they live here rather
 * than in the content layer. Each section shows its themed name large and its
 * plain name small; the nav uses only the plain names so nobody has to decode
 * the theme to find their way around.
 */

export const SECTION_IDS = [
  "home",
  "about",
  "projects",
  "research",
  "experience",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type SectionMeta = {
  id: SectionId;
  /** Rotation number, 1-6. */
  chapter: number;
  /** Themed heading, shown large. */
  themed: string;
  /** Plain heading, shown small beside it and used in the nav. */
  plain: string;
  /** Plain-English subtitle under the heading. */
  subtitle: string | null;
};

export const SECTIONS: SectionMeta[] = [
  {
    id: "home",
    chapter: 1,
    themed: "Opening Serve",
    plain: "Home",
    subtitle: null,
  },
  {
    id: "about",
    chapter: 2,
    themed: "Training Arc",
    plain: "About",
    subtitle: "Where the fundamentals were built.",
  },
  {
    id: "projects",
    chapter: 3,
    themed: "Match History",
    plain: "Projects",
    subtitle: "Problems taken on, and how they turned out.",
  },
  {
    id: "research",
    chapter: 4,
    themed: "Nationals Arc",
    plain: "Research",
    subtitle: "Papers in preparation.",
  },
  {
    id: "experience",
    chapter: 5,
    themed: "Tournament Progress",
    plain: "Experience",
    subtitle: "Roles, awards, and teams led.",
  },
  {
    id: "contact",
    chapter: 6,
    themed: "Final Whistle",
    plain: "Contact",
    subtitle: null,
  },
];

export const sectionById = (id: SectionId): SectionMeta =>
  SECTIONS.find((s) => s.id === id)!;
