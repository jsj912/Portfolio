// lucide-react 1.x has no brand icons (DECISIONS.md D-012), so LinkedIn and
// GitHub use neutral glyphs alongside their visible text labels.
import { ArrowUpRight, Briefcase, Code, Mail } from "lucide-react";

import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { copy, profile } from "@/content/site";
import { sectionById } from "@/lib/sections";

/** Strip the scheme and any trailing slash, so what is shown is exactly the URL. */
const readable = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/**
 * Final Whistle.
 *
 * Email, LinkedIn and GitHub as large link rows, each showing the real address
 * rather than a prettified handle. No phone number appears here or anywhere
 * else in the site.
 */
export function Contact() {
  const rows = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
      external: false,
    },
    {
      label: "LinkedIn",
      value: readable(profile.linkedin),
      href: profile.linkedin,
      Icon: Briefcase,
      external: true,
    },
    {
      label: "GitHub",
      value: readable(profile.github),
      href: profile.github,
      Icon: Code,
      external: true,
    },
  ];

  return (
    <Section meta={sectionById("contact")}>
      <Reveal>
        <p className="mb-12 max-w-3xl font-display text-3xl leading-tight tracking-wide sm:text-5xl">
          {copy.contact.headline}
        </p>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <ul className="divide-y divide-border border-y border-border">
          {rows.map((row, index) => (
            <li key={row.label}>
              <Reveal delay={index * 60}>
                <a
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex min-h-11 items-center justify-between gap-6 py-6 transition-colors hover:text-accent-soft"
                >
                  <span className="flex items-center gap-4">
                    <row.Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    <span>
                      <span className="block font-display text-xs tracking-[0.2em] text-muted">
                        {row.label}
                      </span>
                      <span className="block text-base break-all sm:text-lg">
                        {row.value}
                      </span>
                    </span>
                  </span>

                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  {row.external ? (
                    <span className="sr-only">(opens in a new tab)</span>
                  ) : null}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120}>
          <ContactForm email={profile.email} />
        </Reveal>
      </div>
    </Section>
  );
}
