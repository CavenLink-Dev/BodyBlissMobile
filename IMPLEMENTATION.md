# Implementation Guide: taking Body Bliss Mobile from prototype to live

This site is currently a complete front end prototype. Every flow works, but
nothing talks to a server: bookings, gift cards, accounts and the identity
check all live in the browser (see `DEMO-MODE.md` for the exact map of what
is faked and where). This file explains what to implement to go live, what
each service is, and why it helps this website specifically.

The guiding principle, set by the owner: store as little as possible, keep
costs low, but stay safe and legitimate.

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
