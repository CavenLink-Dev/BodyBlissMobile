"use client";

import * as React from "react";

/*
  DEMO MODE — browser-only "backend".

  Everything a real backend would own (auth session, bookings, gift cards,
  preferences) lives in localStorage so the whole site is clickable
  end-to-end with zero integrations. Nothing here is secure or persistent
  beyond this browser — that's the point. Every function notes its
  real-world replacement in DEMO-MODE.md.
*/

const KEYS = {
  user: "bb-demo-user",
  bookings: "bb-demo-bookings",
  giftCards: "bb-demo-gift-cards",
  prefs: "bb-demo-prefs",
  seeded: "bb-demo-seeded",
} as const;

export type DemoUser = {
  name: string;
  email: string;
  phone?: string;
  isDemoAccount?: boolean;
};

export type DemoBooking = {
  id: string;
  serviceCode: string;
  serviceName: string;
  durationMinutes: number;
  priceCents: number;
  travelFeeCents?: number;
  discountCents?: number;
  giftCardCode?: string;
  totalCents?: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  therapistId?: string;
  therapistName?: string;
  locationType: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  notes: string;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  status: "confirmed" | "completed" | "cancelled";
  reviewed?: boolean;
  createdAt: string;
};

export type DemoGiftCard = {
  id: string;
  code: string;
  amountCents: number;
  balanceCents: number;
  recipientName: string;
  recipientEmail: string;
  buyerName?: string;
  buyerEmail?: string;
  message: string;
  anonymous?: boolean;
  deliveryDate?: string; // YYYY-MM-DD, empty = sent immediately
  createdAt: string;
};

export type DemoPrefs = {
  preferredTherapistIds: string[];
  pressure: string;
  focusAreas: string;
  avoidAreas: string;
  allergies: string;
  marketingEmails: boolean;
  smsReminders: boolean;
};

export const DEFAULT_PREFS: DemoPrefs = {
  preferredTherapistIds: [],
  pressure: "Medium",
  focusAreas: "",
  avoidAreas: "",
  allergies: "",
  marketingEmails: false,
  smsReminders: true,
};

/* A gift card that always exists so the balance checker and "apply a gift
   card at checkout" can be demonstrated without buying one first. */
export const SEEDED_GIFT_CARD: DemoGiftCard = {
  id: "GC-SEED01",
  code: "GIFT-DEMO-2026",
  amountCents: 15000,
  balanceCents: 15000,
  recipientName: "Demo Customer",
  recipientEmail: "demo@example.com",
  buyerName: "Body Bliss",
  message: "Enjoy a massage on us — demonstration gift card.",
  createdAt: "2026-06-01T09:00:00.000Z",
};

/* Demonstration promotional code applied at checkout. */
export const PROMO_CODES: Record<string, { label: string; percentOff: number }> = {
  WELCOME10: { label: "Welcome offer — 10% off", percentOff: 10 },
};

/* ---------- low-level storage (fail-soft in private mode) ---------- */

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable — demo state just won't persist
  }
  window.dispatchEvent(new Event("bb-demo-change"));
}

export function makeId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

/* ---------- auth (REAL: Supabase auth — see DEMO-MODE.md §1) ---------- */

export function getDemoUser(): DemoUser | null {
  return read<DemoUser>(KEYS.user);
}

export function signInDemo(user: DemoUser) {
  write(KEYS.user, user);
}

export function signOutDemo() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEYS.user);
  } catch {
    // ignore
  }
  window.dispatchEvent(new Event("bb-demo-change"));
}

/* Sign in to the pre-filled demonstration account: seeds a believable
   history (upcoming + past bookings, preferences, a gift card) once. */
export function signInDemoAccount() {
  const seeded = read<boolean>(KEYS.seeded);
  if (!seeded) {
    const today = new Date();
    const plusDays = (n: number) => {
      const d = new Date(today);
      d.setDate(d.getDate() + n);
      return d.toISOString().slice(0, 10);
    };
    const demoBookings: DemoBooking[] = [
      {
        id: "BB-DEMO03",
        serviceCode: "relaxation",
        serviceName: "Relaxation Massage",
        durationMinutes: 90,
        priceCents: 16900,
        totalCents: 16900,
        date: plusDays(4),
        time: "18:30",
        therapistId: "mia",
        therapistName: "Mia",
        locationType: "home",
        streetAddress: "12 Osmond Terrace",
        suburb: "Norwood",
        postcode: "5067",
        notes: "Parking: driveway available.\nStairs: No stairs — step-free access.",
        status: "confirmed",
        createdAt: new Date().toISOString(),
      },
      {
        id: "BB-DEMO02",
        serviceCode: "deep_tissue",
        serviceName: "Deep Tissue Massage",
        durationMinutes: 60,
        priceCents: 12900,
        totalCents: 12900,
        date: plusDays(-12),
        time: "10:00",
        therapistId: "daniel",
        therapistName: "Daniel",
        locationType: "home",
        streetAddress: "12 Osmond Terrace",
        suburb: "Norwood",
        postcode: "5067",
        notes: "For therapist: focus on shoulders and upper back.",
        status: "completed",
        reviewed: true,
        createdAt: new Date(Date.now() - 14 * 864e5).toISOString(),
      },
      {
        id: "BB-DEMO01",
        serviceCode: "relaxation",
        serviceName: "Relaxation Massage",
        durationMinutes: 60,
        priceCents: 11900,
        totalCents: 11900,
        date: plusDays(-40),
        time: "14:00",
        therapistId: "priya",
        therapistName: "Priya",
        locationType: "hotel",
        streetAddress: "Hotel Indigo, 23 Market St",
        suburb: "Adelaide",
        postcode: "5000",
        notes: "Room 1204 — reception notified.",
        status: "completed",
        createdAt: new Date(Date.now() - 42 * 864e5).toISOString(),
      },
    ];
    const existing = getDemoBookings();
    const merged = [
      ...existing,
      ...demoBookings.filter((d) => !existing.some((e) => e.id === d.id)),
    ];
    write(KEYS.bookings, merged);
    write(KEYS.prefs, {
      ...DEFAULT_PREFS,
      preferredTherapistIds: ["mia", "daniel"],
      pressure: "Medium",
      focusAreas: "Shoulders, upper back",
      allergies: "No nut-based oils, please",
      marketingEmails: true,
    } satisfies DemoPrefs);
    write(KEYS.seeded, true);
  }
  signInDemo({
    name: "Alex Demo",
    email: "alex@example.com",
    phone: "0400 000 000",
    isDemoAccount: true,
  });
}

