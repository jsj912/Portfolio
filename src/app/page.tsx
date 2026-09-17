import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Research } from "@/components/sections/Research";

/** Page root stays a server component; interactivity lives in leaf components. */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Research />
      <ExperienceSection />
      <Contact />
    </>
  );
}
