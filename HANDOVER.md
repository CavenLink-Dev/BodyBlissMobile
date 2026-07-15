# Body Bliss Mobile Massage — Project Handover

_Last updated: 15 July 2026._ Read this first, then `DEMO-MODE.md` (what's
faked and how to make it real) and `foundation-design-direction.md` (the
design system rules — non-negotiable).

---

## 1. What this is

A mobile-first booking website for **Body Bliss Mobile Massage** — the mobile
arm of Body Bliss Massage & Day Spa (9 years in Adelaide). Customers open the
site on a phone, understand the service, and book a massage to their home,
hotel or workplace.

**Current state: a fully clickable demo.** Every flow completes end-to-end
(browse → book → pay → account → cancel) using a localStorage "backend"
(`lib/demo-store.ts`). No real auth, payment or database calls are live.
The real Supabase schema **is** deployed and the real server actions exist
in the repo, currently unused — `DEMO-MODE.md` maps every faked feature to
its real implementation path.

## 2. Stack & infrastructure

| Layer | Detail |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), TypeScript, Tailwind v3 |
| UI | shadcn-style components in `components/ui/*`, tokens in `tailwind.config.ts` + `app/globals.css` |
| Fonts | Sora + DM Sans, self-hosted woff2 in `app/fonts/` via `next/font/local` (build fails without them) |
| Database | Supabase project `iiuheyymykxlrixgajpp` (ap-southeast-2), 58 tables, RLS on everything, migrations in `supabase/migrations/` |
| Hosting | Vercel, auto-deploys `main` from GitHub `CavenLink-Dev/BodyBlissMobile` |
| Payments | None (demo form only — see DEMO-MODE.md §4; use Stripe when real) |

**Env vars** (none currently set anywhere; needed only when leaving demo
mode): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (server-only — never `NEXT_PUBLIC_`, never
committed).

## 3. Repo map (the parts that matter)

- `app/(public)/*` — public pages: home, services (+ per-service detail),
  book (4-step flow), gift-cards, therapists, about, help, login/signup/
  forgot-password, terms, privacy.
- `app/account/*` — account area: bookings list, booking detail + cancel.
- `components/booking/booking-flow.tsx` — the multi-step booking flow.
- `components/payment/payment-form.tsx` — demo card form (shape-validation only).
- `lib/demo-store.ts` — the demo backend. Deleting it (after rewiring every
  consumer per DEMO-MODE.md) is the definition of "gone live".
- `lib/catalogue.ts` — services/prices/suburbs (hard-coded in demo mode; the
  DB holds the same data with real UUIDs).
- `app/(public)/book/actions.ts`, `lib/account.ts`, `lib/supabase/*`,
  `app/auth/*` — the real wiring, ready and unused.
- `app/styleguide/page.tsx` — living styleguide of tokens/components.

## 4. Non-negotiable design rules (from the token file)

- Single yellow `#EAC005`. Yellow surfaces **always** carry charcoal
  `#252525` text/icons (8.79:1). **White-on-yellow is banned** (1.74:1).
  Yellow is never text and never the sole indicator.
- Charcoal surfaces (`#3D3B36`) carry white text; yellow works there as an
  accent only (6.4:1).
- Sora for display/title/subtitle; DM Sans for body/buttons/nav. Sizes in rem.
- 48px hit targets everywhere; visible 2px charcoal focus ring, 2px offset.
- Motion: 150–200ms fades only; `prefers-reduced-motion` fully honoured.
- Caption (12px) never carries essential info.
- WCAG 2.2 AA is the floor, not the target.
- Never invent pricing, legal wording, safety claims or reviews. Current
  reviews are real day-spa Google reviews, anonymised and attributed.
- Blys/competitors: research only — never copy branding, copy or layout.

## 5. What just changed (design elevation pass)

- `components/section-heading.tsx` — consistent section entry: yellow rule +
  tracked eyebrow + title + optional lead/action. Used across the homepage.
- Homepage: factual stats band under the hero (9 years · 6 styles · 100%
  mobile); How It Works de-boxed into a numbered timeline (vertical rail on
  phone, 3 columns on tablet+); trust/service icon chips switched to yellow
  with charcoal icons; final CTA carries the white lotus watermark echoing
  the hero.
