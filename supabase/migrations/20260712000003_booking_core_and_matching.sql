-- Booking core (with confirmation-time snapshots), addresses, matching.
-- Booking status uses plain words shown to customers. Snapshots make
-- historical bookings reconstructable independent of mutable profiles/prices.
-- Matching is server-only and auditable.

create type public.booking_status as enum
  ('requested', 'matched', 'confirmed', 'on_the_way', 'completed', 'cancelled');
create type public.assignment_status as enum
  ('offered', 'accepted', 'declined', 'confirmed', 'completed', 'cancelled');
create type public.matching_status as enum
  ('open', 'shortlisted', 'assigned', 'exhausted', 'cancelled');

-- Long-lived saved addresses: customer-private (therapists never see this table).
create table public.customer_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_user_id uuid not null references public.users (id) on delete cascade,
  label text not null default '',
  street_address text not null,
  suburb text not null,
  postcode text not null,
  state text not null default 'SA',
  access_notes text,
  parking_notes text,
  created_at timestamptz not null default now()
);
create index on public.customer_addresses (customer_user_id);

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  customer_user_id uuid not null references public.users (id),
  status public.booking_status not null default 'requested',
  location_type public.location_type not null,
  service_variant_id uuid references public.service_variants (id),
  requested_start timestamptz not null,
  gender_preference text,
  customer_notes text,
  notes_flagged boolean not null default false, -- keyword screening (server-side)
  -- Confirmation-time snapshots (server-written):
  service_name_snapshot text,
  duration_minutes_snapshot int,
  price_cents_snapshot int,
  surcharge_explanation_snapshot text,
  therapist_snapshot jsonb,
  address_snapshot jsonb,
  policy_versions_snapshot jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index on public.bookings (customer_user_id);
create index on public.bookings (status);
create trigger set_updated_at before update on public.bookings
  for each row execute function public.set_updated_at();

-- Exact service location for one booking; unmasking is time/state-gated.
create table public.booking_locations (
  booking_id uuid primary key references public.bookings (id) on delete cascade,
  street_address text not null,
  suburb text not null,
  postcode text not null,
  state text not null default 'SA',
  access_notes text,
  parking_notes text
);

create table public.booking_assignments (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  therapist_user_id uuid not null references public.users (id),
  assignment_status public.assignment_status not null default 'offered',
  offered_at timestamptz not null default now(),
  responded_at timestamptz,
  unique (booking_id, therapist_user_id)
);
create index on public.booking_assignments (therapist_user_id);

create table public.booking_status_history (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  from_status public.booking_status,
  to_status public.booking_status not null,
  changed_by uuid references public.users (id),
  reason text,
  created_at timestamptz not null default now()
);
create index on public.booking_status_history (booking_id);

create table public.booking_consents (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  consent_type text not null,
  policy_version_id uuid,
  accepted_at timestamptz not null default now(),
  accepted_by uuid not null references public.users (id)
);

-- Matching (server-only; observable and auditable) -------------------------
create table public.matching_requests (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  status public.matching_status not null default 'open',
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create table public.matching_candidates (
  id uuid primary key default gen_random_uuid(),
  matching_request_id uuid not null references public.matching_requests (id) on delete cascade,
  therapist_user_id uuid not null references public.users (id),
  rank int,
  excluded boolean not null default false,
  exclusion_reason text,
  created_at timestamptz not null default now()
);

create table public.matching_events (
  id uuid primary key default gen_random_uuid(),
  matching_request_id uuid not null references public.matching_requests (id) on delete cascade,
  event text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

-- RLS ----------------------------------------------------------------------
alter table public.customer_addresses enable row level security;
alter table public.bookings enable row level security;
alter table public.booking_locations enable row level security;
alter table public.booking_assignments enable row level security;
alter table public.booking_status_history enable row level security;
alter table public.booking_consents enable row level security;
alter table public.matching_requests enable row level security;
alter table public.matching_candidates enable row level security;
alter table public.matching_events enable row level security;

-- Saved addresses: customer-private only (+admin).
create policy "addresses_all_own" on public.customer_addresses
  for all using (customer_user_id = (select auth.uid()))
  with check (customer_user_id = (select auth.uid()));
create policy "addresses_admin_read" on public.customer_addresses
  for select using (public.is_admin());

-- Bookings: customer sees own; assigned therapist sees theirs; admin all.
-- Creation and all status/snapshot writes are server-only.
create policy "bookings_customer_read_own" on public.bookings
  for select using (customer_user_id = (select auth.uid()));
create policy "bookings_therapist_read_assigned" on public.bookings
  for select using (
    exists (
      select 1 from public.booking_assignments ba
      where ba.booking_id = bookings.id
        and ba.therapist_user_id = (select auth.uid())
        and ba.assignment_status in ('accepted', 'confirmed', 'completed')
    )
  );
create policy "bookings_admin_read" on public.bookings
  for select using (public.is_admin());

-- Exact address: customer always; assigned therapist only once confirmed
-- (tighter time-window unmasking is enforced server-side on top of this).
create policy "booking_locations_customer_read" on public.booking_locations
  for select using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_locations.booking_id
        and b.customer_user_id = (select auth.uid())
    )
  );
create policy "booking_locations_therapist_read_confirmed" on public.booking_locations
  for select using (
    exists (
      select 1
      from public.bookings b
      join public.booking_assignments ba on ba.booking_id = b.id
      where b.id = booking_locations.booking_id
        and ba.therapist_user_id = (select auth.uid())
        and ba.assignment_status = 'confirmed'
        and b.status in ('confirmed', 'on_the_way')
    )
  );
create policy "booking_locations_admin_read" on public.booking_locations
  for select using (public.is_admin());

-- Assignments: therapist sees own offers/assignments and can respond to an
-- offer; customer sees assignments on own bookings; admin all. Offer creation
-- is server-only.
create policy "assignments_therapist_read_own" on public.booking_assignments
  for select using (therapist_user_id = (select auth.uid()));
create policy "assignments_therapist_respond" on public.booking_assignments
  for update using (
    therapist_user_id = (select auth.uid())
    and assignment_status = 'offered'
  )
  with check (
    therapist_user_id = (select auth.uid())
    and assignment_status in ('accepted', 'declined')
  );
create policy "assignments_customer_read" on public.booking_assignments
  for select using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_assignments.booking_id
        and b.customer_user_id = (select auth.uid())
    )
  );
create policy "assignments_admin_read" on public.booking_assignments
  for select using (public.is_admin());

-- Status history: booking participants read; writes server-only.
create policy "status_history_participants_read" on public.booking_status_history
  for select using (
    exists (
      select 1 from public.bookings b
      where b.id = booking_status_history.booking_id
        and b.customer_user_id = (select auth.uid())
    )
    or exists (
      select 1 from public.booking_assignments ba
      where ba.booking_id = booking_status_history.booking_id
        and ba.therapist_user_id = (select auth.uid())
    )
    or public.is_admin()
  );

-- Consents: the person who accepted (or admin) can read; writes server-only.
create policy "consents_read_own" on public.booking_consents
  for select using (accepted_by = (select auth.uid()) or public.is_admin());

-- Matching: admin-readable, otherwise server-only (no client policies).
create policy "matching_requests_admin_read" on public.matching_requests
  for select using (public.is_admin());
create policy "matching_candidates_admin_read" on public.matching_candidates
  for select using (public.is_admin());
create policy "matching_events_admin_read" on public.matching_events
  for select using (public.is_admin());
