-- Reviews (verified, from completed bookings only), favourites, blocklists,
-- booking-scoped messaging, notifications. Message/notes keyword screening
-- happens server-side; flags are server-written.

create type public.review_status as enum ('pending', 'approved', 'hidden');

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id),
  reviewer_user_id uuid not null references public.users (id),
  therapist_user_id uuid not null references public.users (id),
  rating int not null check (rating between 1 and 5),
  comment text,
  status public.review_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (booking_id, reviewer_user_id)
);
create index on public.reviews (therapist_user_id) where status = 'approved';

create table public.favourite_therapists (
  customer_user_id uuid not null references public.users (id) on delete cascade,
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (customer_user_id, therapist_user_id)
);

create table public.blocked_therapists (
  customer_user_id uuid not null references public.users (id) on delete cascade,
  therapist_user_id uuid not null references public.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (customer_user_id, therapist_user_id)
);

create table public.message_threads (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings (id) on delete cascade,
  open boolean not null default true,
  created_at timestamptz not null default now(),
  unique (booking_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.message_threads (id) on delete cascade,
  sender_user_id uuid not null references public.users (id),
  body text not null,
  flagged boolean not null default false, -- keyword screening (server-side)
  created_at timestamptz not null default now()
);
create index on public.messages (thread_id, created_at);

create table public.notification_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  channel text not null check (channel in ('email', 'sms')),
  template text not null,
  payload jsonb,
  sent_at timestamptz,
  created_at timestamptz not null default now()
);
create index on public.notification_events (user_id);

create table public.notification_preferences (
  user_id uuid primary key references public.users (id) on delete cascade,
  email_enabled boolean not null default true,
  sms_enabled boolean not null default true,
  updated_at timestamptz not null default now()
);
create trigger set_updated_at before update on public.notification_preferences
  for each row execute function public.set_updated_at();

-- Helper: is the current user a participant of the thread's booking?
create or replace function public.is_thread_participant(p_thread_id uuid)
returns boolean
language sql
security definer
set search_path = ''
stable
as $$
  select exists (
    select 1
    from public.message_threads mt
    join public.bookings b on b.id = mt.booking_id
    left join public.booking_assignments ba
      on ba.booking_id = b.id
      and ba.assignment_status in ('accepted', 'confirmed', 'completed')
    where mt.id = p_thread_id
      and (
        b.customer_user_id = (select auth.uid())
        or ba.therapist_user_id = (select auth.uid())
      )
  );
$$;

-- RLS ----------------------------------------------------------------------
alter table public.reviews enable row level security;
alter table public.favourite_therapists enable row level security;
alter table public.blocked_therapists enable row level security;
alter table public.message_threads enable row level security;
alter table public.messages enable row level security;
alter table public.notification_events enable row level security;
alter table public.notification_preferences enable row level security;

-- Reviews: public reads approved; reviewer inserts only for own completed
-- booking, once; moderation is server-only.
create policy "reviews_read_approved" on public.reviews
  for select using (status = 'approved');
create policy "reviews_read_own" on public.reviews
  for select using (reviewer_user_id = (select auth.uid()));
create policy "reviews_insert_participant" on public.reviews
  for insert with check (
    reviewer_user_id = (select auth.uid())
    and status = 'pending'
    and exists (
      select 1 from public.bookings b
      where b.id = reviews.booking_id
        and b.customer_user_id = (select auth.uid())
        and b.status = 'completed'
    )
    and exists (
      select 1 from public.booking_assignments ba
      where ba.booking_id = reviews.booking_id
        and ba.therapist_user_id = reviews.therapist_user_id
        and ba.assignment_status = 'completed'
    )
  );
create policy "reviews_admin_read" on public.reviews
  for select using (public.is_admin());

-- Favourites/blocklists: user-private only.
create policy "favourites_all_own" on public.favourite_therapists
  for all using (customer_user_id = (select auth.uid()))
  with check (customer_user_id = (select auth.uid()));
create policy "blocked_all_own" on public.blocked_therapists
  for all using (customer_user_id = (select auth.uid()))
  with check (customer_user_id = (select auth.uid()));
create policy "blocked_admin_read" on public.blocked_therapists
  for select using (public.is_admin());

-- Threads/messages: booking participants + admin. Thread creation server-side.
create policy "threads_participants_read" on public.message_threads
  for select using (public.is_thread_participant(id) or public.is_admin());
create policy "messages_participants_read" on public.messages
  for select using (public.is_thread_participant(thread_id) or public.is_admin());
create policy "messages_participants_insert" on public.messages
  for insert with check (
    sender_user_id = (select auth.uid())
    and flagged = false
    and public.is_thread_participant(thread_id)
    and exists (
      select 1 from public.message_threads mt
      where mt.id = messages.thread_id and mt.open
    )
  );

-- Notifications: own read; sending pipeline is server-only.
create policy "notification_events_read_own" on public.notification_events
  for select using (user_id = (select auth.uid()));
create policy "notification_prefs_all_own" on public.notification_preferences
  for all using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));
