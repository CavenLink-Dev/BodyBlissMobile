import type { Metadata } from "next";

export const metadata: Metadata = { title: "Therapists — Body Bliss Mobile Massage" };

export default function TherapistsPage() {
  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-content flex-col gap-component">
        <h1 className="font-heading text-display text-bb-text-display">
          Our Therapists
        </h1>
        <p className="max-w-prose text-description text-bb-text-description">
          Every therapist is vetted before they can take bookings. Therapist
          profiles will appear here when booking opens.
        </p>
      </div>
    </main>
  );
}
