# DEMO MODE — every faked feature, and how to make it real

This site is a **fully clickable demo**: every flow completes start-to-finish
with zero integrations. Nothing touches a server — no Supabase, no payment
provider, no email. This file lists **every faked feature**, where it lives,
and exactly what a future developer/AI must do to wire it for real.

**The demo "backend" is `lib/demo-store.ts`** — auth session, bookings and
gift cards in `localStorage`, with a `bb-demo-change` event + React hooks
(`useDemoUser`, `useDemoBookings`). Deleting that file (after re-wiring every
consumer below) is the definition of done.

**Real infrastructure already in the repo** (kept as reference, currently unused):

- `supabase/migrations/*` — full schema: identity/roles, catalogue+pricing,
  bookings+matching, payments, reputation, support. Applied to Supabase
  project `body-bliss-mobile` (`iiuheyymykxlrixgajpp`, ap-southeast-2).
- `lib/supabase/{client,server,admin,proxy}.ts` — ready-made Supabase clients.
- `app/(public)/book/actions.ts` — the real `createBookingRequest` /
  `cancelBooking` server actions (validated, RLS-aware). Not called anywhere.
- `app/auth/{callback,signout}/route.ts` — real Supabase auth routes. Unused.
- `lib/account.ts` — real RLS-scoped account reads. Unused.
- `components/booking/cancel-booking-button.tsx`, was wired to the real
  cancel action. Unused.

**Env vars needed when going live** (in `.env.local` and Vercel → Settings →
Environment Variables — currently set in NEITHER):
`NEXT_PUBLIC_SUPABASE_URL=https://iiuheyymykxlrixgajpp.supabase.co`,
`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (get via Supabase dashboard → API keys),
`SUPABASE_SERVICE_ROLE_KEY` (server-only, needed by `actions.ts`).

---

## §1 Authentication (fully fake)

| Faked | File |
|---|---|
| Login — any email + any password signs in | `components/auth/login-form.tsx` |
| Signup — creates a local session instantly, no email confirmation | `components/auth/signup-form.tsx` |
| Forgot password — "sends" a code (nothing sent), ANY 6 digits verify, new password "saved", user signed in | `components/auth/forgot-password-form.tsx` + `app/(public)/forgot-password/page.tsx` |
| Sign out — clears localStorage | `signOutDemo()` in `app/account/page.tsx` |

**To make real:** replace `signInDemo(...)` with
`supabase.auth.signInWithPassword({ email, password })`;
signup → `supabase.auth.signUp(...)` (restore the "check your email" state that
was in git history / see `app/auth/callback/route.ts` for the redirect);
forgot password → `supabase.auth.resetPasswordForEmail(email)` then
`supabase.auth.verifyOtp({ email, token, type: "recovery" })` then
`supabase.auth.updateUser({ password })`; sign out → POST to `/auth/signout`
(route already exists). Restore `proxy.ts` (deleted; see git history or
`lib/supabase/proxy.ts` which still contains `updateSession`) so sessions
refresh on every request.

## §2 Account area (fake session + local data)

- `app/account/layout.tsx` — **no server auth guard**; client pages redirect
  to `/login` if no demo session. Real: restore
  `supabase.auth.getUser()` + `redirect()` in the layout (see file comment).
- `app/account/page.tsx` — bookings/addresses come from `useDemoBookings()`
  (this browser only). Real: make it a server component again using
  `getMyBookings()` / `getMyAddresses()` from `lib/account.ts` (already
  written and RLS-scoped).
- `app/account/bookings/[id]/page.tsx` — reads/cancels the localStorage
  booking. Real: Supabase reads (`bookings`, `booking_locations`) + the
  `cancelBooking` server action via `components/booking/cancel-booking-button.tsx`.

## §3 Booking checkout (fake persistence)

- `components/booking/booking-flow.tsx` — `onPaid()` calls
  `addDemoBooking(...)` (localStorage) instead of the real server action.
  Real: call `createBookingRequest(...)` from `app/(public)/book/actions.ts`
  (it expects `serviceVariantId` as a **UUID from the DB**, not the demo
  `code-minutes` id — see §6) and then take payment (§4).
- `app/(public)/book/confirmation/[id]/page.tsx` — client page reading the
  localStorage booking, shows a "Test mode" notice. Real: server component
  reading the booking via Supabase (git history has this version), notice
  removed.
- Booking status is set straight to `confirmed` in the demo. Real flow is
  request → match → confirm (see `supabase/migrations/...booking_core...`).

## §4 Payments (fully fake)

- `components/payment/payment-form.tsx` — looks real (card formatting,
  validation, processing spinner) but validates shape only and **discards
  the input**. Used by booking step 4 and gift cards.
- **To make real:** add a payment provider (Stripe recommended):
  server creates a PaymentIntent (`stripe.paymentIntents.create` with the
  variant's price, currency `aud`), replace the form internals with Stripe
  Payment Element (`@stripe/react-stripe-js`), confirm on submit, and write
  the result to the `payments` tables (migration `20260712000004`). Never
  hand-roll card inputs in production — PCI scope.
- All "Test mode — no payment taken" notices (`FlaskConical` icon) in
  `payment-form.tsx`, `book/confirmation/[id]/page.tsx`,
  `gift-card-purchase.tsx`, and `components/test-mode-banner.tsx`
  (mounted in `app/layout.tsx`) must be removed when payments are real.

## §5 Gift cards (fully fake)

- `components/gift-card-purchase.tsx` — complete checkout; the "purchased"
  card + code live in localStorage; no email is sent.
- **To make real:** payment (§4) + a `gift_cards` table (code, amount_cents,
  purchaser, recipient email/name, message, redeemed_at, expires_at = 3 years
  per ACL) + a transactional email to the recipient (e.g. Resend/Postmark)
  + a redemption field in the booking payment step that looks up the code.

## §6 Service catalogue & suburbs (static data)

- `lib/catalogue.ts` — services/durations/prices/suburbs are **hard-coded**
  (same shapes as the old Supabase reads; variant ids are `"{code}-{minutes}"`
  strings). The DB already has this data seeded with real UUIDs.
- **To make real:** restore the Supabase queries (git history has the exact
  version: `services` → `service_variants` → `base_prices` with
  effective-date filtering, and `suburbs`). Keep the exported function
  signatures — every page consumes only `getServicesWithPricing()` /
  `getActiveSuburbs()`.

## §7 Reviews (real content, static)

- `lib/content.ts` — genuine Google reviews of Body Bliss Massage & Day Spa,
  anonymised and lightly edited; attributed to the day spa in the UI.
- **To make real (optional):** read consented reviews from the reputation
  tables (migration `20260712000005`) once the mobile service has its own.

## §8 Emails (none are sent)

Faked everywhere one is implied: signup confirmation, password-reset code
(§1), booking confirmation (§3), gift-card delivery (§5). Real: Supabase
auth emails cover §1; add a transactional email provider for the rest.

## §9 Misc

- `components/site-footer.tsx` — `DAY_SPA_URL` is null pending the owner's
  domain decision; renders as text until set.
- `app/sitemap.ts` / `app/robots.ts` — base URL is a placeholder Vercel
  domain; swap when the custom domain exists.
- `/terms` and `/privacy` — drafted to match demo behaviour; **must be
  owner/legal-reviewed and updated when payments go live** (they currently
  say payment is simulated/confirmed-before-charge).
- `/help` contact card — no real support email/phone yet; owner to supply.
