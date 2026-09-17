import { Section } from "@/components/ui/Section";
import { SECTIONS } from "@/lib/sections";

/**
 * Page root stays a server component; interactivity lives in leaf components.
 *
 * Section bodies are filled in section by section in the next phase; the shells
 * are here so the layout, tokens and scroll anchors can be verified first.
 */
export default function Home() {
  return (
    <>
      {SECTIONS.map((meta) => (
        <Section key={meta.id} meta={meta} />
      ))}
    </>
  );
}
