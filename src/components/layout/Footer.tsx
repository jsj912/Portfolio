import { profile } from "@/content/site";

/**
 * Site footer.
 *
 * The year is computed rather than written down, so it cannot rot into a
 * literal that someone forgets to update. Deliberately no phone number.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <div className="shell flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
}
