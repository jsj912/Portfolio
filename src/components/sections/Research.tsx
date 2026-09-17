import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { currentDirection, publications } from "@/content/site";
import { sectionById } from "@/lib/sections";

/**
 * Nationals Arc: a vertical timeline of papers, revealed one at a time.
 *
 * All three are in preparation and the UI says so plainly — there is no
 * "Published" wording anywhere, and no DOI or link is rendered, because none
 * exists. A missing venue renders nothing rather than a guess.
 */
export function Research() {
  return (
    <Section meta={sectionById("research")}>
      <ol className="relative border-l border-border pl-8 sm:pl-10">
        {publications.map((publication, index) => (
          <li key={publication.title} className="relative pb-12 last:pb-0">
            <Reveal delay={index * 60}>
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[calc(2rem+5px)] block h-[10px] w-[10px] rounded-full border border-accent bg-bg sm:-left-[calc(2.5rem+5px)]"
              />

              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{publication.status}</Badge>
                <Badge>{publication.role}</Badge>
              </div>

              <h3 className="mt-4 font-display text-xl leading-tight tracking-wide sm:text-2xl">
                {publication.title}
              </h3>

              {publication.venue ? (
                <p className="mt-2 text-sm text-muted normal-case">{publication.venue}</p>
              ) : null}

              {publication.note ? (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {publication.note}
                </p>
              ) : null}

              <ul className="mt-4 flex flex-wrap gap-2">
                {publication.tags.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
        ))}

        {/* Where the work is heading, drawn from the projects above. */}
        <li className="relative">
          <Reveal delay={publications.length * 60}>
            <span
              aria-hidden="true"
              className="absolute top-2 -left-[calc(2rem+7px)] block h-[14px] w-[14px] rounded-full border-2 border-accent bg-accent/20 sm:-left-[calc(2.5rem+7px)]"
            />

            <h3 className="font-display text-xl leading-tight tracking-wide sm:text-2xl">
              Current direction
            </h3>

            <ul className="mt-4 flex flex-wrap gap-2">
              {currentDirection.map((direction) => (
                <li key={direction}>
                  <Badge tone="accent">{direction}</Badge>
                </li>
              ))}
            </ul>
          </Reveal>
        </li>
      </ol>
    </Section>
  );
}