/* ---------- bookings (REAL: Supabase bookings tables — §3) ---------- */

export function getDemoBookings(): DemoBooking[] {
  return read<DemoBooking[]>(KEYS.bookings) ?? [];
}

export function getDemoBooking(id: string): DemoBooking | null {
  return getDemoBookings().find((b) => b.id === id) ?? null;
}

export function addDemoBooking(
  booking: Omit<DemoBooking, "id" | "status" | "createdAt">,
): DemoBooking {
  const full: DemoBooking = {
    ...booking,
    id: makeId("BB"),
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };
  write(KEYS.bookings, [full, ...getDemoBookings()]);
  return full;
}

export function cancelDemoBooking(id: string) {
  write(
    KEYS.bookings,
    getDemoBookings().map((b) =>
      b.id === id ? { ...b, status: "cancelled" as const } : b,
    ),
  );
}

export function markBookingReviewed(id: string) {
  write(
    KEYS.bookings,
    getDemoBookings().map((b) => (b.id === id ? { ...b, reviewed: true } : b)),
  );
}

/* ---------- gift cards (REAL: payments + gift card tables — §4) ---------- */

export function getDemoGiftCards(): DemoGiftCard[] {
  const stored = read<DemoGiftCard[]>(KEYS.giftCards) ?? [];
  // Seeded card always available (unless a spent copy is stored).
  if (stored.some((c) => c.code === SEEDED_GIFT_CARD.code)) return stored;
  return [...stored, SEEDED_GIFT_CARD];
}

export function findGiftCard(code: string): DemoGiftCard | null {
  const q = code.trim().toUpperCase();
  return getDemoGiftCards().find((c) => c.code.toUpperCase() === q) ?? null;
}

export function addDemoGiftCard(
  card: Omit<DemoGiftCard, "id" | "code" | "balanceCents" | "createdAt">,
): DemoGiftCard {
  const full: DemoGiftCard = {
    ...card,
    id: makeId("GC"),
    balanceCents: card.amountCents,
    code: `GIFT-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  write(KEYS.giftCards, [full, ...(read<DemoGiftCard[]>(KEYS.giftCards) ?? [])]);
  return full;
}

/** Deduct from a gift card balance; returns the amount actually applied. */
export function redeemGiftCard(code: string, amountCents: number): number {
  const cards = getDemoGiftCards();
  const card = cards.find(
    (c) => c.code.toUpperCase() === code.trim().toUpperCase(),
  );
  if (!card || card.balanceCents <= 0) return 0;
  const applied = Math.min(card.balanceCents, amountCents);
  const updated = cards.map((c) =>
    c.id === card.id ? { ...c, balanceCents: c.balanceCents - applied } : c,
  );
  write(KEYS.giftCards, updated);
  return applied;
}

/* ---------- preferences ---------- */

export function getDemoPrefs(): DemoPrefs {
  return { ...DEFAULT_PREFS, ...(read<Partial<DemoPrefs>>(KEYS.prefs) ?? {}) };
}

export function saveDemoPrefs(prefs: Partial<DemoPrefs>) {
  write(KEYS.prefs, { ...getDemoPrefs(), ...prefs });
}

/* ---------- React subscriptions ---------- */

function subscribe(callback: () => void) {
  window.addEventListener("bb-demo-change", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("bb-demo-change", callback);
    window.removeEventListener("storage", callback);
  };
}

/** Current demo user (null while loading / signed out); `ready` flips true after hydration. */
export function useDemoUser(): { user: DemoUser | null; ready: boolean } {
  const [state, setState] = React.useState<{ user: DemoUser | null; ready: boolean }>({
    user: null,
    ready: false,
  });
  React.useEffect(() => {
    const update = () => setState({ user: getDemoUser(), ready: true });
    update();
    return subscribe(update);
  }, []);
  return state;
}

/** Live list of demo bookings made in this browser. */
export function useDemoBookings(): DemoBooking[] {
  const [snapshot, setSnapshot] = React.useState<DemoBooking[]>([]);
  React.useEffect(() => {
    const update = () => setSnapshot(getDemoBookings());
    update();
    return subscribe(update);
  }, []);
  return snapshot;
}

/** Live gift cards known to this browser (includes the seeded demo card). */
export function useDemoGiftCards(): DemoGiftCard[] {
  const [snapshot, setSnapshot] = React.useState<DemoGiftCard[]>([]);
  React.useEffect(() => {
    const update = () => setSnapshot(getDemoGiftCards());
    update();
    return subscribe(update);
  }, []);
  return snapshot;
}

/** Live preferences. */
export function useDemoPrefs(): DemoPrefs {
  const [snapshot, setSnapshot] = React.useState<DemoPrefs>(DEFAULT_PREFS);
  React.useEffect(() => {
    const update = () => setSnapshot(getDemoPrefs());
    update();
    return subscribe(update);
  }, []);
  return snapshot;
}
