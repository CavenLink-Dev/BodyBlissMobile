import { FlaskConical } from "lucide-react";

/*
  Sitewide test-mode notice — this build is a fully clickable demo with no
  real bookings, payments or emails. Charcoal band so it reads as part of
  the brand, camel icon as the accent (5.2:1 on charcoal). Deliberately not
  dismissible: while the site is in demo mode, people should always know.
  Remove this component from app/layout.tsx when the site goes live.
*/

export function TestModeBanner() {
  return (
    <div role="status" className="w-full bg-primary text-primary-foreground">
      <p className="mx-auto flex max-w-content items-center justify-center gap-compact px-page-inline py-1.5 text-center text-description">
        <FlaskConical aria-hidden="true" className="size-4 shrink-0 text-secondary" />
        Demo site, test mode. Bookings, payments and emails are simulated.
      </p>
    </div>
  );
}
