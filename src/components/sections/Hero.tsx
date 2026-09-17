import { ArrowDown, Download, MapPin } from "lucide-react";

import { HeroAtmosphere } from "@/components/effects/HeroAtmosphere";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Reveal } from "@/components/ui/Reveal";
import { copy, profile } from "@/content/site";
import { hasResume, RESUME_PATH } from "@/lib/resume";
import { sectionById } from "@/lib/sections";

/**
 * Opening Serve. Full viewport, the only H1 on the page.
 *
 * The resume button only exists when public/resume.pdf does; a download link to
 * a missing file is worse than no link at all.
 */
export function Hero() {
  const meta = sectionById("home");

  return (
    <section
      id={meta.id}
      aria-label={meta.plain}
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <HeroAtmosphere />

      <div className="shell relative z-10 py-28">
        <Reveal>
          <p className="tabular mb-6 text-sm text-accent">
            <span className="sr-only">Rotation </span>01
            <span className="ml-3 text-muted normal-case">{meta.themed}</span>
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h1 className="text-[clamp(3rem,11vw,7.5rem)] leading-[0.88] font-bold">
            {profile.name}
          </h1>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 font-display text-lg tracking-[0.18em] text-accent-soft uppercase sm:text-2xl">
            {copy.hero.subtitle}
          </p>
        </Reveal>

        <Reveal delay={180}>
          <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
            {copy.hero.tagline}
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#projects" variant="primary">
              {copy.hero.primaryCta}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </MagneticButton>

            {hasResume ? (
              <MagneticButton href={RESUME_PATH} variant="ghost" download>
                {copy.hero.resumeCta}
                <Download className="h-4 w-4" aria-hidden="true" />
              </MagneticButton>
            ) : null}
          </div>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-12 flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {profile.location}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
