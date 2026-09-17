import { CountUp } from "@/components/sections/CountUp";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { bio, copy, education, skills, statLines } from "@/content/site";
import { sectionById } from "@/lib/sections";

/**
 * Training Arc: education, bio, pull quote, then the player stats.
 *
 * No skill bars and no percentages — there is no honest number behind "React:
 * 80%". The stats shown are real measurements from the work, each carrying the
 * project it came from.
 */
export function About() {
  return (
    <Section meta={sectionById("about")}>
      <Card className="relative overflow-hidden">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <div>
            <h3 className="mb-6 font-display text-sm tracking-[0.2em] text-muted">
              Education
            </h3>

            <ul className="space-y-6">
              {education.map((entry) => (
                <li key={entry.school} className="border-l-2 border-accent/40 pl-5">
                  <p className="font-display text-xl tracking-wide">{entry.school}</p>
                  <p className="mt-1 text-sm text-muted normal-case">{entry.degree}</p>

                  <p className="tabular mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span>{entry.date}</span>
                    {entry.place ? <span>· {entry.place}</span> : null}
                    {entry.detail ? (
                      <span className="text-accent-soft">· {entry.detail}</span>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-4">
              {bio.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="border-l-2 border-accent pl-5">
              <p className="font-display text-2xl leading-tight tracking-wide text-text uppercase">
                {copy.about.pullQuote}
              </p>
            </blockquote>
          </div>
        </div>
      </Card>

      {/* Player stats */}
      <div className="mt-16">
        <Reveal>
          <h3 className="mb-8 font-display text-2xl tracking-[0.12em] sm:text-3xl">
            Player Stats
          </h3>
        </Reveal>

        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {statLines.map((stat, index) => (
            <Reveal key={stat.label + stat.source} delay={index * 60}>
              <div className="flex h-full flex-col bg-surface p-6">
                <dd className="tabular text-3xl leading-none font-semibold text-accent sm:text-4xl">
                  <CountUp value={stat.value} />
                </dd>
                <dt className="mt-3 text-sm font-medium text-text">{stat.label}</dt>
                <p className="mt-1 text-xs leading-snug text-muted">{stat.source}</p>
              </div>
            </Reveal>
          ))}
        </dl>

        {/* Skill groups, as a spec sheet rather than invented proficiency bars. */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {skills.map((group, index) => (
            <Reveal key={group.group} delay={index * 60}>
              <h4 className="mb-4 font-display text-sm tracking-[0.2em] text-muted">
                {group.group}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
