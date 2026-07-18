import Link from "next/link";

import { Button } from "@/components/ui/button";

/*
  Persistent "Book Now" bar for small screens so the one primary action is
  always reachable without scrolling back to the hero. Hidden on tablet+
  where the header already carries a Book Now button. Respects the iPhone
  home-indicator safe area.
*/

export function BookNowBar() {
  return (
    <div
      className="sticky bottom-0 z-30 border-t border-border bg-background/90 backdrop-blur tablet:hidden [padding-bottom:max(0.5rem,env(safe-area-inset-bottom))]"
      role="region"
      aria-label="Quick booking"
    >
      <div className="mx-auto flex max-w-content items-center gap-component px-page-inline py-2">
        <Button asChild variant="secondary" className="flex-1">
          <Link href="/book">Book Now</Link>
        </Button>
        <Button asChild variant="soft" className="flex-1">
          <Link href="/gift-cards">Gift Card</Link>
        </Button>
      </div>
    </div>
  );
}
