import type { Metadata } from "next";
import Link from "next/link";
import { FlaskConical } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy policy | Body Bliss Mobile Massage",
  description:
    "How Body Bliss Mobile Massage collects, uses and protects your personal information.",
};

/*
  Privacy policy — plain-English demonstration policy matching how the
  prototype handles data, flagged as placeholder content requiring review
  before commercial launch.
*/

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "1. What we collect",
    paragraphs: [
      "Account details: your name, email address, phone number and password (stored securely by our authentication provider, we never see your password). Guest bookings collect the same contact details without creating an account.",
      "Booking details: the address for your massage, parking and access notes, your preferred date and time, the service you choose, and any therapist preference.",
      "Optional health information: anything you choose to tell us, accessibility needs, pressure preferences, allergies, pregnancy, injuries or conditions. This is sensitive information, and you never have to share it; share only what you're comfortable with, and we only ask for it to prepare your treatment safely.",
      "Payment information: handled entirely by our payment provider, full card numbers never touch our systems. (In this prototype, payment is simulated and no card details are collected at all.)",
    ],
  },
  {
    heading: "2. How we use it",
    paragraphs: [
      "We use your information to arrange and deliver your booking: matching a therapist, confirming your appointment, and helping the therapist arrive prepared. We use your email and phone for booking-related messages, and for marketing only if you opt in, you can opt out any time from your account.",
      "We do not sell your personal information, and we don't use it for third-party advertising.",
    ],
  },
  {
    heading: "3. What your therapist sees",
    paragraphs: [
      "Your exact address, access notes and the treatment notes you consented to share are provided to your assigned therapist once your booking is confirmed, never before, and never to anyone else. Therapists only ever see the bookings assigned to them.",
    ],
  },
  {
    heading: "4. Data retention and deletion",
    paragraphs: [
      "We keep booking records for as long as needed to provide the service and meet legal obligations (such as tax record-keeping), then delete or de-identify them. Optional health notes are kept only as long as they're relevant to your bookings.",
      "You can ask us to delete your account and personal information at any time via Help & Safety. We'll confirm what's been deleted and what must be retained (and for how long) to meet legal obligations.",
    ],
  },
  {
    heading: "5. Cookies and analytics",
    paragraphs: [
      "We only use essential cookies, they keep you signed in and make bookings work. We don't currently use advertising or tracking cookies. If we introduce analytics in future, we'll use a privacy-respecting configuration and ask for your consent first.",
    ],
  },
  {
    heading: "6. Storage, security and overseas access",
    paragraphs: [
      "Your data is stored with our database and authentication provider with access controls that limit every record to the people who need it, you can only see your own bookings, and therapists can only see bookings assigned to them. Data is encrypted in transit.",
      "Our providers host data in Australia where available. Where a provider processes data overseas, we take reasonable steps to ensure it's handled consistently with the Australian Privacy Principles.",
    ],
  },
  {
    heading: "7. Your rights: access and correction",
    paragraphs: [
      "We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth). You can access and update your details from your account, and you can ask us to access, correct or delete your information at any time via Help & Safety.",
    ],
  },
  {
    heading: "8. Data breaches",
    paragraphs: [
      "If a data breach occurs that's likely to result in serious harm, we'll notify affected customers and the Office of the Australian Information Commissioner (OAIC) as required by the Notifiable Data Breaches scheme, and tell you clearly what happened and what we're doing about it.",
    ],
  },
  {
    heading: "9. Children and minors",
    paragraphs: [
      "Our services and accounts are for adults (18+). We don't knowingly collect personal information from children. Bookings for a person under 18 must be made by a parent or guardian, who provides any relevant information on their behalf.",
    ],
  },
  {
    heading: "10. Privacy complaints and contact",
    paragraphs: [
      "If you have a privacy question or complaint, contact us via Help & Safety (sample contact: privacy@bodyblissmobile.example) and we'll respond within a reasonable time. If we can't resolve your concern, you can contact the Office of the Australian Information Commissioner (OAIC).",
    ],
  },
  {
    heading: "11. Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time, the latest version always lives on this page, with the date below the heading.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-section">
        <header className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Privacy Policy
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            What we collect, why, and who can see it, in plain English.
          </p>
          <p className="text-caption text-bb-text-caption">
            Last updated 14 July 2026
          </p>
          <p
            className="flex max-w-prose items-start gap-compact rounded border border-border bg-card p-3 text-description text-bb-text-description"
            role="note"
          >
            <FlaskConical aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
            <span>
              <span className="font-medium text-bb-text-display">
                Demonstration content.
              </span>{" "}
              This policy is placeholder content for this prototype and would
              require professional review before any commercial launch.
            </span>
          </p>
        </header>

        <div className="flex flex-col gap-section">
          {SECTIONS.map((s) => (
            <section key={s.heading} className="flex flex-col gap-component">
              <h2 className="font-heading text-title font-semibold text-bb-text-title">
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="max-w-prose text-description text-bb-text-description">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="max-w-prose text-description text-bb-text-description">
          See also our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link
            href="/help"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Help &amp; safety
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
