import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Volleyball } from "@/components/court/Volleyball";
import { buttonClasses } from "@/components/ui/Button";
import { copy } from "@/content/site";

export const metadata = {
  title: "Ball out — page not found",
};

/** 404. The ball bounces out of play once, then stays put. */
export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center overflow-hidden">
      <div className="shell relative py-24">
        <span aria-hidden="true" className="ball-out absolute top-0 left-0 text-accent">
          <Volleyball size={40} />
        </span>

        <h1 className="text-[clamp(3rem,14vw,9rem)] leading-[0.85] font-bold">
          {copy.notFound.headline}
        </h1>

        <p className="mt-6 max-w-md text-base text-muted">
          That page is out of bounds. Nothing here — the rest of the site is
          still in play.
        </p>

        <Link href="/" className={buttonClasses("primary", "mt-10")}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to the court
        </Link>
      </div>
    </div>
  );
}
