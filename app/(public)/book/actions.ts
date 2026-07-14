"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/*
  Create a booking REQUEST (no payment). All booking tables are server-write
  only by design, so writes use the service-role admin client — but the
  customer identity always comes from the authenticated session, never from
  the client payload. Returns a discriminated result the client can act on.
*/

const InputSchema = z.object({
  serviceVariantId: z.string().uuid(),
  locationType: z.enum(["home", "hotel", "workplace"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  streetAddress: z.string().min(5).max(200),
  suburb: z.string().min(2).max(100),
  postcode: z.string().regex(/^\d{4}$/),
  state: z.string().min(2).max(10).default("SA"),
  parkingNotes: z.string().max(1000).optional().default(""),
  accessNotes: z.string().max(4000).optional().default(""),
  customerNotes: z.string().max(2000).optional().default(""),
  genderPreference: z.string().max(40).optional().default(""),
  therapistPreference: z.literal("match"),
  acceptTerms: z.literal(true),
});

export type BookingActionResult =
  | { ok: true; bookingId: string }
  | { ok: false; error: "auth" | "validation" | "unavailable" | "server" };

export async function createBookingRequest(
  raw: unknown,
): Promise<BookingActionResult> {
  try {
    return await createBookingRequestInner(raw);
  } catch {
    return { ok: false, error: "server" };
  }
}

async function createBookingRequestInner(
  raw: unknown,
): Promise<BookingActionResult> {
  const parsed = InputSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: "validation" };
  const input = parsed.data;

  // Identity from the session — not the payload.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth" };

  // Resolve service + current indicative price (public-readable).
  const { data: variant } = await supabase
    .from("service_variants")
    .select(
      "id, duration_minutes, services(name), base_prices(price_cents, effective_from, effective_to)",
    )
    .eq("id", input.serviceVariantId)
    .eq("active", true)
    .maybeSingle();

  if (!variant) return { ok: false, error: "unavailable" };

  const servicesRel = variant.services as unknown as
    | { name: string }
    | { name: string }[]
    | null;
  const serviceName = Array.isArray(servicesRel)
    ? (servicesRel[0]?.name ?? "Massage")
    : (servicesRel?.name ?? "Massage");

  const today = new Date().toISOString().slice(0, 10);
  const prices = ((variant.base_prices as unknown as {
    price_cents: number;
    effective_from: string;
    effective_to: string | null;
  }[]) ?? [])
    .filter((p) => p.effective_from <= today && (!p.effective_to || p.effective_to >= today))
    .sort((a, b) => (a.effective_from < b.effective_from ? 1 : -1));
  const priceCents = prices.length ? prices[0].price_cents : null;

  const requestedStart = new Date(`${input.date}T${input.time}:00`);
  if (Number.isNaN(requestedStart.getTime()) || requestedStart.getTime() < Date.now()) {
    return { ok: false, error: "validation" };
  }

  const admin = createAdminClient();

  const { data: booking, error: bookingError } = await admin
    .from("bookings")
    .insert({
      customer_user_id: user.id,
      status: "requested",
      location_type: input.locationType,
      service_variant_id: input.serviceVariantId,
      requested_start: requestedStart.toISOString(),
      gender_preference: input.genderPreference || null,
      customer_notes: input.customerNotes || null,
      service_name_snapshot: serviceName,
      duration_minutes_snapshot: variant.duration_minutes,
      price_cents_snapshot: priceCents,
      address_snapshot: {
        street_address: input.streetAddress,
        suburb: input.suburb,
        postcode: input.postcode,
        state: input.state,
      },
    })
    .select("id")
    .single();

  if (bookingError || !booking) return { ok: false, error: "server" };
  const bookingId = booking.id as string;

  const { error: locationError } = await admin.from("booking_locations").insert({
    booking_id: bookingId,
    street_address: input.streetAddress,
    suburb: input.suburb,
    postcode: input.postcode,
    state: input.state,
    access_notes: input.accessNotes || null,
    parking_notes: input.parkingNotes || null,
  });
  if (locationError) return { ok: false, error: "server" };

  await admin.from("booking_status_history").insert({
    booking_id: bookingId,
    from_status: null,
    to_status: "requested",
    changed_by: user.id,
    reason: "Customer submitted booking request",
  });

  await admin.from("booking_consents").insert({
    booking_id: bookingId,
    consent_type: "booking_terms",
    accepted_by: user.id,
  });

  // Automatic matching requested.
  await admin.from("matching_requests").insert({
    booking_id: bookingId,
    status: "open",
  });

  revalidatePath("/account");
  return { ok: true, bookingId };
}

/* Cancel a booking the signed-in customer owns. */
export async function cancelBooking(bookingId: string): Promise<BookingActionResult> {
  try {
    return await cancelBookingInner(bookingId);
  } catch {
    return { ok: false, error: "server" };
  }
}

async function cancelBookingInner(bookingId: string): Promise<BookingActionResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "auth" };

  // Confirm ownership via the RLS-scoped client before the privileged write.
  const { data: owned } = await supabase
    .from("bookings")
    .select("id, status")
    .eq("id", bookingId)
    .maybeSingle();

  if (!owned) return { ok: false, error: "validation" };
  if (["completed", "cancelled"].includes(owned.status as string)) {
    return { ok: false, error: "validation" };
  }

  const admin = createAdminClient();
  const { error } = await admin
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", bookingId);
  if (error) return { ok: false, error: "server" };

  await admin.from("booking_status_history").insert({
    booking_id: bookingId,
    from_status: owned.status as string,
    to_status: "cancelled",
    changed_by: user.id,
    reason: "Cancelled by customer",
  });

  revalidatePath("/account");
  revalidatePath(`/account/bookings/${bookingId}`);
  return { ok: true, bookingId };
}
