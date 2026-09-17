import type { Metadata } from "next";
import { Barlow_Condensed, Inter, JetBrains_Mono } from "next/font/google";

import { CourtMode } from "@/components/court/CourtMode";
import { EasterEgg } from "@/components/effects/EasterEgg";
import { LoadingOverlay } from "@/components/effects/LoadingOverlay";
import { Footer } from "@/components/layout/Footer";
import { Nav } from "@/components/layout/Nav";
import { copy, education, profile } from "@/content/site";
import { SITE_URL } from "@/lib/siteUrl";

import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = `${profile.name} — Machine Learning Engineer`;
const description = copy.hero.tagline;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: profile.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

/**
 * Person schema, built only from the content layer.
 *
 * No phone number, and no claim that is not already on the page.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  email: `mailto:${profile.email}`,
  url: SITE_URL,
  jobTitle: "Machine Learning Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  sameAs: [profile.linkedin, profile.github],
  alumniOf: education.map((entry) => ({
    "@type": "EducationalOrganization",
    name: entry.school,
  })),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${barlowCondensed.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          // Serialised from a local object literal, never from anything a visitor supplies.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>

        <Nav />
        <CourtMode />

        <main id="main">{children}</main>

        <Footer />

        <LoadingOverlay />
        <EasterEgg />
      </body>
    </html>
  );
}
