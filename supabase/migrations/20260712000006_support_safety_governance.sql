-- Support & safety (incidents, complaints, suspensions, risk flags) and
-- governance (policy versions, acceptances, consents, audit logs).
-- Audit logs are admin-read, server-insert only.

create type public.case_status as enum ('open', 'investigating', 'resolved', 'closed');

create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings (id),
  reported_by uuid not null references public.users (id),
  about_user_id uuid references public.users (id),
  severity text not null default 'normal' check (severity in ('normal', 'high', 'critical')),
  description text not null,
  status public.case_status not null default 'open',
  created_at timestamptz not null default now()
);

create table public.complaints (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings (id),
  raised_by uuid not null references public.users (id),
  description text not null,
  status public.case_status not null default 'open',
  created_at timestamptz not null default now()
);

create table public.support_cases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id),
  booking_id uuid references public.bookings (id),
  subject text not null,
  description text not null,
  status public.case_status not null default 'open',
  created_at timestamptz not null default now()
);

create table public.investigation_notes (
  id uuid primary key default gen_random_uuid(),
  incident_id uuid references public.incidents (id) on delete cascade,
  complaint_id uuid references public.complaints (id) on delete cascade,
  author_user_id uuid not null references public.users (id),
  note text not null,
  created_at timestamptz not null default now(),
  check (incident_id is not null or complaint_id is not null)
);

create table public.suspensions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id),
  reason text not null,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  imposed_by uuid not null references public.users (id),
  created_at timestamptz not null default now()
);

create table public.risk_flags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users (id),
  booking_id uuid references public.bookings (id),
  flag_type text not null,
  detail jsonb,
  created_at timestamptz not null default now()
);

-- Governance ----------------------------------------------------------------
create table public.policy_versions (
  id uuid primary key default gen_random_uuid(),
  policy_code text not null, -- e.g. 'privacy', 'terms', 'cancellation'
  version int not null,
  title text not null,
  body_storage_path text, -- wording is owner/legal-approved content
  effective_from timestamptz,
  active boolean not null default false,
  unique (policy_code, version)
);

create table public.policy_acceptances (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  policy_version_id uuid not null references public.policy_versions (id),
  accepted_at timestamptz not null default now(),
  unique (user_id, policy_version_id)
);

create table public.consent_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  consent_type text not null, -- e.g. 'saved_payment', 'health_notes'
  granted boolean not null,
  context jsonb,
  created_at timestamptz not null default now()
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users (id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  detail jsonb,
  created_at timestamptz not null default now()
);
create index on public.audit_logs (entity_type, entity_id);

-- RLS ----------------------------------------------------------------------
alter table public.incidents enable row level security;
alter table public.complaints enable row level security;
alter table public.support_cases enable row level security;
alter table public.investigation_notes enable row level security;
alter table public.suspensions enable row level security;
alter table public.risk_flags enable row level security;
alter table public.policy_versions enable row level security;
alter table public.policy_acceptances enable row level security;
alter table public.consent_records enable row level security;
alter table public.audit_logs enable row level security;

-- Incidents/complaints/support: reporter sees own submissions and can create
-- them; admins see all; resolution workflow is server-side.
create policy "incidents_read_own" on public.incidents
  for select using (reported_by = (select auth.uid()) or public.is_admin());
create policy "incidents_insert_own" on public.incidents
  for insert with check (reported_by = (select auth.uid()) and status = 'open');
create policy "complaints_read_own" on public.complaints
  for select using (raised_by = (select auth.uid()) or public.is_admin());
create policy "complaints_insert_own" on public.complaints
  for insert with check (raised_by = (select auth.uid()) and status = 'open');
create policy "support_cases_read_own" on public.support_cases
  for select using (user_id = (select auth.uid()) or public.is_admin());
create policy "support_cases_insert_own" on public.support_cases
  for insert with check (user_id = (select auth.uid()) and status = 'open');

-- Investigation notes, suspensions, risk flags: admin-read; writes server-only.
create policy "investigation_notes_admin_read" on public.investigation_notes
  for select using (public.is_admin());
create policy "suspensions_admin_read" on public.suspensions
  for select using (public.is_admin());
create policy "suspensions_read_own" on public.suspensions
  for select using (user_id = (select auth.uid()));
create policy "risk_flags_admin_read" on public.risk_flags
  for select using (public.is_admin());

-- Policies: active versions are public; management server-only.
create policy "policy_versions_read_active" on public.policy_versions
  for select using (active);
create policy "policy_versions_admin_read" on public.policy_versions
  for select using (public.is_admin());
create policy "policy_acceptances_read_own" on public.policy_acceptances
  for select using (user_id = (select auth.uid()) or public.is_admin());
create policy "policy_acceptances_insert_own" on public.policy_acceptances
  for insert with check (user_id = (select auth.uid()));
create policy "consent_records_read_own" on public.consent_records
  for select using (user_id = (select auth.uid()) or public.is_admin());

-- Audit logs: admin read only; inserts happen server-side with service role.
create policy "audit_logs_admin_read" on public.audit_logs
  for select using (public.is_admin());