- Earlier passes: charcoal hero band with original SVG illustration, services
  scroll-snap carousel, cookie notice, scroll reveal (fade-only), PWA
  manifest, error/loading states, header with profile icon + hamburger sheet.

## 6. How to make the design 100× better — prioritised roadmap

**Tier 1 — brand assets (biggest visible jump; needs the owner)**
1. **Real photography.** One warm, honest hero photo (therapist + table in an
   Adelaide home, natural light) transforms the site more than any code.
   Art direction: porcelain/charcoal palette, no stocky spa clichés, real
   team. Needs: hero (2400px), 6 service tiles, 2–3 candid process shots.
   Use `next/image` with `priority` on the hero; keep LCP < 2.5s.
2. **Therapist portraits + profiles.** Faces are the #1 trust signal in this
   category (see Blys/Soothe/Urban patterns — pattern, not pixels). Blocked
   on real therapists being onboarded; the DB and RLS are ready.
3. **Logo SVG.** The PNG lock-ups are fine but an SVG export (charcoal +
   white) will render crisper in the nav/footer and the PWA icon set.

**Tier 2 — design-system depth (no owner needed)**
4. **Illustration system.** Extend `hero-illustration.tsx` into a small
   family (booking, gift card, empty states, 404) — same palette, same line
   weight. Original art, cheap to ship, very "designed".
5. **Elevation scale.** Add a 2-step shadow token (rest/raised) for cards and
   sheets — subtle depth without breaking the flat-calm aesthetic.
6. **Micro-interactions.** Button press scale (0.98), input focus ring
   ease-in, sheet spring — all ≤200ms, all disabled under reduced motion.
7. **Skeletons everywhere.** Match each page's real layout in `loading.tsx`
   files (home/services/account) instead of the one generic skeleton.
8. **Dark-band rhythm.** Alternate one more charcoal band mid-page (e.g.
   reviews on charcoal with yellow stars) so the page breathes:
   cream → white → charcoal → cream.

**Tier 3 — flow & conversion polish**
9. **Booking summary rail.** On tablet+, pin a live price/summary card beside
   the flow; on phone, a collapsible sticky summary above the CTA.
10. **Service detail pages** already exist (`/services/[code]`) — add
    "what's included / who it's for / what to expect" content blocks and
    cross-sell (60→90 min upsell at checkout).
11. **Address UX.** Suburb autocomplete from the `suburbs` table (then Google
    Places later); remember last address for repeat bookings (already in
    demo store — port to `customer_addresses`).
12. **Calendar-feel time picker.** Replace native date+time with a 7-day
    horizontal day strip + time chips (still keyboard/native accessible).
13. **Post-booking moments.** Add-to-calendar file, share-with-household
    link, and a "prepare your space" checklist on the confirmation page.

**Tier 4 — trust & content**
14. Publish the real vetting process on /therapists with specifics once
    verification is operational (police check, quals, insurance — only when
    true; the compliance tables already model this).
15. Review stars beside services once the mobile service has its own reviews
    (reputation tables ready).
16. Photography-backed suburb pages (`/mobile-massage/norwood` etc.) for
    local SEO — the suburbs table is the source of truth.

## 7. Going live (order of operations)

1. Set the 3 env vars in Vercel + `.env.local`.
2. Re-wire per `DEMO-MODE.md` §1→§6 (auth → account → catalogue → booking),
   testing each flow.
3. Stripe integration (§4) — server-created PaymentIntents, Payment Element,
   webhook → `payments` tables.
4. Owner gates: final prices, launch suburbs, support email/phone, day-spa
   URL, legal review of terms/privacy, real therapist onboarding.
5. Custom domain in Vercel + update `app/sitemap.ts` / `robots.ts` base URL.
6. Delete `lib/demo-store.ts`, `components/test-mode-banner.tsx` and all
   FlaskConical test-mode notices. That's launch.

## 8. Verification habits

- `npx tsc --noEmit` and `npm run build` before every push.
- Supabase security advisors after any migration (`get_advisors` — currently
  clean; keep SECURITY DEFINER functions in the `internal` schema).
- Lighthouse mobile pass (target ≥90 performance, 100 accessibility) after
  any image/asset work.
- Test at 360px width (small Android), 390px (iPhone), and with VoiceOver.
