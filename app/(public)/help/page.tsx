import type { Metadata } from "next";

export const metadata: Metadata = { title: "Help & safety — Body Bliss Mobile Massage" };

/*
  Help & Safety shell. Policy wording, cancellation rules and screening
  detail are owner-approved content — placeholders only until provided.
*/

export default function HelpPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-component">
        <h1 className="font-heading text-display text-bb-text-display">
          Help &amp; Safety
        </h1>
        <p className="max-w-prose text-description text-bb-text-description">
          Your safety and comfort come first. Every therapist is vetted before
          they can take bookings, and you can contact us about any booking at
          any time.
        </p>
        <p className="max-w-prose text-description text-bb-text-description">
          Our full policies — including cancellations and refunds — will be
          published here before booking opens.
        </p>
      </div>
    </main>
  );
}
