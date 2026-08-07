-- Fellowship applications submitted from the public marketing site.
--
-- This file mirrors the table that is already live in Supabase. It is a record
-- of the schema, not a migration to run against it — applying it to the live
-- project is a no-op because every statement is guarded.

create table if not exists public.applications (
  id              uuid        primary key default gen_random_uuid(),
  status          text        not null default 'pending'
                              check (status in ('pending', 'approved', 'waitlisted', 'rejected')),
  cohort          text        not null,
  full_name       text        not null,
  email           text        not null,
  phone           text,
  education_level text        check (education_level in ('high_school', 'college')),
  school          text,
  grad_year       integer,
  -- Highest PSAT / SAT / ACT score. Free text: students report these in
  -- different formats and we would rather capture it verbatim.
  test_score      text,
  -- Everything that varies by cohort: extracurriculars, honors, links, essays.
  -- Kept in jsonb so the form can change without a migration.
  details         jsonb       not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- One application per person per cohort, case-insensitive on email.
-- The API turns a violation of this into a friendly 409.
create unique index if not exists applications_email_cohort_key
  on public.applications (lower(email), cohort);

create index if not exists applications_status_idx     on public.applications (status);
create index if not exists applications_cohort_idx     on public.applications (cohort);
create index if not exists applications_created_at_idx on public.applications (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at
  before update on public.applications
  for each row execute function public.set_updated_at();

-- RLS on with no policies: the anon key can neither read nor write. The public
-- form inserts through the service-role key, which bypasses RLS.
alter table public.applications enable row level security;
