import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, ClipboardCheck, UserCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Therapists — Body Bliss Mobile Massage",
  description:
    "How Body Bliss reviews and approves mobile massage therapists before they can take bookings.",
};

/*
  Therapists — honest, no fabricated profiles, ratings or verification claims.
  The system only ever displays therapists whose status is 'approved' (enforced
  by RLS). Real profiles will appear here as therapists come online.
*/

const CHECKS = [
  {
    icon: ClipboardCheck,
    title: "Application & review",
    body: "Therapists apply and are reviewed before they can appear or take bookings.",
  },
  {
    icon: UserCheck,
    title: "Approved-only visibility",
    body: "Only approved therapists are ever shown or matched to a booking.",
  },
  {
    icon: BadgeCheck,
    title: "Your choice",
    body: "When you book, you can let us match you or choose a therapist yourself.",
  },
];

export default function TherapistsPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <div className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Our Therapists
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Every therapist is reviewed and approved before they can take
            bookings. We&apos;re bringing our therapist team online now — real
            profiles will appear here soon.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
          {CHECKS.map((c) => (
            <Card key={c.title} className="flex h-full flex-col gap-component">
              <span
                className="inline-flex size-12 items-center justify-center rounded-full bg-muted"
                aria-hidden="true"
              >
                <c.icon className="size-6 text-primary" />
              </span>
              <CardTitle className="text-subtitle">{c.title}</CardTitle>
              <CardDescription>{c.body}</CardDescription>
            </Card>
          ))}
        </div>

        <section aria-labelledby="therapists-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="therapists-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Ready to book?
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Let us match you with the best available therapist for your massage
              and time.
            </p>
            <Button asChild variant="secondary">
              <Link href="/book">Book Now</Link>
            </Button>
          </Card>
        </section>
      </div>
    </main>
  );
}
