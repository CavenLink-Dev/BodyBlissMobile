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

/*
  Mobile pricing, anchored to the owner's target of $149.99 for a one hour
  relaxation massage. The gaps between services mirror the real Body Bliss
  Prospect price list (relaxation < deep tissue < remedial), and the levels
  sit inside the going Adelaide mobile massage range. Prices include
  travel (metro), table and equipment.
*/
const STATIC_SERVICES: StaticService[] = [
  {
    code: "relaxation",
    name: "Relaxation Massage",
    description:
      "Gentle, flowing massage to calm the nervous system and unwind. Long, soothing strokes ease everyday stress and leave you feeling rested and radiant.",
    variants: [
      [60, 14999],
      [90, 19999],
      [120, 24999],
    ],
  },
  {
    code: "deep_tissue",
    name: "Deep Tissue Massage",
    description:
      "Firmer, focused pressure for deeper muscle tension and knots. Ideal after training, heavy work or long desk days, when muscles need real attention.",
    variants: [
      [60, 15999],
      [90, 20999],
    ],
  },
  {
    code: "remedial",
    name: "Remedial Massage",
    description:
      "Assessment-based treatment targeting specific problem areas. Your therapist works through pain, injury or restricted movement with techniques chosen for you.",
    variants: [
      [60, 16999],
      [90, 21999],
    ],
  },
  {
    code: "pregnancy",
    name: "Pregnancy Massage",
    description:
      "Adapted for each trimester, with suitably experienced therapists. Supportive positioning and gentle pressure ease the aches that come with pregnancy.",
    variants: [
      [60, 15999],
      [90, 20999],
    ],
  },
  {
    code: "couples",
    name: "Couples Massage",
    description:
      "Two therapists, side by side, in the comfort of your own space. A shared hour of calm for partners, friends or family — no waiting rooms, no driving home after.",
    variants: [
      [60, 28999],
      [90, 38999],
    ],
  },
];

/* Upcoming treatments — shown on the services page as "Coming Soon".
   Not bookable; their detail pages render a polished coming-soon view. */
export type ComingSoonService = {
  code: string;
  name: string;
  description: string;
};

export const COMING_SOON_SERVICES: ComingSoonService[] = [
  {
    code: "hot_stone",
    name: "Hot Stone Massage",
    description:
      "Warmed basalt stones combined with massage to melt deep tension. Coming to mobile bookings soon — available today at our day spas.",
  },
  {
    code: "chiropractic",
    name: "Chiropractic Care",
    description:
      "Mobile chiropractic adjustments and spinal-health consultations, delivered at home.",
  },
  {
    code: "dry-needling",
    name: "Dry Needling",
    description:
      "Fine-needle trigger-point therapy for stubborn muscle tension, by qualified practitioners.",
  },
  {
    code: "cupping",
    name: "Cupping Therapy",
    description:
      "Traditional cupping to ease tight muscles and support recovery, in your own space.",
  },
];

export function getComingSoonService(code: string): ComingSoonService | undefined {
  return COMING_SOON_SERVICES.find((s) => s.code === code);
}

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
