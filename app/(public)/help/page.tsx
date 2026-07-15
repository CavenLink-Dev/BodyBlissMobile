import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarX,
  CreditCard,
  Lock,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Help & safety — Body Bliss Mobile Massage",
  description:
    "How Body Bliss keeps bookings safe, how cancellations and payments work, and answers to common questions about mobile massage in Adelaide.",
};

/*
  Help & Safety — safety commitments, cancellations, payments, privacy
  summary and a full FAQ. All statements match how the product actually
  behaves (book and pay at checkout — simulated while in demo mode —
  approved-only therapists, address released on confirmation).
*/

const COMMITMENTS = [
  {
    icon: BadgeCheck,
    title: "Vetted therapists only",
    body: "Every therapist is reviewed and approved by Body Bliss before they can appear or take a single booking. Only approved therapists are ever matched to you.",
  },
  {
    icon: Lock,
    title: "Your address stays private",
    body: "Your exact address and access notes are only shared with your therapist once your booking is confirmed — never before.",
  },
  {
    icon: ShieldCheck,
    title: "Professional treatment, always",
    body: "Every service is strictly professional, therapeutic massage. Any inappropriate behaviour — from anyone — ends the appointment immediately, and both you and your therapist can end a session at any time.",
  },
  {
    icon: MessageCircle,
    title: "Support for every booking",
    body: "You can review, manage or cancel any booking from your account, and raise a concern about any booking with us at any time.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How does booking work?",
    a: "Choose your massage and time, tell us where to come, review the details and pay at checkout. Your booking is confirmed straight away and we match a vetted therapist to it.",
  },
  {
    q: "When and how do I pay?",
    a: "You pay by card at checkout when you book. The price you see includes travel, the massage table and all equipment — no hidden fees. (In this demo, payment is simulated and nothing is charged.)",
  },
  {
    q: "How do I cancel or change a booking?",
    a: "Open the booking in your account. Cancellation is free until your therapist is on the way, with a full refund to your original payment method.",
  },
  {
    q: "What should I prepare at home?",
    a: "A quiet room with enough space for a massage table (about the size of a single bed plus room to walk around), somewhere to park, and any notes about pets, stairs or entry. Your therapist brings the table, fresh linens, oils and music.",
  },
  {
    q: "Do I need to share health information?",
    a: "No — it's always optional. Anything you do share is used only to prepare for your appointment and is shared with your therapist once your booking is confirmed. Please do tell your therapist about injuries or allergies before the treatment starts.",
  },
  {
    q: "Is massage right for me?",
    a: "Massage supports general wellbeing — it isn't a medical treatment. If you're pregnant, recovering from injury or surgery, or managing a health condition, check with your health practitioner first, and note it in your booking so we match a suitable therapist.",
  },
  {
    q: "Who will my therapist be?",
    a: "A professional therapist who has been reviewed and approved by Body Bliss. We match the best available therapist to your massage and time; choosing a specific therapist becomes available as our team comes online.",
  },
  {
    q: "Where do you operate?",
    a: "Across the Adelaide metro area, South Australia. Enter your suburb when you book and we'll confirm coverage.",
  },
];

export default function HelpPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-section">
        <header className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Help &amp; Safety
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            Your safety and comfort come first — here&apos;s exactly how
            bookings, payments and cancellations work.
          </p>
        </header>

        {/* Safety commitments */}
        <section aria-labelledby="safety-heading" className="flex flex-col gap-card-gap">
          <h2
            id="safety-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Our Safety Commitments
          </h2>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
            {COMMITMENTS.map((c) => (
              <Card key={c.title} variant="row" className="items-start">
                <span
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <c.icon className="size-6 text-primary" />
                </span>
                <div className="flex flex-col gap-compact">
                  <CardTitle className="text-subtitle">{c.title}</CardTitle>
                  <CardDescription>{c.body}</CardDescription>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Cancellations & payments, side by side */}
        <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-2">
          <section aria-labelledby="cancel-heading">
            <Card className="flex h-full flex-col gap-component">
              <div className="flex items-center gap-component">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <CalendarX className="size-6 text-primary" />
                </span>
                <h2
                  id="cancel-heading"
                  className="font-heading text-subtitle text-bb-text-subtitle"
                >
                  Cancellations
                </h2>
              </div>
              <CardDescription>
                Cancel free of charge from your account until your therapist
                is on the way, with a full refund to your original payment
                method. If your therapist becomes unavailable, we&apos;ll offer
                an alternative or cancel with a full refund.
              </CardDescription>
            </Card>
          </section>

          <section aria-labelledby="pay-heading">
            <Card className="flex h-full flex-col gap-component">
              <div className="flex items-center gap-component">
                <span
                  className="inline-flex size-11 items-center justify-center rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <CreditCard className="size-6 text-primary" />
                </span>
                <h2
                  id="pay-heading"
                  className="font-heading text-subtitle text-bb-text-subtitle"
                >
                  Payments
                </h2>
              </div>
              <CardDescription>
                Pay securely by card at checkout. The price you see includes
                travel, the table and all equipment — no hidden fees, ever.
                (Payments are simulated in this demo; nothing is charged.)
              </CardDescription>
            </Card>
          </section>
        </div>

        {/* FAQ */}
        <section aria-labelledby="faq-heading" className="flex flex-col gap-card-gap">
          <h2
            id="faq-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-component">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded border border-border bg-card p-card-padding"
              >
                <summary className="flex min-h-hit-target cursor-pointer list-none items-center justify-between gap-component font-heading text-subtitle text-bb-text-subtitle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  {f.q}
                  <ArrowRight
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-fade group-open:rotate-90"
                  />
                </summary>
                <p className="mt-component max-w-prose text-description text-bb-text-description">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-heading">
          <Card className="flex flex-col items-start gap-component">
            <h2
              id="contact-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Need A Hand?
            </h2>
            <p className="max-w-prose text-description text-bb-text-description">
              Every booking can be managed from your account, and each booking
              confirmation includes how to reach us about that appointment.
              Direct phone and email support details will be published here when
              booking opens.
            </p>
            <Button asChild variant="secondary">
              <Link href="/account">Go to my account</Link>
            </Button>
          </Card>
        </section>

        {/* Legal links */}
        <p className="max-w-prose text-description text-bb-text-description">
          The fine print lives in our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
