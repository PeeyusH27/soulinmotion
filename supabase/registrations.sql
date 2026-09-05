-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- It is safe to re-run: every statement is idempotent.

create table if not exists public.registrations (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  name        text not null,
  -- the natural key: one seat per person, so a second submit updates the first
  email       text not null,
  phone       text not null,
  city        text not null,
  experience  text not null,
  heard_from  text not null,
  intention   text default '',
  consent     boolean not null default true,

  -- provenance: which button, which url, which campaign
  source      text default '',
  page        text default '',
  utm         jsonb,
  user_agent  text default ''
);

-- what makes `Prefer: resolution=merge-duplicates` on ?on_conflict=email work.
-- Without this index the API route's upsert fails with a 42P10.
--
-- It must be on the bare `email` column, not on lower(email): postgres matches
-- ON CONFLICT (email) against the index by inference target, and an expression
-- index does not match a plain column. Case folding is not lost by dropping the
-- lower() — normalise() in lib/registration.ts lowercases every email before it
-- is ever sent here, so the column only ever holds lowercase.
--
-- Dropped first rather than guarded with `if not exists`, so that a database
-- where an earlier version of this file created the index on lower(email) is
-- actually corrected by a re-run instead of silently keeping the broken one.
drop index if exists public.registrations_email_key;
create unique index registrations_email_key
  on public.registrations (email);

create index if not exists registrations_created_at_idx
  on public.registrations (created_at desc);

-- keep updated_at honest on re-registration
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists registrations_touch on public.registrations;
create trigger registrations_touch
  before update on public.registrations
  for each row execute function public.touch_updated_at();

-- RLS on with no policies: anon and authenticated can do nothing at all.
-- The API route uses the service-role key, which bypasses RLS by design —
-- that key must never reach the browser, i.e. never a NEXT_PUBLIC_ name.
alter table public.registrations enable row level security;

revoke all on public.registrations from anon, authenticated;
