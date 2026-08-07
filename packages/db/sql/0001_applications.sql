-- Fellowship applications submitted from the public marketing site.
-- Run against the Supabase project, then regenerate packages/db/src/types.ts.

create table if not exists public.applications (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  full_name       text        not null,
  email           text        not null,
  phone           text        not null,
  education_level text        not null check (education_level in ('high_school', 'college')),
  school          text        not null,
  graduation_year integer     not null check (graduation_year between 1950 and 2100),
  -- Short answers, keyed by question name, so the form can change without a
  -- migration.
  answers         jsonb       not null default '{}'::jsonb
);

create index if not exists applications_created_at_idx
  on public.applications (created_at desc);

-- The public form writes through the service-role key, which bypasses RLS.
-- RLS stays on so that the anon key can never read or write this table.
alter table public.applications enable row level security;
