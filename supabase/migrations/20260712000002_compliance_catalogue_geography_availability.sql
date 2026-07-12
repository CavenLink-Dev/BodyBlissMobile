-- Therapist compliance, service catalogue, geography, availability.
-- Catalogue/pricing tables are structural only — prices and service areas are
-- owner decision gates; no data is seeded here.

create type public.document_review_status as enum ('submitted', 'approved', 'rejected', 'expired');
create type public.location_type as enum ('home', 'hotel', 'workplace');

-- Compliance --------------------------------------------------------------
create table public.document_types (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  requires_expiry boolean not null default true,
  required_for_approval boolean not null default true
);

create table public.therapist_documents (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  document_type_id uuid not null references public.document_types (id),
  storage_path text not null,
  expires_at date,
  review_status public.document_review_status not null default 'submitted',
  reviewed_by uuid references public.users (id),
  reviewed_at timestamptz,
  review_notes text,
  created_at timestamptz not null default now()
);
create index on public.therapist_documents (therapist_user_id);
create index on public.therapist_documents (expires_at) where review_status = 'approved';

create table public.therapist_qualifications (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  institution text,
  year_completed int,
  created_at timestamptz not null default now()
);

create table public.therapist_associations (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  association_name text not null,
  member_number text,
  expires_at date
);

create table public.therapist_equipment (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  item text not null,
  notes text
);

-- Catalogue ---------------------------------------------------------------
create table public.services (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text not null default '',
  active boolean not null default false,
  sort_order int not null default 0
);

create table public.service_variants (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services (id) on delete cascade,
  duration_minutes int not null,
  active boolean not null default false,
  unique (service_id, duration_minutes)
);

create table public.base_prices (
  id uuid primary key default gen_random_uuid(),
  service_variant_id uuid not null references public.service_variants (id) on delete cascade,
  price_cents int not null check (price_cents >= 0),
  currency text not null default 'AUD',
  effective_from date not null,
  effective_to date
);
create index on public.base_prices (service_variant_id, effective_from);

create table public.service_location_types (
  service_id uuid not null references public.services (id) on delete cascade,
  location_type public.location_type not null,
  primary key (service_id, location_type)
);

-- Geography ---------------------------------------------------------------
create table public.suburbs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  postcode text not null,
  active boolean not null default false,
  unique (name, postcode)
);

create table public.travel_zones (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  notes text
);

create table public.travel_surcharges (
  id uuid primary key default gen_random_uuid(),
  travel_zone_id uuid not null references public.travel_zones (id) on delete cascade,
  surcharge_cents int not null check (surcharge_cents >= 0),
  explanation text not null,
  effective_from date not null,
  effective_to date
);

create table public.suburb_zones (
  suburb_id uuid not null references public.suburbs (id) on delete cascade,
  travel_zone_id uuid not null references public.travel_zones (id) on delete cascade,
  primary key (suburb_id, travel_zone_id)
);

create table public.therapist_service_areas (
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  suburb_id uuid not null references public.suburbs (id) on delete cascade,
  primary key (therapist_user_id, suburb_id)
);

create table public.therapist_services (
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  service_variant_id uuid not null references public.service_variants (id) on delete cascade,
  primary key (therapist_user_id, service_variant_id)
);

-- Availability ------------------------------------------------------------
create table public.therapist_availability_rules (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  weekday int not null check (weekday between 0 and 6),
  start_time time not null,
  end_time time not null,
  check (start_time < end_time)
);
create index on public.therapist_availability_rules (therapist_user_id);

create table public.therapist_time_off (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  reason text,
  check (starts_at < ends_at)
);

create table public.buffer_rules (
  id uuid primary key default gen_random_uuid(),
  therapist_user_id uuid references public.users (id) on delete cascade,
  minutes_between_bookings int not null default 30 check (minutes_between_bookings >= 0)
);

-- RLS ----------------------------------------------------------------------
alter table public.document_types enable row level security;
alter table public.therapist_documents enable row level security;
alter table public.therapist_qualifications enable row level security;
alter table public.therapist_associations enable row level security;
alter table public.therapist_equipment enable row level security;
alter table public.services enable row level security;
alter table public.service_variants enable row level security;
alter table public.base_prices enable row level security;
alter table public.service_location_types enable row level security;
alter table public.suburbs enable row level security;
alter table public.travel_zones enable row level security;
alter table public.travel_surcharges enable row level security;
alter table public.suburb_zones enable row level security;
alter table public.therapist_service_areas enable row level security;
alter table public.therapist_services enable row level security;
alter table public.therapist_availability_rules enable row level security;
alter table public.therapist_time_off enable row level security;
alter table public.buffer_rules enable row level security;

