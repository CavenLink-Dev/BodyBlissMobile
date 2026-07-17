import type { Metadata } from "next";

import { BookingFlow } from "@/components/booking/booking-flow";
import { getServicesWithPricing } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "Book a massage — Body Bliss Mobile Massage",
  description:
    "Book your Body Bliss mobile massage: choose your massage and time, tell us where to come, and check out in minutes.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; variant?: string; therapist?: string }>;
}) {
  const [{ service, variant, therapist }, services] = await Promise.all([
    searchParams,
    getServicesWithPricing(),
  ]);

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-card-gap">
        <div className="flex flex-col gap-compact">
          <h1 className="font-heading text-display text-bb-text-display">
            Book A Massage
          </h1>
          <p className="max-w-prose text-description text-bb-text-description">
            It takes a couple of minutes. Start with your massage and time,
            then tell us where to come.
          </p>
        </div>
        <BookingFlow
          services={services}
          initialServiceCode={service}
          initialVariantId={variant}
          initialTherapistId={therapist}
        />
      </div>
    </main>
  );
}
