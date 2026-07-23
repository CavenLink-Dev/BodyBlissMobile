import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import lotusCharcoal from "@/assets/body_bliss_lotus_charcoal.png";

/* Branded 404 — calm, helpful, with the two useful ways forward. */

export default function NotFound() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-md flex-col items-start gap-card-gap">
        <Image
          src={lotusCharcoal}
          alt=""
          aria-hidden="true"
          className="h-14 w-auto"
        />
        <h1 className="font-heading text-display text-bb-text-display">
          Page Not Found
        </h1>
        <p className="text-description text-bb-text-description">
          That page doesn&apos;t exist or may have moved. You can head back
          home, or go straight to booking a massage.
        </p>
        <div className="flex w-full flex-col gap-component tablet:flex-row">
          <Button asChild variant="secondary" className="w-full tablet:w-auto">
            <Link href="/book">Book a Massage</Link>
          </Button>
          <Button asChild variant="quiet" className="w-full tablet:w-auto">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
