import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/ui/Section";
import { SECTIONS } from "@/lib/sections";

/**
 * Page root stays a server component; interactivity lives in leaf components.
 *
 * Remaining section bodies are filled in one at a time; the shells hold the
 * scroll anchors that Court Mode and the nav point at.
 */
export default function Home() {
  const rest = SECTIONS.filter((meta) => meta.id !== "home");

  return (
    <>
      <Hero />

      {rest.map((meta) => (
        <Section key={meta.id} meta={meta} />
      ))}
    </>
  );
}
