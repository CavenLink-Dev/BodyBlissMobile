import type { Metadata } from "next";
import Link from "next/link";
import { Armchair, Building2, Clock, Sparkles } from "lucide-react";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { CorporateQuoteForm } from "@/components/corporate-quote-form";

export const metadata: Metadata = {
  title: "Corporate massage — Body Bliss Mobile Massage",
  description:
    "Chair massage for Adelaide workplaces, conferences and events. Request a tailored corporate quote from Body Bliss.",
};

const POINTS = [
  {
    icon: Armchair,
    title: "Purpose-built chairs",
    body: "Seated, fully-clothed neck, shoulder and back treatments — no oils, no mess, straight back to work.",
  },
  {
    icon: Clock,
    title: "Flexible scheduling",
    body: "Sessions from 10 to 30 minutes per person, one-off events or a recurring wellbeing program.",
  },
  {
    icon: Building2,
    title: "Minimal footprint",
    body: "Each therapist needs a quiet corner roughly two metres square. We handle set-up and pack-down.",
  },
  {
    icon: Sparkles,
    title: "Invoiced simply",
    body: "One invoice for the whole event, with purchase-order support for larger organisations.",
  },
];

export default function CorporatePage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <header className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Corporate Chair Massage
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Bring Body Bliss to your workplace, conference or client event.
            Tell us about your team and we&apos;ll put together a tailored
            quote — corporate bookings are quoted rather than booked through
            the standard checkout.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
          {POINTS.map((p) => (
            <Card key={p.title} variant="row" className="items-start">
              <span
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-muted"
                aria-hidden="true"
              >
                <p.icon className="size-6 text-primary" />
              </span>
              <div className="flex flex-col gap-compact">
                <CardTitle className="text-subtitle">{p.title}</CardTitle>
                <CardDescription>{p.body}</CardDescription>
              </div>
            </Card>
          ))}
        </div>

        <CorporateQuoteForm />

        <p className="max-w-prose text-description text-bb-text-description">
          Curious what a session feels like? See the{" "}
          <Link
            href="/services/corporate"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            corporate chair massage service page
          </Link>{" "}
          for what&apos;s included, or{" "}
          <Link
            href="/help"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            contact support
          </Link>{" "}
          with any questions.
        </p>
      </div>
    </main>
  );
}
