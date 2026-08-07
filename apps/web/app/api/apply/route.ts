import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdminClient } from "@mlfp/db/admin";

import { EDUCATION_LEVELS } from "@/content/landing";

const currentYear = new Date().getFullYear();

const applicationSchema = z.object({
  fullName: z.string().trim().min(1).max(120),
  email: z.email().max(255),
  phone: z.string().trim().min(5).max(40),
  educationLevel: z.enum(EDUCATION_LEVELS),
  school: z.string().trim().min(1).max(200),
  graduationYear: z.number().int().min(currentYear - 20).max(currentYear + 12),
  // Free-form so the short-answer questions can change without a migration.
  answers: z.record(z.string(), z.string().trim().min(1).max(2000)),
});

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

  try {
    const supabase = createSupabaseAdminClient();

    const { error } = await supabase.from("applications").insert({
      full_name: application.fullName,
      email: application.email,
      phone: application.phone,
      education_level: application.educationLevel,
      school: application.school,
      graduation_year: application.graduationYear,
      answers: application.answers,
    });

    if (error) {
      console.error("[apply] insert failed:", error.message);
      return NextResponse.json({ error: "insert_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    // Reached when Supabase is not provisioned yet — the env loader throws on
    // the first call rather than at import time.
    console.error("[apply] unavailable:", error);
    return NextResponse.json({ error: "unavailable" }, { status: 503 });
  }
}