-- Document types are reference data.
create policy "document_types_read_all" on public.document_types
  for select using (true);

-- Documents: therapist uploads/reads own; approval is server-only; admin reads.
create policy "therapist_documents_read_own" on public.therapist_documents
  for select using (therapist_user_id = (select auth.uid()));
create policy "therapist_documents_insert_own" on public.therapist_documents
  for insert with check (
    therapist_user_id = (select auth.uid()) and review_status = 'submitted'
  );
create policy "therapist_documents_admin_read" on public.therapist_documents
  for select using (public.is_admin());

-- Qualifications/associations/equipment: therapist manages own; admin reads.
-- Qualifications of approved therapists are publicly readable (shown in words on profiles).
create policy "qualifications_read_public_approved" on public.therapist_qualifications
  for select using (
    exists (
      select 1 from public.therapist_profiles tp
      where tp.user_id = therapist_user_id and tp.status = 'approved'
    )
  );
create policy "qualifications_all_own" on public.therapist_qualifications
  for all using (therapist_user_id = (select auth.uid()))
  with check (therapist_user_id = (select auth.uid()));
create policy "qualifications_admin_read" on public.therapist_qualifications
  for select using (public.is_admin());

create policy "associations_all_own" on public.therapist_associations
  for all using (therapist_user_id = (select auth.uid()))
  with check (therapist_user_id = (select auth.uid()));
create policy "associations_admin_read" on public.therapist_associations
  for select using (public.is_admin());

create policy "equipment_all_own" on public.therapist_equipment
  for all using (therapist_user_id = (select auth.uid()))
  with check (therapist_user_id = (select auth.uid()));
create policy "equipment_admin_read" on public.therapist_equipment
  for select using (public.is_admin());

-- Catalogue: public reads active entries; all writes server-only (admin UI
-- goes through server actions with service role).
create policy "services_read_active" on public.services
  for select using (active);
create policy "services_admin_read" on public.services
  for select using (public.is_admin());
create policy "service_variants_read_active" on public.service_variants
  for select using (active);
create policy "service_variants_admin_read" on public.service_variants
  for select using (public.is_admin());
create policy "base_prices_read_all" on public.base_prices
  for select using (true);
create policy "service_location_types_read_all" on public.service_location_types
  for select using (true);

-- Geography: public reads active suburbs; zones/surcharges public read
-- (surcharges must be explained before payment); writes server-only.
create policy "suburbs_read_active" on public.suburbs
  for select using (active);
create policy "suburbs_admin_read" on public.suburbs
  for select using (public.is_admin());
create policy "travel_zones_read_all" on public.travel_zones
  for select using (true);
create policy "travel_surcharges_read_all" on public.travel_surcharges
  for select using (true);
create policy "suburb_zones_read_all" on public.suburb_zones
  for select using (true);

-- Therapist coverage/services: therapist manages own; admin reads.
create policy "service_areas_all_own" on public.therapist_service_areas
  for all using (therapist_user_id = (select auth.uid()))
  with check (therapist_user_id = (select auth.uid()));
create policy "service_areas_admin_read" on public.therapist_service_areas
  for select using (public.is_admin());
create policy "therapist_services_all_own" on public.therapist_services
  for all using (therapist_user_id = (select auth.uid()))
  with check (therapist_user_id = (select auth.uid()));
create policy "therapist_services_admin_read" on public.therapist_services
  for select using (public.is_admin());

-- Availability: private to the therapist (+admin). Matching reads it server-side.
create policy "availability_all_own" on public.therapist_availability_rules
  for all using (therapist_user_id = (select auth.uid()))
  with check (therapist_user_id = (select auth.uid()));
create policy "availability_admin_read" on public.therapist_availability_rules
  for select using (public.is_admin());
create policy "time_off_all_own" on public.therapist_time_off
  for all using (therapist_user_id = (select auth.uid()))
  with check (therapist_user_id = (select auth.uid()));
create policy "time_off_admin_read" on public.therapist_time_off
  for select using (public.is_admin());
create policy "buffer_rules_read_own" on public.buffer_rules
  for select using (therapist_user_id = (select auth.uid()) or public.is_admin());
