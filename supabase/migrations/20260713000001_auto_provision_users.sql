-- Auto-provision a public.users + customer_profiles row when an auth user is
-- created. public.users and customer_profiles are otherwise server-only to
-- insert; this trigger (security definer) keeps signup working without the
-- service-role key and guarantees the FK target exists before any booking.
-- Lives in the internal schema so it is NOT exposed via the PostgREST API.
create or replace function internal.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.users (id, role)
    values (new.id, 'customer')
    on conflict (id) do nothing;

  insert into public.customer_profiles (user_id, first_name, last_name)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'first_name', ''),
      coalesce(new.raw_user_meta_data ->> 'last_name', '')
    )
    on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function internal.handle_new_user();
