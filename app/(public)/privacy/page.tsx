import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy — Body Bliss Mobile Massage",
  description:
    "How Body Bliss Mobile Massage collects, uses and protects your personal information.",
};

/*
  Privacy policy — written to match how the product actually handles data:
  Supabase auth + bookings, essential cookies only, address shared with the
  therapist only on confirmation, optional health/access notes.
*/

const SECTIONS: { heading: string; paragraphs: string[] }[] = [
  {
    heading: "1. What we collect",
    paragraphs: [
      "Account details: your name, email address and password (stored securely by our authentication provider — we never see your password).",
      "Booking details: the address for your massage, parking and access notes, your preferred date and time, and the service you choose.",
      "Optional notes: anything you choose to tell us — such as accessibility needs, pressure preferences, allergies or health information. You never have to share health information; share only what you're comfortable with.",
    ],
  },
  {
    heading: "2. How we use it",
    paragraphs: [
      "We use your information to arrange and deliver your booking: matching a therapist, confirming your appointment, and helping the therapist arrive prepared. We also use your email to send booking-related messages and, only if you opt in, launch updates like gift-card availability.",
      "We do not sell your personal information, and we don't use it for third-party advertising.",
    ],
  },
  {
    heading: "3. Who sees your address",
    paragraphs: [
      "Your exact address and access notes are only shared with your therapist once your booking is confirmed. Until then, they stay within Body Bliss.",
    ],
  },
  {
    heading: "4. Cookies",
    paragraphs: [
      "We only use essential cookies — they keep you signed in and make bookings work. We don't use advertising or tracking cookies. If that ever changes, we'll ask for your consent first.",
    ],
  },
  {
    heading: "5. Storage and security",
    paragraphs: [
      "Your data is stored with our database and authentication provider (Supabase) with access controls that limit every record to the people who need it — you can only see your own bookings, and therapists can only see bookings assigned to them. Data is encrypted in transit.",
    ],
  },
  {
    heading: "6. Your rights",
    paragraphs: [
      "We handle personal information in line with the Australian Privacy Principles under the Privacy Act 1988 (Cth). You can access and update your details from your account, and you can ask us to correct or delete your information at any time via Help & safety.",
      "If you have a privacy concern we can't resolve, you can contact the Office of the Australian Information Commissioner (OAIC).",
    ],
  },
  {
    heading: "7. Changes to this policy",
    paragraphs: [
      "We may update this policy from time to time — the latest version always lives on this page, with the date below the heading.",
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
            What we collect, why, and who can see it — in plain English.
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
