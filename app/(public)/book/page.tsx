import type { Metadata } from "next";

export const metadata: Metadata = { title: "Book a massage — Body Bliss Mobile Massage" };

/*
  Booking shell — the flow ("Let us match you" first and largest) arrives
  with the booking build phase. No pricing or policy content here yet.
*/

export default function BookPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-component">
        <h1 className="font-heading text-display text-bb-text-display">
          Book A Massage
        </h1>
        <p className="max-w-prose text-description text-bb-text-description">
          Online booking is not open yet. We are getting our therapists and
          service areas ready.
        </p>
      </div>
    </main>
  );
}
