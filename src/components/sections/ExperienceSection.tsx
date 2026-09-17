import { Medal, Users } from "lucide-react";

import { TournamentBracket } from "@/components/sections/TournamentBracket";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { awards, education, experience, leadership } from "@/content/site";
import { sectionById } from "@/lib/sections";

/**
 * Tournament Progress: the bracket, then the trophy case, then captaincy.
 *
 * The degree that caps the bracket is the B.E. entry from the content layer —
 * no invented graduate-school step, and no date that is not in the content.
 */
export function ExperienceSection() {
  const degree = education[0];

  return (
    <Section meta={sectionById("experience")}>
      <TournamentBracket experience={experience} degree={degree} />

      {/* Trophy case */}
      <div className="mt-20">
        <Reveal>
          <h3 className="mb-8 flex items-center gap-3 font-display text-2xl tracking-[0.12em] sm:text-3xl">
            <Medal className="h-6 w-6 text-accent" aria-hidden="true" />
            Trophy Case
          </h3>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {awards.map((award, index) => (
            <Reveal key={award.title} delay={index * 60}>
              <Card className="h-full border-accent/30 bg-gradient-to-b from-accent/[0.07] to-transparent">
                <h4 className="font-display text-lg leading-tight tracking-wide sm:text-xl">
                  {award.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{award.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Captaincy */}
      <div className="mt-16">
        <Reveal>
          <h3 className="mb-8 flex items-center gap-3 font-display text-2xl tracking-[0.12em] sm:text-3xl">
            <Users className="h-6 w-6 text-accent" aria-hidden="true" />
            Captaincy
          </h3>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {leadership.map((role, index) => (
            <Reveal key={role.role} delay={index * 60}>
              <Card className="h-full">
                <h4 className="font-display text-lg leading-tight tracking-wide">
                  {role.role}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{role.detail}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
