import { createClient } from "@/lib/supabase/server";
import type {
  ServiceVariant,
  ServiceWithPricing,
} from "@/lib/catalogue-types";

/*
  Read-side data access for the public service catalogue. RLS allows anyone
  (even signed-out) to read active services + variants and all base prices,
  so the standard SSR client is fine here — no service-role key involved.
*/

export type { ServiceVariant, ServiceWithPricing } from "@/lib/catalogue-types";

type Row = {
  id: string;
  code: string;
  name: string;
  description: string;
  sort_order: number;
  service_variants: {
    id: string;
    duration_minutes: number;
    active: boolean;
    base_prices: {
      price_cents: number;
      effective_from: string;
      effective_to: string | null;
    }[];
  }[];
};

function currentPriceCents(
  prices: Row["service_variants"][number]["base_prices"],
): number | null {
  const today = new Date().toISOString().slice(0, 10);
  const current = prices
    .filter((p) => p.effective_from <= today && (!p.effective_to || p.effective_to >= today))
    .sort((a, b) => (a.effective_from < b.effective_from ? 1 : -1));
  return current.length ? current[0].price_cents : null;
}

export async function getServicesWithPricing(): Promise<ServiceWithPricing[]> {
  let data: Row[] | null = null;
  try {
    const supabase = await createClient();
    const res = await supabase
      .from("services")
      .select(
        "id, code, name, description, sort_order, service_variants(id, duration_minutes, active, base_prices(price_cents, effective_from, effective_to))",
      )
      .eq("active", true)
      .order("sort_order");
    if (res.error) return [];
    data = res.data as Row[];
  } catch {
    return [];
  }
  if (!data) return [];

  return (data as Row[]).map((s) => {
    const variants: ServiceVariant[] = s.service_variants
      .filter((v) => v.active)
      .sort((a, b) => a.duration_minutes - b.duration_minutes)
      .map((v) => ({
        id: v.id,
        durationMinutes: v.duration_minutes,
        priceCents: currentPriceCents(v.base_prices),
      }));

    const prices = variants
      .map((v) => v.priceCents)
      .filter((p): p is number => p != null);

    return {
      id: s.id,
      code: s.code,
      name: s.name,
      description: s.description,
      variants,
      fromPriceCents: prices.length ? Math.min(...prices) : null,
    };
  });
}

/* Active service-area suburbs (public read via RLS). Fail-soft to []. */
export async function getActiveSuburbs(): Promise<string[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("suburbs")
      .select("name")
      .eq("active", true)
      .order("name");
    if (error || !data) return [];
    return data.map((s) => s.name as string);
  } catch {
    return [];
  }
}
