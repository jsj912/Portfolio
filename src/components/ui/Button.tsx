import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "ghost";

/** Shared so MagneticButton can wear the same clothes. */
export function buttonClasses(variant: ButtonVariant, className?: string): string {
  return cn(
    // min-h-11 keeps the touch target at 44px.
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium tracking-wide transition-colors",
    variant === "primary"
      ? "bg-accent text-bg hover:bg-accent-soft"
      : "border border-border text-text hover:border-accent/60 hover:text-accent-soft",
    className,
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type AnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: AnchorProps | NativeButtonProps) {
  const { children, variant = "primary", className, ...rest } = props;

  if (typeof props.href === "string") {
    const anchorRest = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...anchorRest} className={buttonClasses(variant, className)}>
        {children}
      </a>
    );
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonRest} type={buttonRest.type ?? "button"} className={buttonClasses(variant, className)}>
      {children}
    </button>
  );
}
