# Body Bliss Mobile Massage — Foundation Design Direction (v5)

> **v6 note (July 2026, owner decision):** the `#EAC005` yellow-accent
> system described below has been replaced by a charcoal + warm-neutral
> (beige) palette — ivory `#F7F3EC` page, cream `#F1EAE0`, linen `#EAE0D1`,
> sand `#DDCFB9`, camel `#C9AC7C` accent, taupe `#8C7351`, stone `#8A8172`
> input borders. The charcoal family, typography, spacing, motion and
> accessibility rules below are unchanged. Current values + verified
> contrast ratios: `app/globals.css` and `HANDOVER.md` §4; the "yellow rule"
> now applies to camel (charcoal text on camel surfaces, 7.06:1; camel never
> text, never sole indicator). The stone input border resolves open item 4.

Source of truth: **`Body_Bliss_Organised_Responsive.tokens.json`** (owner-approved Figma variables) + the Body Bliss logo (serif wordmark with lotus mark). This document records how the tokens are applied, the verified accessibility pairings, and the small set of usage rules required to meet WCAG 2.2 AA without changing any approved colour or typography values. Owner corrections applied: the single system yellow is **`#EAC005`** (supersedes the token file's `#EDC516` on the secondary button).

Brand: **Body Bliss** (never all-caps in text; the logo's own lettering is the only exception). Service: **Body Bliss Mobile Massage**. Nine years of Adelaide massage and wellness experience — used in homepage hero + About section only. Original design throughout; no imitation of Blys or any competitor.

## 1. Logo usage

- **Primary lock-up** (lotus + BODY BLISS + Massage and Day Spa): supplied as white-on-black. For the light `#F4F4EE` site, a **charcoal `#252525` version on transparent background is required** — needs to be produced from the source file (open item).
- White version: reserved for dark surfaces — footer band, dark hero overlays.
- **Lotus mark alone**: favicon, app icon, loading state, small brand accents. Never recolour the lotus yellow on light backgrounds (1.58:1 — invisible); white-on-charcoal or charcoal-on-light only.
- Clear space: at least the height of one lotus petal on all sides. Don't stretch, outline, shadow, or place on photography without a solid underlay.
- The marketplace presents as "Body Bliss Mobile Massage" in nav/text; the day-spa lock-up links back to the clinic.

## 2. Colour system (from tokens — verified)

| Token | Hex | Role | Contrast (verified) |
|---|---|---|---|
| `background/page` | `#F4F4EE` | Page background | — |
| `text/display` | `#252525` | Display text, key figures | 13.9 |
| `text/title` | `#424242` | Titles | 9.1 |
| `text/subtitle` | `#3A3A35` | Subtitles | 10.4 |
| `text/description` = `text/caption` | `#4E4E4E` | Body & captions | 7.5 |
| `action/primary/background` | `#3D3B36` | Primary button (white label: 11.2) | ✓ |
| `action/secondary/background` | **`#EAC005`** (owner-corrected) | Secondary button | see rule below |
| `navigation/default` | `#414040` | Nav items | 9.4 |
| `navigation/selected` | `#EAC005` | Selected nav accent | see rule below |
| `utility/subtle_stroke` | `#E4E4E4` | Hairlines (decorative only — 1.15 vs page, must never be the only boundary of a meaningful control; inputs need a darker border, open item) | — |
| `utility/star_rating` | `#EAC005` | Stars (always beside a numeric rating in text) | — |
| `utility/social_media_icon` | `#131111` | Social icons | ✓ |

**The yellow rule (required for AA, colours unchanged):**
- Yellow surfaces (secondary button, chips) carry **charcoal `#252525` text/icons** — 8.79:1. White-on-yellow is 1.74:1 and is not used anywhere.
- Yellow is **never text** and **never the sole indicator** on light backgrounds. Selected navigation = **bold `#252525` label + thick `#EAC005` underline** (weight + position carry the meaning; yellow is reinforcement).
- On charcoal surfaces yellow works as an accent (6.4:1) — mirrors the logo's light-on-dark character.

Status colours retained from v4 (`success #2E6B4F`, `error #9E2B25` — 6.3/7.4 on white; always paired with text/icon).

## 3. Typography (from tokens — values unchanged)

Families per tokens: **Sora** (display/title/subtitle, selected nav) + **DM Sans** (description, caption, buttons, nav). This supersedes the earlier Inter-only instruction per the approved token file. Both self-hosted, sizes emitted in `rem` so user text-size settings scale everything.

| Style | Family | Size / weight / line-height | Colour |
|---|---|---|---|
| Display | Sora | 44 / 700 / 46 | `#252525` |
| Title | Sora | 32 / — (weight undefined in tokens, **open item**; 600 proposed) / 34 | `#424242` |
| Subtitle | Sora | 22 / 400 / 24 | `#3A3A35` |
| Description | DM Sans | 16 / 400 / 18 | `#4E4E4E` |
| Caption | DM Sans | 12 / 400 / 18 | `#4E4E4E` |
| Button | DM Sans | 18 / — (undefined, **open item**; 600 proposed) / 20 | per button rule |
| Nav default / selected | DM Sans 16/400 / Sora 16/700 | /18 | `#414040` / `#252525` |

Usage guardrails (no token values changed):
- **Caption (12px) is never used for essential information** — prices, times, safety info, errors, and anything required to complete a booking use Description or larger. Captions are for timestamps and fine print only.
- Description's 18px line-height (1.125×) is tight for long text; long-form paragraphs are a pilot-testing watch item with older users. Text must still tolerate user-applied 1.5× line spacing without breaking (WCAG 1.4.12).
- `text_transform: capitalize` applies to Display/Title/Subtitle/Buttons per tokens; body text stays sentence case.

## 4. Layout, spacing & responsive (from tokens)

- Base scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.
- **Breakpoints (viewport-based, mobile-first):** phone <640 · tablet 640–1007 · desktop ≥1008.
- Page padding: 16/24 phone · 24/32 tablet · 64/48 desktop; content max-width 1200.
- Section gaps 32/48/64; card gaps 16/24/24; component gaps 12/16/16; compact 8.
- Grid: 1 / 2 / 3 columns; gaps 16/24/24.
- Card padding: 16 phone, 24 tablet/desktop.
- Nav item gaps: 16/24/32; nav hit target ≥48px.

## 5. Buttons & interaction (from tokens)

- Visual: 132×44 default, radius 8, padding-inline 12, content gap 10, text-to-button spacing 18.
- **Hit target: 48px universal** — 44px visual height + 2px invisible expansion per side, exactly as the tokens specify. Exceeds Apple HIG 44pt and WCAG 2.5.8.
- Three buttons: **Primary** `#3D3B36` + white label · **Secondary** `#EAC005` + charcoal label (optional token inner shadow) · **Quiet** charcoal text-only.
- States: pressed (darkened fill), selected (per nav rule), focus (2px `#252525` ring, 2px offset, never clipped), disabled — **open item:** the tokens give nav pressed/disabled the same colour as default (`#414040`), which makes states indistinguishable; disabled needs a distinct treatment (reduced-opacity fill + not-allowed semantics proposed).
- Motion: 150–200ms fades only; `prefers-reduced-motion` honoured.

## 6. Unchanged product foundations (v4 carried forward)

- **Principles:** understandable at a glance; labels do what they say; nothing hidden; one primary action per screen; 80-year-old benchmark.
- **Navigation:** Book a Massage · Therapists · Services & Prices · Help & Safety (always visible; no hamburger-only nav). Customer account: Bookings / Messages / Account. Booking status always in words.
- **Therapist selection:** list → concise profile (sheet in flow, page from directory) → Request; "Let us match you" first and largest; verification in plain words; no surnames/phone numbers/home suburbs exposed.
- **Trust & About:** nine-years signal in hero + About only; provisional About Body Bliss copy as approved; no exaggerated claims, no competitor-derived wording.
- **Progressive disclosure:** price, status, primary action, safety/support always visible; policies/FAQ detail/T&Cs one tap away in sheets (visible close button, never stacked).
- **Accessibility acceptance criteria:** full WCAG 2.2 AA mapping (focus not obscured/appearance, no drag-only, target size, consistent help, redundant entry, accessible authentication) as specified in v4 §10.

## 7. Open items needing owner input

1. Charcoal-on-transparent logo export (and SVG source if available).
2. Title and Button font weights — "undefined" in tokens; 600 proposed for both.
3. Distinct disabled-state treatment (tokens currently reuse the default colour).
4. Input border colour — `#E4E4E4` stroke is too faint (1.15:1) to be an input's only boundary; a darker border token is needed (e.g. `#767676`-range) — proposal pending your approval.
5. Prior open decisions: launch hours & suburbs · commission · supply model · minors policy · domain · Fresha · gift cards timing · photography.

## 8. Version history

v1→v2 three-colour simplicity & 80-year-old benchmark · v2→v3 verified against Apple HIG / WCAG 2.2 / NN/g · v3→v4 Rule of Three, Body Bliss branding, About content · **v4→v5:** approved Figma token file adopted as source of truth (colours, Sora + DM Sans typography, spacing, breakpoints, button metrics, 48px hit targets); single yellow unified to `#EAC005` per owner; yellow usage rules added to preserve AA without altering any approved values; logo usage defined.
