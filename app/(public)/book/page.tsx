import type { Metadata } from "next";

import { BookingFlow } from "@/components/booking/booking-flow";

export const metadata: Metadata = {
  title: "Book a massage — Body Bliss Mobile Massage",
  description:
    "Start your Body Bliss mobile massage booking: share your location and access details, then choose your massage and therapist.",
};

/*
  Booking page — hosts the multi-step BookingFlow. This is a working preview
  of the flow; online payment and confirmation are added when booking opens.
*/

export default function BookPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-card-gap">
        <div className="flex flex-col gap-compact">
          <h1 className="font-heading text-display text-bb-text-display">
            Book A Massage
          </h1>
          <p className="max-w-prose text-description text-bb-text-description">
            It takes a couple of minutes. Start with where you&apos;d like your
            massage, then choose your therapist.
          </p>
        </div>
        <BookingFlow />
      </div>
    </main>
  );
}
