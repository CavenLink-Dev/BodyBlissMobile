import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { TherapistDirectory } from "@/components/therapists/therapist-directory";
import { APPROVAL_STEPS } from "@/lib/therapists";

export const metadata: Metadata = {
  title: "Therapists | Body Bliss Mobile Massage",
  description:
    "Meet the Body Bliss mobile massage team, filter by massage type and gender, and see how therapists are reviewed and approved.",
};

export default function TherapistsPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <header className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Our Therapists
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Every Body Bliss therapist is reviewed and approved before they can
            take a single booking. Browse the team, filter by what matters to
            you, or let us match you when you book.
          </p>
          <p
            className="flex max-w-prose items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description"
            role="note"
          >
            <FlaskConical aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              <span className="font-medium text-bb-text-display">
                Sample profiles.
              </span>{" "}
              The therapists below are fictional demonstration profiles showing
              how the live team page will work.
            </span>
          </p>
        </header>

        <TherapistDirectory />

        {/* Approval process */}
        <section aria-labelledby="approval-heading" className="flex flex-col gap-card-gap">
          <SectionHeading
            id="approval-heading"
            eyebrow="Quality"
            title="How Therapists Are Approved"
          />
          <p className="max-w-prose text-description text-bb-text-description">
            Being invited into someone&apos;s home is a privilege, so our bar is
            deliberately high. Every therapist completes all eight steps below
            before their profile can appear or a booking can be assigned.
          </p>
          <ol className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
            {APPROVAL_STEPS.map((step, i) => (
              <li key={step.title}>
                <Card variant="row" className="h-full items-start">
                  <span
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary font-heading text-subtitle font-semibold text-secondary-foreground"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-compact">
                    <h3 className="font-heading text-subtitle text-bb-text-subtitle">
                      {step.title}
                    </h3>
                    <p className="text-description text-bb-text-description">
                      {step.body}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* CTA */}
        <section aria-labelledby="therapists-cta">
          <Card variant="highlight" className="flex flex-col items-start gap-component">
            <h2
              id="therapists-cta"
              className="font-heading text-title font-semibold text-primary-foreground"
            >
              Ready To Book?
            </h2>
            <p className="max-w-prose text-description text-primary-foreground">
              Choose a therapist above, or let Body Bliss match you with the
              best available therapist for your massage and time.
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
