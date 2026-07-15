import Image from "next/image";
import Link from "next/link";

import wholeLogoWhite from "@/assets/body_bliss_whole_logo_white.png";

/*
  Footer — dark charcoal band (white logo variant belongs here). Three
  groups: brand, explore, legal — stacked on phone, columns on tablet+.
  All links are ≥48px hit targets with visible focus (camel ring works
  on charcoal, 5.2:1). External day-spa URL is pending owner confirmation
  (domain decision gate) — rendered as text until confirmed.
*/

const DAY_SPA_URL: string | null = null; // TODO: confirm clinic website URL with owner

const EXPLORE = [
  { href: "/book", label: "Book a massage" },
  { href: "/services", label: "Services & prices" },
  { href: "/therapists", label: "Therapists" },
  { href: "/gift-cards", label: "Gift cards" },
  { href: "/about", label: "About us" },
  { href: "/help", label: "Help & safety" },
] as const;

const LEGAL = [
  { href: "/terms", label: "Terms & conditions" },
  { href: "/privacy", label: "Privacy policy" },
] as const;

const footerLink =
  "inline-flex min-h-hit-target items-center text-description text-primary-foreground underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

export function SiteFooter() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-content flex-col gap-section px-page-inline py-page-block">
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col items-start gap-component">
            <Image
              src={wholeLogoWhite}
              alt="Body Bliss Mobile Massage"
              className="h-14 w-auto"
            />
            <p className="max-w-prose text-description">
              Vetted mobile massage therapists at your home, hotel or workplace
              across Adelaide — from the team behind Body Bliss Massage &amp;
              Day Spa, with nine years of Adelaide massage and wellness
              experience.
            </p>
            {DAY_SPA_URL ? (
              <a href={DAY_SPA_URL} className={footerLink}>
                Visit Body Bliss Massage &amp; Day Spa
              </a>
            ) : (
              <span className="inline-flex items-center text-description">
                Body Bliss Massage &amp; Day Spa, Adelaide
              </span>
            )}
          </div>

          {/* Explore */}
          <nav aria-label="Footer — explore" className="flex flex-col gap-compact">
            <h2 className="font-heading text-subtitle text-primary-foreground">
              Explore
            </h2>
            <ul className="flex flex-col">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal & account */}
          <nav aria-label="Footer — legal" className="flex flex-col gap-compact">
            <h2 className="font-heading text-subtitle text-primary-foreground">
              The Fine Print
            </h2>
            <ul className="flex flex-col">
              {LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/account" className={footerLink}>
                  My account
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-compact border-t border-primary-foreground/20 pt-card-gap">
          <p className="text-description">
            © {new Date().getFullYear()} Body Bliss Mobile Massage · Adelaide,
            South Australia
          </p>
          <p className="text-caption text-primary-foreground/80">
            We acknowledge the Kaurna people, Traditional Custodians of the
            Adelaide Plains, and pay our respects to Elders past and present.
          </p>
        </div>
      </div>
    </footer>
  );
}
