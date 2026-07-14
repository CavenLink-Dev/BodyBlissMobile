import { createClient } from "@/lib/supabase/server";

/*
  Account read-side data. All queries run through the RLS-scoped SSR client,
  so a customer only ever sees their own bookings and addresses.
*/

export type MyBooking = {
  id: string;
  status: string;
  requestedStart: string;
  locationType: string;
  serviceName: string | null;
  durationMinutes: number | null;
  priceCents: number | null;
};

export type MyAddress = {
  id: string;
  label: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
};

const ACTIVE_STATUSES = ["requested", "matched", "confirmed", "on_the_way"];

export async function getMyBookings(): Promise<{
  upcoming: MyBooking[];
  past: MyBooking[];
}> {
  let data;
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { upcoming: [], past: [] };

    const res = await supabase
      .from("bookings")
      .select(
        "id, status, requested_start, location_type, service_name_snapshot, duration_minutes_snapshot, price_cents_snapshot",
      )
      .order("requested_start", { ascending: false });
    if (res.error) return { upcoming: [], past: [] };
    data = res.data;
  } catch {
    return { upcoming: [], past: [] };
  }
  if (!data) return { upcoming: [], past: [] };

  const now = Date.now();
  const rows: MyBooking[] = data.map((b) => ({
    id: b.id as string,
    status: b.status as string,
    requestedStart: b.requested_start as string,
    locationType: b.location_type as string,
    serviceName: (b.service_name_snapshot as string | null) ?? null,
    durationMinutes: (b.duration_minutes_snapshot as number | null) ?? null,
    priceCents: (b.price_cents_snapshot as number | null) ?? null,
  }));

  const upcoming = rows.filter(
    (b) =>
      ACTIVE_STATUSES.includes(b.status) &&
      new Date(b.requestedStart).getTime() >= now,
  );
  const past = rows.filter((b) => !upcoming.includes(b));

  return { upcoming, past };
}

export async function getMyAddresses(): Promise<MyAddress[]> {
  let data;
  try {
    const supabase = await createClient();
    const res = await supabase
      .from("customer_addresses")
      .select("id, label, street_address, suburb, postcode")
      .order("created_at", { ascending: false });
    if (res.error) return [];
    data = res.data;
  } catch {
    return [];
  }
  if (!data) return [];
  return data.map((a) => ({
    id: a.id as string,
    label: (a.label as string) || "Saved address",
    streetAddress: a.street_address as string,
    suburb: a.suburb as string,
    postcode: a.postcode as string,
  }));
}
