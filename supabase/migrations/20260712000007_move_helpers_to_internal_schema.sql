-- Move RLS helper functions out of the PostgREST-exposed public schema so
-- they cannot be called via /rest/v1/rpc (security advisor 0028/0029).
-- Policies referencing them keep working: they bind by function OID.

create schema if not exists internal;

alter function public.is_admin() set schema internal;
alter function public.is_thread_participant(uuid) set schema internal;

-- Policy expressions run as the querying role, which therefore needs
-- schema usage + execute (already granted on the functions themselves).
grant usage on schema internal to anon, authenticated;
