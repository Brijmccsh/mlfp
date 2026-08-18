import { NextResponse } from "next/server";

import {
  toEducationLevel,
  toGradYear,
  type ApplicationPayload,
} from "@/lib/application";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export type { Activity, ApplicationPayload } from "@/lib/application";

/**
 * Only the columns the table declares NOT NULL, which is also exactly what the
 * form enforces before it lets someone submit. school / gradYear /
 * educationLevel are deliberately not required here: the form labels them
 * optional, so requiring them would 400 a valid applicant.
 */
const REQUIRED = ["fullName", "email", "startTerm"] as const;

const SUPPORT_EMAIL = "admin@themlfp.com";

/** Postgres unique_violation — the (lower(email), cohort) index. */
const UNIQUE_VIOLATION = "23505";

export async function POST(request: Request) {
  let body: Partial<ApplicationPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const missing = REQUIRED.filter((field) => !body[field]);
  if (missing.length > 0) {
    return NextResponse.json(
      { error: "Missing required fields", fields: missing },
      { status: 400 },
    );
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      {
        error: `We can't accept applications right now. Please email ${SUPPORT_EMAIL} and we'll take it from there.`,
      },
      { status: 503 },
    );
  }

  const application = body as ApplicationPayload;

  const { data, error } = await supabase
    .from("applications")
    .insert({
      cohort: application.startTerm,
      full_name: application.fullName,
      // Lowercased to match the unique index on (lower(email), cohort).
      email: application.email.toLowerCase(),
      phone: application.phone ?? null,
      education_level: toEducationLevel(application.educationLevel),
      school: application.school ?? null,
      grad_year: toGradYear(application.gradYear),
      test_score: application.testScore ?? null,
      details: {
        activities: application.activities ?? [],
        honors: application.honors ?? null,
        links: {
          resume: application.resume ?? null,
          linkedin: application.linkedin ?? null,
          portfolio: application.portfolio ?? null,
        },
        essays: application.essays ?? [],
        anythingElse: application.anythingElse ?? null,
        // education_level collapses five form labels into two buckets; keeping
        // the raw label means no answer is lost if the CHECK is widened later.
        educationLevelLabel: application.educationLevel ?? null,
      },
    })
    .select("id")
    .single();

  if (error) {
    if (error.code === UNIQUE_VIOLATION) {
      return NextResponse.json(
        {
          error:
            "It looks like you've already applied for this cohort with that email address.",
        },
        { status: 409 },
      );
    }

    console.error("[apply] insert failed", error);
    return NextResponse.json(
      { error: "We couldn't save your application. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
