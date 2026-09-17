"use client";

import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { buttonClasses } from "@/components/ui/Button";
import { useScrolled } from "@/hooks/useScrolled";
import { SECTIONS } from "@/lib/sections";
import { cn } from "@/lib/utils";

type NavProps = {
  hasResume: boolean;
  resumePath: string;
  name: string;
};

/** Sticky top nav. Plain section names only, so the theme never hides the map. */
export function NavClient({ hasResume, resumePath, name }: NavProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Nav links skip Home; the name on the left already goes there.
  const links = SECTIONS.filter((section) => section.id !== "home");

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  // While the sheet is open: lock the page, trap focus, close on Escape.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab" || !sheetRef.current) return;

      const focusable = sheetRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    sheetRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-border bg-bg/85 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="shell flex h-20 items-center justify-between"
      >
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-wide uppercase"
        >
          {name}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {links.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-sm text-muted transition-colors hover:text-text"
                >
                  {section.plain}
                </a>
              </li>
            ))}
          </ul>

          {hasResume ? (
            <a href={resumePath} className={buttonClasses("ghost", "px-5")}>
              Resume
            </a>
          ) : null}
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="nav-sheet"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => (open ? close() : setOpen(true))}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-border md:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {open ? (
        <div
          id="nav-sheet"
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 top-20 z-40 bg-bg px-6 pt-8 md:hidden"
        >
          <ul className="flex flex-col gap-2">
            {links.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={close}
                  className="flex min-h-11 items-center border-b border-border py-4 font-display text-3xl uppercase"
                >
                  {section.plain}
                </a>
              </li>
            ))}
          </ul>

          {hasResume ? (
            <a
              href={resumePath}
              onClick={close}
              className={buttonClasses("primary", "mt-8 w-full")}
            >
              Resume
            </a>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
