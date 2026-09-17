import { MatchGrid } from "@/components/match/MatchGrid";
import { Section } from "@/components/ui/Section";
import { matches } from "@/content/site";
import { sectionById } from "@/lib/sections";

/** Match History. Featured matches take the full row. */
export function Projects() {
  return (
    <Section meta={sectionById("projects")}>
      <MatchGrid matches={matches} />
    </Section>
  );
}
