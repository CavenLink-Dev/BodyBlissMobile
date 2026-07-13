import type { Metadata } from "next";

import { BookingFlow } from "@/components/booking/booking-flow";
import { getServicesWithPricing } from "@/lib/catalogue";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Book a massage — Body Bliss Mobile Massage",
  description:
    "Start your Body Bliss mobile massage booking: share your location and access details, choose your massage and time, then send your request.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const [{ service }, services, supabase] = await Promise.all([
    searchParams,
    getServicesWithPricing(),
    createClient(),
  ]);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="px-page-inline py-page-block">
      <div className="mx-auto flex max-w-3xl flex-col gap-card-gap">
        <div className="flex flex-col gap-compact">
          <h1 className="font-heading text-display text-bb-text-display">
            Book A Massage
          </h1>
          <p className="max-w-prose text-description text-bb-text-description">
            It takes a couple of minutes. Start with where you&apos;d like your
            massage, then choose your time.
          </p>
        </div>
        <BookingFlow
          services={services}
          initialServiceCode={service}
          isAuthed={Boolean(user)}
        />
      </div>
    </main>
  );
}
