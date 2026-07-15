import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & conditions — Body Bliss Mobile Massage",
  description:
    "The terms and conditions for booking a Body Bliss mobile massage in Adelaide.",
};

/*
  Booking terms — written to match exactly how the product behaves today
  (book and pay at checkout; payments are simulated while in demo mode).
  Plain English, headed sections, description-size text throughout (never
  caption-size — legal terms are essential information).
*/

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "1. Who we are",
    paragraphs: [
      "Body Bliss Mobile Massage (\"Body Bliss\", \"we\", \"us\") arranges professional mobile massage services delivered by vetted therapists at your home, hotel or workplace within the Adelaide metropolitan area, South Australia. Body Bliss Mobile Massage is operated by the team behind Body Bliss Massage & Day Spa.",
    ],
  },
  {
    heading: "2. How booking works",
    paragraphs: [
      "You book online: choose your massage, tell us where to come, review the details and pay at checkout. Your booking is confirmed immediately and we match a vetted therapist to it. If no therapist is available for your time, we'll offer an alternative or refund you in full.",
      "The price you see is the price you pay — it includes the therapist's travel, the massage table and all equipment. There are no hidden fees.",
    ],
  },
  {
    heading: "3. Your account and your details",
    paragraphs: [
      "You need a free account to book so you can view, manage and cancel your bookings. You're responsible for keeping your sign-in details secure and for making sure the information in your booking (address, access notes, contact details) is accurate.",
      "Your exact address is only shared with your therapist once your booking is confirmed. See our Privacy Policy for how we handle your information.",
    ],
  },
  {
    heading: "4. Cancellations and changes",
    paragraphs: [
      "You can cancel from your account free of charge until your therapist is on the way; you'll receive a full refund to your original payment method. If you need to change a booking, contact us as early as possible and we'll do our best to accommodate you.",
      "If a therapist becomes unavailable, we'll offer you an alternative therapist or time, or cancel with a full refund.",
    ],
  },
  {
    heading: "5. Health, safety and conduct",
    paragraphs: [
      "Massage is a wellbeing service, not a medical treatment. Tell your therapist about any injuries, medical conditions, allergies or pregnancy before your treatment — and check with your health practitioner first if you're unsure whether massage is right for you.",
      "All Body Bliss services are strictly professional, therapeutic massage. Any request or behaviour of a sexual nature ends the appointment immediately, with the full price payable, and will result in a permanent ban. Our therapists may also end an appointment if they feel unsafe, and you may end an appointment at any time if you feel uncomfortable.",
      "Please provide a safe, appropriate space for your treatment as described in your booking, and make sure anyone present behaves respectfully towards your therapist.",
    ],
  },
  {
    heading: "6. Therapists",
    paragraphs: [
      "Therapists are reviewed and approved by Body Bliss before they can take bookings. Only approved therapists ever appear on the platform or are matched to bookings.",
    ],
  },
  {
    heading: "7. Our liability",
    paragraphs: [
      "Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy you have under the Australian Consumer Law that cannot lawfully be excluded. Our services come with guarantees that they will be provided with due care and skill.",
      "To the extent permitted by law, our liability for any claim arising from a booking is limited to resupplying the service or refunding the amount you paid for it.",
    ],
  },
  {
    heading: "8. Changes to these terms",
    paragraphs: [
      "We may update these terms from time to time. The version published on this page at the time you book is the version that applies to that booking. These terms are governed by the laws of South Australia.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-section">
        <header className="flex flex-col gap-component">
          <h1 className="font-heading text-display text-bb-text-display">
            Terms &amp; Conditions
          </h1>
          <p className="max-w-prose text-subtitle text-bb-text-subtitle">
            The plain-English terms that apply when you book with Body Bliss
            Mobile Massage.
          </p>
          <p className="text-caption text-bb-text-caption">
            Last updated 14 July 2026
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
          Questions about these terms? See{" "}
          <Link
            href="/help"
            className="underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Help &amp; safety
          </Link>{" "}
          or read our{" "}
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
