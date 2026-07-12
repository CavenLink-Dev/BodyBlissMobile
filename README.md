# Body Bliss Mobile Massage

Adelaide mobile massage marketplace by Body Bliss Massage & Day Spa. Customers
book vetted therapists for home, hotel and workplace massage.

## Stack

- Next.js (App Router, TypeScript) + Tailwind CSS + shadcn/ui
- Supabase (auth, Postgres, RLS-first) via `@supabase/ssr`
- Deployed on Vercel

## Design system

Source of truth: `Body_Bliss_Organised_Responsive.tokens.json` (owner-approved),
applied per `foundation-design-direction.md` (v5). Tokens are wired into
`app/globals.css` (CSS variables) and `tailwind.config.ts`. Key rules:

- Single system yellow `#EAC005`; yellow surfaces always carry charcoal
  `#252525` text — white-on-yellow is banned. Yellow is never text and never
  the sole indicator on light backgrounds.
- WCAG 2.2 AA is mandatory. 48px hit targets, visible focus rings, sizes in
  `rem`, `prefers-reduced-motion` honoured, 12px captions never carry
  essential information.
- Breakpoints: phone <640 · tablet 640–1007 · desktop ≥1008 (`tablet:` /
  `desktop:` variants).
- Fonts: Sora (headings) + DM Sans (body), self-hosted via `next/font`.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in Supabase values
npm run dev
```

Environment variables:

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable (anon) key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only; never exposed to the client or committed |

## Repository notes

- `assets/` — supplied logo files (white-on-black lock-up + lotus mark)
- Pricing, policies and legal wording are owner-approved content only — do not
  invent or copy from competitors.
