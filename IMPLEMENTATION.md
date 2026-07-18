# Implementation Guide: taking Body Bliss Mobile from prototype to live

This site is currently a complete front end prototype. Every flow works, but
nothing talks to a server: bookings, gift cards, accounts and the identity
check all live in the browser (see `DEMO-MODE.md` for the exact map of what
is faked and where). This file explains what to implement to go live, what
each service is, and why it helps this website specifically.

The guiding principle, set by the owner: store as little as possible, keep
costs low, but stay safe and legitimate.

---

## The lean launch plan (one therapist, minimum money)

We have one licensed therapist. That removes most of the complexity. Do not
build for a marketplace of therapists yet; build for one person taking real
bookings. Everything below runs on free tiers, so the monthly cost at launch
is $0, plus Stripe's percentage per booking.

### The one smart shortcut: no therapist portal

A portal means logins, screens and maintenance. With one therapist you do
not need any of it. Instead:

1. Customer books and pays on the website.
2. Supabase saves the booking and Resend emails the therapist:
   "New booking: Relaxation 90 min, Saturday 2pm, Norwood."
3. The email contains two secure one tap links: **Accept** and **Decline**.
   Tapping Accept confirms the booking and emails the customer. Tapping
   Decline refunds automatically and emails the customer to pick a new time.
4. The morning of each appointment she gets one summary email with the
   address, notes and a map link.

That is the entire "portal": her own email inbox. It costs nothing, needs no
training, and can grow into a real portal later when there are more
therapists. The customer facing site does not change at all.

### What to simplify for version one

- **Guest bookings only.** Skip customer accounts at launch. Every
  confirmation email contains a secure Manage link where the customer can
  view or cancel that booking. Less code, less stored data, less to secure.
  Add accounts later only if regulars ask for them.
- **One therapist.** The booking flow's therapist step can say "Your
  therapist is [name]" with her real photo and bio. The team page and
  matching stay in the code, hidden, ready for therapist number two.
- **Defer the photo ID check.** It costs money per verification. At launch,
  a paid card booking plus a verified mobile number already ties every
  booking to a real identity if something goes wrong. Turn on Stripe
  Identity later, when strangers scale beyond what feels comfortable.
- **Availability is one table.** She sets her working hours once; bookings
  block out slots automatically. No calendar integrations at launch.

### Domain: subdomain first

The day spa already owns bodyblissmassageprospect.com. Point a free
subdomain at the Vercel deployment, for example
**mobile.bodyblissmassageprospect.com**. It costs nothing, is live in
minutes, and inherits the trust of the existing brand. Buy
bodyblissmobile.com.au (about $15 a year, needs the ABN) once bookings are
coming in, and redirect the subdomain to it.

### Cost at launch

| Item | Cost |
|---|---|
| Vercel hosting | $0 (hobby tier) |
| Supabase (bookings, availability) | $0 (free tier) |
| Resend (emails) | $0 (free tier covers thousands) |
| Subdomain | $0 (uses existing domain) |
| Stripe | No monthly fee, about 1.75% + 30c per booking |
| **Total fixed cost** | **$0 per month** |

### Build order for going live

1. Bookings into Supabase, with the Accept and Decline email links.
2. Stripe checkout replacing the demo payment form.
3. Resend emails: new booking to therapist, confirmation, cancellation and
   the morning summary.
4. Availability table driving the time slots.
5. Point the subdomain at Vercel, swap in the real photo, bio, support email
   and phone number, remove the test mode banner.
6. First real booking: a friend or family member books and pays $1 end to
   end. Then launch.

Everything after that (accounts, gift card emails, ID checks, more
therapists, a real portal) is added only when the bookings justify it.

---

## 1. Supabase (database, accounts and security)

**What it is.** Supabase is a hosted backend built on PostgreSQL. One service
gives you a database, user accounts (email and password login), and row level
security, with a generous free tier and pay as you grow pricing.

**What it does for this website.**

- **Bookings.** When a customer completes checkout, the booking is written to
  a `bookings` table instead of the browser. It then exists for you, the
  therapist, and the customer on any device. Cancelling updates the same row.
- **Accounts.** Supabase Auth handles sign up, sign in and password resets.
  Passwords are never visible to you, which is safer and less liability.
- **Availability.** Real time slots come from a table of therapist
  availability instead of the current sample generator.
- **Security.** Row level security means each customer can only ever read
  their own bookings, and each therapist only the bookings assigned to them.
  This is enforced by the database itself, not by trusting the website code.
- **Data minimisation.** A scheduled job (Supabase supports cron) deletes
  treatment notes, access notes and addresses 30 days after each appointment,
  exactly as the privacy policy promises. Only the minimal booking record
  (service, date, amount) is kept for tax purposes. Small data means a small
  bill: this comfortably fits Supabase's free tier for a long time.

**Status.** A Supabase project already exists for this repo
(`body-bliss-mobile`, region ap-southeast-2) with the full schema applied.
The wiring code that used it was removed to keep the prototype lean, but it
is all recoverable from git history, and `DEMO-MODE.md` maps every faked
feature to its real replacement.

## 2. Stripe (payments)

**What it is.** The standard online card payment provider.

**What it does for this website.** Replaces the fake payment form. Customers
pay at checkout, refunds for cancellations are one API call, and card numbers
never touch your server, which keeps you out of heavy compliance obligations.
Fees are per transaction only, no monthly cost.

## 3. Stripe Identity or similar (the one time photo ID check)

**What it is.** A verification service. The customer photographs their ID
once, the provider checks it and returns a pass or fail.

**What it does for this website.** This is how the safety goal is met without
hoarding data. The document and photo stay with the provider under their
controls. Your database stores a single `id_verified` boolean per customer.
If a serious incident ever occurs, the verification record can be retrieved
through the provider for police, exactly as the privacy policy describes.
Cost is per verification, charged once per new customer.

## 4. Resend or similar (email)

**What it does for this website.** Sends the booking confirmation, the
cancellation confirmation, the receipt, and delivers gift cards to
recipients (including the scheduled delivery option). The prototype already
shows every one of these moments, they just need a real send behind them.
Free tiers cover thousands of emails per month.

## 5. SMS reminders (optional, later)

A service such as Twilio can send the day before reminder and the
"your therapist is on the way" message. Nice to have, per message cost, easy
to add after launch.

## 6. Launch checklist

1. Restore the Supabase client and booking actions from git history and point
   the booking flow, account page and gift cards at them.
2. Add Stripe checkout in place of the demo payment form, and Stripe Identity
   in place of the demo Verify my ID button.
3. Add Resend for the confirmation, cancellation, receipt and gift card
   emails.
4. Create the 30 day cleanup job so stored data matches the privacy policy.
5. Replace sample content: real therapist profiles and photos, real support
   email and phone number, real domain in `app/sitemap.ts` and
   `app/robots.ts`, and remove the test mode banner.
6. Have the Terms and Privacy pages reviewed professionally, then remove
   their demonstration disclaimers.

## 7. What stays exactly as it is

The design system, pages, booking steps, help mode, illustrations,
animations and accessibility work are all finished front end. Going live is
plumbing, not rebuilding.
