-- Identity and roles (RLS-first).
-- users mirrors auth.users; role data lives in public tables, never in auth schema.
-- Therapist public/private data split by table so RLS can protect surnames,
-- phones and home suburbs (never exposed publicly).

create type public.app_role as enum ('customer', 'therapist', 'admin');
create type public.therapist_status as enum ('draft', 'pending_review', 'approved', 'suspended', 'deactivated');

create table public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now()
);

create table public.admin_roles (
  user_id uuid primary key references public.users (id) on delete cascade,
  granted_by uuid references public.users (id),
  granted_at timestamptz not null default now()
);

-- Security definer helper so policies can check admin membership without recursion.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (select 1 from public.admin_roles where user_id = (select auth.uid()));
$$;

create table public.customer_profiles (
  user_id uuid primary key references public.users (id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  phone text,
  accessibility_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Public-safe therapist fields only. No surname, phone or home suburb here.
create table public.therapist_profiles (
  user_id uuid primary key references public.users (id) on delete cascade,
  display_first_name text not null default '',
  bio text not null default '',
  photo_url text,
  years_experience int,
  status public.therapist_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.therapist_private_details (
  user_id uuid primary key references public.users (id) on delete cascade,
  last_name text not null default '',
  phone text,
  home_suburb text,
  date_of_birth date,
  abn text,
  emergency_contact_name text,
  emergency_contact_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_updated_at before update on public.customer_profiles
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.therapist_profiles
  for each row execute function public.set_updated_at();
create trigger set_updated_at before update on public.therapist_private_details
  for each row execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.admin_roles enable row level security;
alter table public.customer_profiles enable row level security;
alter table public.therapist_profiles enable row level security;
alter table public.therapist_private_details enable row level security;

-- users: own row readable; admins read all. Role changes are server-only.
create policy "users_read_own" on public.users
  for select using (id = (select auth.uid()));
create policy "users_admin_read" on public.users
  for select using (public.is_admin());

-- admin_roles: admins can see the list; membership changes are server-only.
create policy "admin_roles_admin_read" on public.admin_roles
  for select using (public.is_admin());

-- customer_profiles: own row read/insert/update; admin read.
create policy "customer_profiles_read_own" on public.customer_profiles
  for select using (user_id = (select auth.uid()));
create policy "customer_profiles_insert_own" on public.customer_profiles
  for insert with check (user_id = (select auth.uid()));
create policy "customer_profiles_update_own" on public.customer_profiles
  for update using (user_id = (select auth.uid()));
create policy "customer_profiles_admin_read" on public.customer_profiles
  for select using (public.is_admin());

-- therapist_profiles: anyone reads approved profiles; therapist reads/updates
-- own draft; approval state changes are server-only (update cannot set status).
create policy "therapist_profiles_public_read_approved" on public.therapist_profiles
  for select using (status = 'approved');
create policy "therapist_profiles_read_own" on public.therapist_profiles
  for select using (user_id = (select auth.uid()));
create policy "therapist_profiles_insert_own" on public.therapist_profiles
  for insert with check (user_id = (select auth.uid()) and status = 'draft');
create policy "therapist_profiles_update_own" on public.therapist_profiles
  for update using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()) and status in ('draft', 'pending_review'));
create policy "therapist_profiles_admin_read" on public.therapist_profiles
  for select using (public.is_admin());

-- therapist_private_details: therapist own + admin only. Never public.
create policy "therapist_private_read_own" on public.therapist_private_details
  for select using (user_id = (select auth.uid()));
create policy "therapist_private_insert_own" on public.therapist_private_details
  for insert with check (user_id = (select auth.uid()));
create policy "therapist_private_update_own" on public.therapist_private_details
  for update using (user_id = (select auth.uid()));
create policy "therapist_private_admin_read" on public.therapist_private_details
  for select using (public.is_admin());
