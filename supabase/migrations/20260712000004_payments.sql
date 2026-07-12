-- Payments: Stripe Connect Express, separate charges & transfers, flat
-- commission. All financial writes are server-only (service role via server
-- actions). Stripe object IDs stored for reconciliation. Clients get narrow
-- read access to their own records only.

create type public.refund_status as enum ('requested', 'approved', 'processed', 'rejected');
create type public.payout_status as enum ('pending', 'in_transit', 'paid', 'failed');

create table public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  customer_user_id uuid not null references public.users (id) on delete cascade,
  stripe_payment_method_id text not null,
  brand text,
  last4 text,
  exp_month int,
  exp_year int,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
create index on public.payment_methods (customer_user_id);

create table public.payment_intents (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id),
  stripe_payment_intent_id text not null unique,
  amount_cents int not null check (amount_cents >= 0),
  currency text not null default 'AUD',
  status text not null,
  created_at timestamptz not null default now()
);

create table public.charges (
  id uuid primary key default gen_random_uuid(),
  payment_intent_id uuid not null references public.payment_intents (id),
  stripe_charge_id text not null unique,
  amount_cents int not null,
  created_at timestamptz not null default now()
);

create table public.refunds (
  id uuid primary key default gen_random_uuid(),
  charge_id uuid not null references public.charges (id),
  stripe_refund_id text unique,
  amount_cents int not null check (amount_cents >= 0),
  status public.refund_status not null default 'requested',
  reason text,
  decided_by uuid references public.users (id),
  created_at timestamptz not null default now()
);

create table public.commissions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id),
  rate_percent numeric(5,2) not null, -- flat rate; value is an owner decision gate
  commission_cents int not null,
  therapist_amount_cents int not null,
  created_at timestamptz not null default now()
);

create table public.therapist_stripe_accounts (
  therapist_user_id uuid primary key references public.users (id) on delete cascade,
  stripe_account_id text not null unique,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.payouts (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid not null references public.users (id),
  booking_id uuid references public.bookings (id),
  stripe_transfer_id text unique,
  amount_cents int not null check (amount_cents >= 0),
  status public.payout_status not null default 'pending',
  created_at timestamptz not null default now()
);
create index on public.payouts (therapist_user_id);

create table public.parking_adjustments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id),
  amount_cents int not null,
  explanation text not null,
  approved_by uuid references public.users (id),
  created_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id),
  customer_user_id uuid not null references public.users (id),
  invoice_number text not null unique,
  total_cents int not null,
  storage_path text,
  created_at timestamptz not null default now()
);
create index on public.invoices (customer_user_id);

-- RLS ----------------------------------------------------------------------
alter table public.payment_methods enable row level security;
alter table public.payment_intents enable row level security;
alter table public.charges enable row level security;
alter table public.refunds enable row level security;
alter table public.commissions enable row level security;
alter table public.therapist_stripe_accounts enable row level security;
alter table public.payouts enable row level security;
alter table public.parking_adjustments enable row level security;
alter table public.invoices enable row level security;

-- Customers read (not write) their saved cards; management is server-only.
create policy "payment_methods_read_own" on public.payment_methods
  for select using (customer_user_id = (select auth.uid()));
create policy "payment_methods_admin_read" on public.payment_methods
  for select using (public.is_admin());

-- Intents/charges/refunds: booking owner + admin read; writes server-only.
create policy "payment_intents_customer_read" on public.payment_intents
  for select using (
    exists (
      select 1 from public.bookings b
      where b.id = payment_intents.booking_id
        and b.customer_user_id = (select auth.uid())
    ) or public.is_admin()
  );
create policy "charges_customer_read" on public.charges
  for select using (
    exists (
      select 1
      from public.payment_intents pi
      join public.bookings b on b.id = pi.booking_id
      where pi.id = charges.payment_intent_id
        and b.customer_user_id = (select auth.uid())
    ) or public.is_admin()
  );
create policy "refunds_customer_read" on public.refunds
  for select using (
    exists (
      select 1
      from public.charges c
      join public.payment_intents pi on pi.id = c.payment_intent_id
      join public.bookings b on b.id = pi.booking_id
      where c.id = refunds.charge_id
        and b.customer_user_id = (select auth.uid())
    ) or public.is_admin()
  );

-- Commission maths: admin-only client-side (therapists see their payout
-- amounts, not the commission ledger).
create policy "commissions_admin_read" on public.commissions
  for select using (public.is_admin());

create policy "stripe_accounts_read_own" on public.therapist_stripe_accounts
  for select using (therapist_user_id = (select auth.uid()) or public.is_admin());

create policy "payouts_therapist_read_own" on public.payouts
  for select using (therapist_user_id = (select auth.uid()) or public.is_admin());

create policy "parking_adjustments_participants_read" on public.parking_adjustments
  for select using (
    exists (
      select 1 from public.bookings b
      where b.id = parking_adjustments.booking_id
        and b.customer_user_id = (select auth.uid())
    )
    or exists (
      select 1 from public.booking_assignments ba
      where ba.booking_id = parking_adjustments.booking_id
        and ba.therapist_user_id = (select auth.uid())
    )
    or public.is_admin()
  );

create policy "invoices_customer_read_own" on public.invoices
  for select using (customer_user_id = (select auth.uid()) or public.is_admin());
