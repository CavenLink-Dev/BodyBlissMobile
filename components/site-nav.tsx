"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import wholeLogoCharcoal from "@/assets/body_bliss_whole_logo_charcoal.png";

/*
  Public navigation — four items, always visible (wraps on phone; no
  hamburger-only navigation). Selected = bold charcoal #252525 label in Sora
  + thick #EAC005 underline: weight + position carry the meaning, yellow is
  reinforcement only, never the sole indicator. Item hit targets ≥48px,
  gaps 16/24/32 per breakpoint.
*/

const NAV_ITEMS = [
  { href: "/book", label: "Book a massage" },
  { href: "/therapists", label: "Therapists" },
  { href: "/services", label: "Services & prices" },
  { href: "/help", label: "Help & safety" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-component px-page-inline py-2">
        <Link
          href="/"
          className="flex min-h-hit-target items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Image
            src={wholeLogoCharcoal}
            alt="Body Bliss Mobile Massage — home"
            className="h-12 w-auto"
            priority
          />
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-nav-gap">
            {NAV_ITEMS.map((item) => {
              const selected = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={selected ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-hit-target items-center border-b-4 px-1 text-nav",
                      "transition-colors duration-fade",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      selected
                        ? "border-bb-nav-accent font-heading font-bold text-bb-nav-selected"
                        : "border-transparent text-bb-nav hover:text-bb-nav-selected",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
