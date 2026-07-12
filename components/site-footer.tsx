import Image from "next/image";
import Link from "next/link";

import lotusWhite from "@/assets/body_bliss_lotus_white.png";

/*
  Footer — dark charcoal band (white logo variant belongs here), with the
  day-spa link back to the clinic. External day-spa URL is pending owner
  confirmation (domain decision gate) — rendered as text until confirmed.
*/

const DAY_SPA_URL: string | null = null; // TODO: confirm clinic website URL with owner

export function SiteFooter() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-content flex-col gap-component px-page-inline py-page-block">
        <div className="flex items-center gap-component">
          <Image src={lotusWhite} alt="" aria-hidden="true" className="h-10 w-auto" />
          <p className="font-heading text-subtitle text-primary-foreground">
            Body Bliss Mobile Massage
          </p>
        </div>
        <p className="text-description">
          From the team behind Body Bliss Massage &amp; Day Spa — nine years of
          Adelaide massage and wellness experience.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-nav-gap">
            <li>
              <Link
                href="/about"
                className="inline-flex min-h-hit-target items-center text-description underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                About Body Bliss
              </Link>
            </li>
            <li>
              <Link
                href="/help"
                className="inline-flex min-h-hit-target items-center text-description underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              >
                Help &amp; safety
              </Link>
            </li>
            <li>
              {DAY_SPA_URL ? (
                <a
                  href={DAY_SPA_URL}
                  className="inline-flex min-h-hit-target items-center text-description underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                >
                  Visit Body Bliss Massage &amp; Day Spa
                </a>
              ) : (
                <span className="inline-flex min-h-hit-target items-center text-description">
                  Body Bliss Massage &amp; Day Spa, Adelaide
                </span>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
