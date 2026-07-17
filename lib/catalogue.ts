import type {
  ServiceVariant,
  ServiceWithPricing,
} from "@/lib/catalogue-types";

/*
  DEMO MODE — static catalogue.

  The site currently runs as a fully clickable demo with no backend, so the
  service catalogue lives here as plain data (same shapes the Supabase reads
  returned). When the real backend is wired up, restore the Supabase queries
  (see DEMO-MODE.md) — every page consumes these two functions, so nothing
  else needs to change.
*/

export type { ServiceVariant, ServiceWithPricing } from "@/lib/catalogue-types";

type StaticService = {
  code: string;
  name: string;
  description: string;
  variants: [number, number][]; // [durationMinutes, priceCents]
};

const STATIC_SERVICES: StaticService[] = [
  {
    code: "relaxation",
    name: "Relaxation Massage",
    description: "Gentle, flowing massage to calm the nervous system and unwind.",
    variants: [
      [60, 11900],
      [90, 16900],
      [120, 21900],
    ],
  },
  {
    code: "deep_tissue",
    name: "Deep Tissue Massage",
    description: "Firmer, focused pressure for deeper muscle tension and knots.",
    variants: [
      [60, 12900],
      [90, 17900],
    ],
  },
  {
    code: "remedial",
    name: "Remedial Massage",
    description: "Assessment-based treatment targeting specific problem areas.",
    variants: [
      [60, 13900],
      [90, 18900],
    ],
  },
  {
    code: "pregnancy",
    name: "Pregnancy Massage",
    description: "Adapted for each trimester, with suitably experienced therapists.",
    variants: [
      [60, 12900],
      [90, 17900],
    ],
  },
  {
    code: "couples",
    name: "Couples Massage",
    description: "Two therapists, side by side, in the comfort of your own space.",
    variants: [
      [60, 23800],
      [90, 33800],
    ],
  },
  {
    code: "hotel",
    name: "Hotel Massage",
    description: "In-room massage for hotel guests staying in Adelaide.",
    variants: [
      [60, 11900],
      [90, 16900],
    ],
  },
  {
    code: "corporate",
    name: "Corporate Chair Massage",
    description: "Seated, fully-clothed massage for workplaces and events.",
    variants: [
      [30, 5900],
      [60, 11500],
    ],
  },
];

function toService(s: StaticService): ServiceWithPricing {
  const variants: ServiceVariant[] = s.variants.map(([minutes, cents]) => ({
    id: `${s.code}-${minutes}`,
    durationMinutes: minutes,
    priceCents: cents,
  }));
  return {
    id: s.code,
    code: s.code,
    name: s.name,
    description: s.description,
    variants,
    fromPriceCents: Math.min(...s.variants.map(([, cents]) => cents)),
  };
}

export const SERVICES: ServiceWithPricing[] = STATIC_SERVICES.map(toService);

/* Async signature preserved so pages don't change when a backend returns. */
export async function getServicesWithPricing(): Promise<ServiceWithPricing[]> {
  return SERVICES;
}
