import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdminClient } from "@mlfp/db/admin";
import type { ApplicationDetails } from "@mlfp/db/types";

import { COHORTS, EDUCATION_LEVELS } from "@/content/landing";

/** Postgres unique-violation. Raised by the unique (lower(email), cohort) index. */
const UNIQUE_VIOLATION = "23505";

/** Trims, then treats an empty string as "not provided". */
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => (value.length > 0 ? value : undefined))
    .optional();

/** Empty is fine; anything else has to be a real URL. */
const optionalUrl = z
  .union([z.literal(""), z.url().max(500)])
  .transform((value) => (value ? value : undefined))
  .optional();

const activitySchema = z.object({
  organization: z.string().trim().max(200),
  role: z.string().trim().max(200),
  description: z.string().trim().max(1500),
});

const essaySchema = z.string().trim().min(1).max(6000);

const applicationSchema = z.object({
  cohort: z.enum(COHORTS),

  fullName: z.string().trim().min(1).max(120),
  email: z.email().max(255),
  phone: optionalText(40),
  educationLevel: z.enum(EDUCATION_LEVELS),
  school: optionalText(200),
  gradYear: z.number().int().min(1950).max(2100).optional(),
  testScore: optionalText(60),

  extracurriculars: z
    .array(activitySchema)
    .max(5)
    // Blank rows are the applicant leaving the form alone, not an error.
    .transform((rows) =>
      rows.filter((row) => row.organization || row.role || row.description),
    )
    .refine((rows) => rows.length >= 1, {
      message: "Add at least one extracurricular activity.",
    })
    .refine((rows) => rows.every((row) => row.organization.length > 0), {
      message: "Each activity needs an organization or activity name.",
    }),

  honorsAwards: optionalText(3000),

  links: z
    .object({
      resume: optionalUrl,
      linkedin: optionalUrl,
      portfolio: optionalUrl,
      other: optionalUrl,
    })
    .optional(),

  essays: z.object({
    why_join: essaySchema,
    admired_campaign: essaySchema,
    team_under_pressure: essaySchema,
  }),

  anythingElse: optionalText(3000),
});

/** Drops keys whose value is undefined, so `details` holds no empty entries. */
function compact<T extends Record<string, string | undefined>>(source: T) {
  const entries = Object.entries(source).filter(([, value]) => value !== undefined);
  return entries.length > 0 ? (Object.fromEntries(entries) as Partial<T>) : undefined;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_application", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const application = parsed.data;

  const links = application.links ? compact(application.links) : undefined;

  const details: ApplicationDetails = {
    extracurriculars: application.extracurriculars,
    ...(application.honorsAwards ? { honors_awards: application.honorsAwards } : {}),
    ...(links ? { links } : {}),
    ...(application.anythingElse ? { anything_else: application.anythingElse } : {}),
    essays: application.essays,
  };

  try {
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.from("applications").insert({
      cohort: application.cohort,
      full_name: application.fullName,
      email: application.email,
      phone: application.phone ?? null,
      education_level: application.educationLevel,
      school: application.school ?? null,
      grad_year: application.gradYear ?? null,
      test_score: application.testScore ?? null,
      details,
    });

    if (error) {
      if (error.code === UNIQUE_VIOLATION) {
        return NextResponse.json({ error: "already_applied" }, { status: 409 });
      }

      console.error("[apply] insert failed:", error.message);
      return NextResponse.json({ error: "insert_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    // Reached when Supabase is not configured — the env loader throws on first
    // call rather than at import time.
    console.error("[apply] unavailable:", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
