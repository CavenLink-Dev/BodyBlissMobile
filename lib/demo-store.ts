"use client";

import * as React from "react";

/*
  DEMO MODE — browser-only "backend".

  Everything a real backend would own (auth session, bookings, gift cards)
  lives in localStorage so the whole site is clickable end-to-end with zero
  integrations. Nothing here is secure or persistent beyond this browser —
  that's the point. Every function notes its real-world replacement in
  DEMO-MODE.md.
*/

const KEYS = {
  user: "bb-demo-user",
  bookings: "bb-demo-bookings",
  giftCards: "bb-demo-gift-cards",
} as const;

export type DemoUser = {
  name: string;
  email: string;
};

export type DemoBooking = {
  id: string;
  serviceCode: string;
  serviceName: string;
  durationMinutes: number;
  priceCents: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  locationType: string;
  streetAddress: string;
  suburb: string;
  postcode: string;
  notes: string;
  status: "confirmed" | "cancelled";
  createdAt: string;
};

export type DemoGiftCard = {
  id: string;
  code: string;
  amountCents: number;
  recipientName: string;
  recipientEmail: string;
  message: string;
  createdAt: string;
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

/* ---------- gift cards (REAL: payments + gift card tables — §4) ---------- */

export function getDemoGiftCards(): DemoGiftCard[] {
  return read<DemoGiftCard[]>(KEYS.giftCards) ?? [];
}

export function addDemoGiftCard(
  card: Omit<DemoGiftCard, "id" | "code" | "createdAt">,
): DemoGiftCard {
  const full: DemoGiftCard = {
    ...card,
    id: makeId("GC"),
    code: `GIFT-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    createdAt: new Date().toISOString(),
  };
  write(KEYS.giftCards, [full, ...getDemoGiftCards()]);
  return full;
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
