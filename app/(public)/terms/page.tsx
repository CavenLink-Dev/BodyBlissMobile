import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & conditions | Body Bliss Mobile Massage",
  description:
    "The terms and conditions for booking a Body Bliss mobile massage in Adelaide.",
};

/* Booking terms — plain-English. */

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "1. Who we are",
    paragraphs: [
      "Body Bliss Mobile Massage (\"Body Bliss\", \"we\", \"us\") arranges professional mobile massage services delivered by approved therapists at your home, hotel, workplace or event within the Adelaide metropolitan area and selected Adelaide Hills suburbs, South Australia.",
    ],
  },
  {
    heading: "2. Eligibility",
    paragraphs: [
      "You must be 18 or older to make a booking. Massage for a person under 18 requires a parent or guardian to make the booking and be present for the entire appointment.",
    ],
  },
  {
    heading: "3. Accounts and guest bookings",
    paragraphs: [
      "You can book with a free account or as a guest. Either way, you're responsible for making sure the information in your booking, address, access notes, contact details, is accurate. Account holders are also responsible for keeping their sign-in details secure.",
      "Your exact address is only shared with your therapist once your booking is confirmed. See our Privacy Policy for how we handle your information.",
    ],
  },
  {
    heading: "4. Booking confirmation and therapist matching",
    paragraphs: [
      "Your booking is confirmed at checkout. You can choose a specific therapist or let us match you; either way, only approved therapists are ever assigned. If your chosen therapist becomes unavailable, we'll offer a suitable substitute, an alternative time, or a full refund, your choice.",
      "If no therapist is available for your time, we'll offer an alternative or refund you in full.",
    ],
  },
  {
    heading: "5. Pricing, GST and additional charges",
    paragraphs: [
      "The price shown at checkout is the price you pay. It includes GST, the therapist's travel within the standard metro area, the massage table and all equipment.",
      "Suburbs outside the standard area attract a travel fee, always shown in your total before you pay. If unavoidable paid parking applies at your location, any estimate is flagged before checkout, surprise charges are never added afterwards.",
    ],
  },
  {
    heading: "6. Running late",
    paragraphs: [
      "If you're not ready or reachable at the booked time, your therapist will wait up to 15 minutes; the lost time comes off the treatment. Past 15 minutes the booking may be treated as a no-show.",
      "If your therapist is running late, we'll let you know as early as we can. You'll always receive your full booked treatment time, or a partial refund if that's not possible.",
    ],
  },
  {
    heading: "7. Cancellations, no-shows and refunds",
    paragraphs: [
      "You can cancel free of charge from your account (or via support for guest bookings) until your therapist is on the way, with a full refund to your original payment method. Cancellations after your therapist has departed may incur the travel component; no-shows may be charged in full.",
      "Refunds are processed to the original payment method within 5 to 7 business days. Amounts paid by gift card are refunded to the gift card.",
    ],
  },
  {
    heading: "8. Your space: safety, pets and smoking",
    paragraphs: [
      "You agree to provide a safe, clean, appropriate space for a professional treatment, as confirmed during booking. Therapists may decline or end an appointment at a location they reasonably consider unsafe or unsanitary; where the concern couldn't have been disclosed to us in advance, the booking may be charged.",
      "Please secure pets that may interfere with the treatment, and don't smoke in the treatment space during the appointment. Tell us about pets in your booking notes so your therapist knows what to expect.",
    ],
  },
  {
    heading: "9. Professional conduct, intoxication and treatment refusal",
    paragraphs: [
      "All Body Bliss services are strictly professional, therapeutic massage. Any request or behaviour of a sexual nature ends the appointment immediately, with the full price payable, and results in a permanent ban. We may report unlawful behaviour to the police.",
      "Therapists may decline or end a treatment if a customer appears intoxicated or otherwise unable to safely receive massage, or if anyone present behaves disrespectfully. You may end an appointment at any time if you feel uncomfortable, and both you and your therapist can raise any concern with us afterwards.",
      "The same standards bind our therapists: identity-checked, professionally presented, and required to follow our code of conduct at every appointment.",
    ],
  },
  {
    heading: "10. Health disclosures",
    paragraphs: [
      "Massage is a wellbeing service, not a medical treatment, and nothing on this website is medical advice. Tell your therapist about any injuries, medical conditions, allergies or pregnancy before your treatment, and check with your health practitioner first if you're unsure whether massage is right for you.",
      "Therapists may adapt or decline a treatment where health information disclosed suggests massage isn't appropriate; in that case you'll receive a full refund of any undelivered service.",
    ],
  },
  {
    heading: "11. Hotels, workplaces and events",
    paragraphs: [
      "For hotel bookings, you're responsible for making sure the hotel permits in-room therapists and for providing your room details. For workplaces and events, you're responsible for venue permissions, a suitable space and reasonable access (parking, lifts, sign-in).",
    ],
  },
  {
    heading: "12. Gift cards and promotional codes",
    paragraphs: [
      "Gift cards are valid for three years from purchase, redeemable against any Body Bliss mobile massage service, and not redeemable for cash. Remaining balances stay on the card. Treat gift card codes like cash.",
      "Promotional codes are one per booking unless stated otherwise, can't be exchanged for cash, and may be withdrawn at any time before use.",
    ],
  },
  {
    heading: "13. Group and event bookings",
    paragraphs: [
      "Larger group and event bookings may be quoted individually and confirmed in writing. Where a written quote is provided, its terms apply alongside these terms; if they differ, the quote prevails.",
    ],
  },
  {
    heading: "14. Reviews",
    paragraphs: [
      "Reviews must relate to a genuine booking and be honest and respectful. We may decline to publish reviews containing personal attacks, discriminatory language or unrelated content, and we never edit the substance of a review.",
    ],
  },
  {
    heading: "15. Technical failures",
    paragraphs: [
      "If a technical fault on our side causes a booking error, a double booking, wrong price or failed confirmation, we'll fix it, honour the correct arrangement where reasonable, or refund you in full. We're not liable for failures of your device or internet connection.",
    ],
  },
  {
    heading: "16. Complaints",
    paragraphs: [
      "If something isn't right, tell us via Help & Safety and we'll acknowledge your complaint within one business day and work with you to resolve it. Nothing in this process limits your rights under Australian Consumer Law.",
    ],
  },
  {
    heading: "17. Consumer rights and our liability",
    paragraphs: [
      "Nothing in these terms excludes, restricts or modifies any consumer guarantee, right or remedy you have under the Australian Consumer Law that cannot lawfully be excluded. Our services come with guarantees that they will be provided with due care and skill.",
      "To the extent permitted by law, our liability for any claim arising from a booking is limited to resupplying the service or refunding the amount you paid for it.",
    ],
  },
  {
    heading: "18. Changes and governing law",
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
