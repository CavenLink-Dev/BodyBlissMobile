import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CalendarX,
  Clock,
  CreditCard,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { ReportConcernForm } from "@/components/report-concern-form";

export const metadata: Metadata = {
  title: "Help & safety | Body Bliss Mobile Massage",
  description:
    "Support contacts, safety commitments, cancellations, refunds, complaints and answers to common questions about Body Bliss mobile massage in Adelaide.",
};

const COMMITMENTS = [
  {
    icon: BadgeCheck,
    title: "Approved therapists only",
    body: "Every therapist completes identity, qualification and reference checks before they can appear or take a single booking. Only approved therapists are ever matched to you.",
  },
  {
    icon: Lock,
    title: "Your address stays private",
    body: "Your exact address and access notes are only shared with your therapist once your booking is confirmed, never before.",
  },
  {
    icon: ShieldCheck,
    title: "Professional treatment, always",
    body: "Every service is strictly professional, therapeutic massage. Any inappropriate behaviour, from anyone, ends the appointment immediately, and both you and your therapist can end a session at any time.",
  },
  {
    icon: MessageCircle,
    title: "Support for every booking",
    body: "Manage or cancel any booking from your account, and raise a concern about any booking with us at any time using the form below.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I change a booking?",
    a: "Open the booking in your account and use Manage Booking, or contact support with your booking reference. We'll do our best to accommodate changes to time, address or service, the earlier you ask, the easier it is.",
  },
  {
    q: "How do cancellations work?",
    a: "Cancellation is free from your account until your therapist is on the way, with a full refund to your original payment method. After the therapist has departed, the travel component may apply; no-shows may be charged in full.",
  },
  {
    q: "How do refunds work?",
    a: "Refunds go back to your original payment method within 5 to 7 business days. Amounts paid by gift card return to the gift card. If a refund seems to be missing, contact support with your booking reference.",
  },
  {
    q: "My therapist is running late, what happens?",
    a: "We'll message you as soon as we know. You always receive your full booked treatment time; if that's not possible on the day, we refund the difference. If you can't wait, you can cancel with a full refund.",
  },
  {
    q: "What's expected of me as a customer?",
    a: "A safe, clean space for the treatment, respectful behaviour from everyone present, and accurate booking details. Massage is strictly professional, any inappropriate request or behaviour ends the appointment immediately with the full price payable.",
  },
  {
    q: "What can I expect from my therapist?",
    a: "Identity-checked, qualification-reviewed professionals who follow our code of conduct: on time, professionally presented, respectful of your home and privacy, and clear about the treatment. If anything falls short, tell us.",
  },
  {
    q: "How do you look after personal safety?",
    a: "Both sides of every booking are protected: customers get approved-only therapists and private address handling; therapists get customer conduct standards, location details in advance, and the right to end any appointment where they feel unsafe. Concerns are reviewed by a person, not a form-filler.",
  },
  {
    q: "I'm in a hotel or apartment, how does access work?",
    a: "Add your unit or room number, buzzer or intercom details and parking notes when you book. For hotels, let reception know you're expecting a therapist. Your therapist arrives about 10 minutes early to set up.",
  },
  {
    q: "Where does the therapist park?",
    a: "Wherever you suggest in your parking notes, driveway, street or visitor parking. If paid parking is truly unavoidable, any estimate is flagged before you pay, never surprise-charged afterwards.",
  },
  {
    q: "Do I need to share health information?",
    a: "It's always optional, but it helps your therapist keep you safe and comfortable. Anything you share is used only to prepare for your appointment and goes only to your assigned therapist. Please do mention injuries, allergies or pregnancy before the treatment starts.",
  },
  {
    q: "I left something behind after an appointment / found something",
    a: "Contact support with your booking reference and we'll connect you with your therapist to arrange return of lost property.",
  },
  {
    q: "My gift card isn't working",
    a: "Check the code matches the email exactly (codes look like GIFT-XXXX-XXXX), then try the balance checker on the gift cards page. Still stuck? Contact support with the code and we'll sort it out.",
  },
  {
    q: "How do I make a complaint?",
    a: "Use the Report a Concern form below or email support. We acknowledge complaints within one business day, investigate properly, and come back to you with an outcome. Safety concerns are prioritised ahead of everything else.",
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
            Your safety and comfort come first, here&apos;s how to reach us,
            and exactly how bookings, payments and cancellations work.
          </p>
        </header>

        {/* Contact */}
        <section aria-labelledby="contact-heading" className="flex flex-col gap-card-gap">
          <h2
            id="contact-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Contact Support
          </h2>
          <div className="grid grid-cols-1 gap-card-gap tablet:grid-cols-3">
            <Card variant="row" className="items-start">
              <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-compact">
                <CardTitle className="text-subtitle">Email</CardTitle>
                <CardDescription>support@bodyblissmobile.example</CardDescription>
                <p className="text-caption text-bb-text-caption">
                  Sample address for demonstration.
                </p>
              </div>
            </Card>
            <Card variant="row" className="items-start">
              <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-compact">
                <CardTitle className="text-subtitle">Phone</CardTitle>
                <CardDescription>(08) 8000 0000</CardDescription>
                <p className="text-caption text-bb-text-caption">
                  Sample number for demonstration.
                </p>
              </div>
            </Card>
            <Card variant="row" className="items-start">
              <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              <div className="flex flex-col gap-compact">
                <CardTitle className="text-subtitle">Support hours</CardTitle>
                <CardDescription>
                  Mon to Fri 8am to 8pm, Sat and Sun 9am to 5pm (ACST)
                </CardDescription>
              </div>
            </Card>
          </div>
          <p
            className="flex max-w-prose items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description"
            role="note"
          >
            <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
            <span>
              <span className="font-medium text-bb-text-display">
                Body Bliss is not an emergency or medical service.
              </span>{" "}
              For emergencies, call Triple Zero (000). For urgent health advice,
              contact your doctor or healthdirect on 1800 022 222.
            </span>
          </p>
        </section>

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

        {/* Cancellations & payments */}
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
                Cancel free of charge from your account until your therapist is
                on the way, with a full refund to your original payment method.
                If your therapist becomes unavailable, we&apos;ll offer an
                alternative or cancel with a full refund.
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
                travel (metro), the table and all equipment; any travel fee for
                outer suburbs is shown before you pay. (Payments are simulated
                in this demo; nothing is charged.)
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

        {/* Report a concern */}
        <section aria-labelledby="report-heading" className="flex flex-col gap-card-gap">
          <h2
            id="report-heading"
            className="font-heading text-title font-semibold text-bb-text-title"
          >
            Report A Concern
          </h2>
          <ReportConcernForm />
        </section>

        {/* Account shortcut */}
        <section aria-labelledby="account-cta-heading">
          <Card className="flex flex-col items-start gap-component">
            <h2
              id="account-cta-heading"
              className="font-heading text-title font-semibold text-bb-text-title"
            >
              Manage It Yourself
            </h2>
            <p className="max-w-prose text-description text-bb-text-description">
              Most things, changing, cancelling or rebooking an appointment,
              checking a gift card, updating preferences, can be done straight
              from your account.
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
