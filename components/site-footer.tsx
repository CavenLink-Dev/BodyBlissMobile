"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Facebook, Instagram, Mail } from "lucide-react";

import wholeLogoWhite from "@/assets/body_bliss_whole_logo_white.png";

/* Footer */

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
              alt="Body Bliss Massage and Day Spa"
              className="h-28 w-auto tablet:h-36"
            />
            <p className="max-w-prose text-description">
              Approved mobile massage therapists at your home, hotel or
              workplace across Adelaide.
            </p>
            <ul className="flex flex-col gap-compact text-description">
              <li className="flex items-center gap-compact">
                <Mail aria-hidden="true" className="size-4 text-secondary" />
                bodyblissmassageanddayspa@gmail.com
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
                <a
                  href="https://www.instagram.com/bodyblissmassageanddayspa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded border border-primary-foreground/30 transition-colors duration-fade hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <Instagram aria-hidden="true" className="size-5" />
                </a>
                <a
                  href="https://www.facebook.com/bodyblissmassageanddayspa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex min-h-hit-target min-w-hit-target items-center justify-center rounded border border-primary-foreground/30 transition-colors duration-fade hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  <Facebook aria-hidden="true" className="size-5" />
                </a>
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
