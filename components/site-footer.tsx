"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Instagram, Mail, Phone } from "lucide-react";

import { toast } from "@/components/toaster";
import wholeLogoWhite from "@/assets/body_bliss_whole_logo_white.png";

/*
  Footer — dark charcoal band (white logo variant belongs here). Four
  groups: brand+contact, explore, support/legal, plus social placeholders —
  stacked on phone, columns on tablet+. All links are ≥48px hit targets
  with visible focus (camel ring works on charcoal, 5.2:1). Contact
  details are sample/demonstration information.
*/

const EXPLORE = [
  { href: "/book", label: "Book a massage" },
  { href: "/services", label: "Services & prices" },
  { href: "/therapists", label: "Therapists" },
  { href: "/gift-cards", label: "Gift cards" },
  { href: "/areas", label: "Service areas" },
  { href: "/about", label: "About us" },
] as const;

const SUPPORT = [
  { href: "/help", label: "Help & safety" },
  { href: "/terms", label: "Terms & conditions" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/account", label: "My account" },
] as const;

const footerLink =
  "inline-flex min-h-hit-target items-center text-description text-primary-foreground underline underline-offset-4 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

export function SiteFooter() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-content flex-col gap-section px-page-inline py-page-block">
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
          {/* Brand + contact */}
          <div className="flex flex-col items-start gap-component">
            <Image
              src={wholeLogoWhite}
              alt="Body Bliss Mobile Massage"
              className="h-28 w-auto tablet:h-36"
            />
            <p className="max-w-prose text-description">
              Approved mobile massage therapists at your home, hotel or
              workplace across Adelaide, from the team behind the Body Bliss
              Massage and Day Spa locations in Prospect and Norwood, caring
              for Adelaide since 2017.
            </p>
            <ul className="flex flex-col gap-compact text-description">
              <li className="flex items-center gap-compact">
                <Mail aria-hidden="true" className="size-4 text-secondary" />
                bodyblissmassageanddayspa@gmail.com
              </li>
              <li className="flex items-center gap-compact">
                <Phone aria-hidden="true" className="size-4 text-secondary" />
                <a
                  href="tel:0404877091"
                  className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  0404 877 091
                </a>
              </li>
              <li className="flex items-center gap-compact">
                <Clock aria-hidden="true" className="size-4 text-secondary" />
                Open 7 days, 10am to 8pm (ACST)
              </li>
            </ul>

          </div>

          {/* Explore */}
          <nav aria-label="Footer, explore" className="flex flex-col gap-compact">
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

          {/* Support & legal + social */}
          <div className="flex flex-col gap-card-gap">
            <nav aria-label="Footer, support and legal" className="flex flex-col gap-compact">
              <h2 className="font-heading text-subtitle text-primary-foreground">
                Support &amp; The Fine Print
              </h2>
              <ul className="flex flex-col">
                {SUPPORT.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={footerLink}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-compact">
              <h2 className="font-heading text-subtitle text-primary-foreground">
                Follow Us
              </h2>
              <div className="flex gap-compact">
                <button
                  type="button"
                  aria-label="Instagram (placeholder)"
                  onClick={() => toast("Social links are placeholders in this prototype.", "info")}
                  className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded border border-primary-foreground/30 transition-colors duration-fade hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <Instagram aria-hidden="true" className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Facebook (placeholder)"
                  onClick={() => toast("Social links are placeholders in this prototype.", "info")}
                  className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded border border-primary-foreground/30 transition-colors duration-fade hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <Facebook aria-hidden="true" className="size-5" />
                </button>
              </div>
            </div>
          </div>
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
