/**
 * Shared contract between the application form and POST /api/apply.
 *
 * Deliberately free of server-only imports: the client component builds the
 * payload with `toApplicationPayload`, and the route handler consumes the same
 * types. If the form's fields ever drift from this shape, typecheck fails here
 * rather than silently posting a field the route ignores.
 */

export type Activity = {
  organization: string;
  role: string;
  description: string;
};

export type ApplicationPayload = {
  fullName: string;
  email: string;
  phone?: string;
  educationLevel?: string;
  school?: string;
  gradYear?: string;
  startTerm: string;
  testScore?: string;
  activities: Activity[];
  honors?: string;
  resume?: string;
  linkedin?: string;
  portfolio?: string;
  essays: [string, string, string];
  anythingElse?: string;
};

/** The form's own state shape (see EMPTY_FORM in application-form.tsx). */
export type ApplicationFormValues = {
  fullName: string;
  email: string;
  phone: string;
  education: string;
  gradYear: string;
  school: string;
  cohort: string;
  testScore: string;
  honors: string;
  resume: string;
  linkedin: string;
  portfolio: string;
  other: string;
  essay1: string;
  essay2: string;
  essay3: string;
};

export type ApplicationFormActivity = { org: string; role: string; desc: string };

/**
 * `applications.education_level` has a CHECK constraint allowing only
 * 'high_school' or 'college', but the form offers five labels. These four map
 * onto the two buckets as pre-secondary vs. post-secondary; "Other" has no
 * honest bucket and maps to null.
 *
 * Nothing is dropped either way — the raw label is always preserved in
 * details.educationLevelLabel, so widening the constraint later can backfill
 * from existing rows.
 */
const EDUCATION_LEVEL_BY_LABEL: Record<string, "high_school" | "college"> = {
  "High school student": "high_school",
  "High school graduate": "high_school",
  "Undergraduate student": "college",
  "Graduate student": "college",
};

export function toEducationLevel(label: string | undefined) {
  return EDUCATION_LEVEL_BY_LABEL[(label ?? "").trim()] ?? null;
}

/**
 * `grad_year` is an integer column and the form sends free text. Anything that
 * is not a plain year is stored as null rather than failing the insert.
 */
export function toGradYear(raw: string | undefined) {
  const trimmed = (raw ?? "").trim();
  return /^\d{4}$/.test(trimmed) ? Number(trimmed) : null;
}

const clean = (v: string | undefined) => {
  const trimmed = (v ?? "").trim();
  return trimmed ? trimmed : undefined;
};

export function toApplicationPayload(
  form: ApplicationFormValues,
  activities: ApplicationFormActivity[],
): ApplicationPayload {
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    phone: clean(form.phone),
    educationLevel: clean(form.education),
    school: clean(form.school),
    gradYear: clean(form.gradYear),
    startTerm: form.cohort.trim(),
    testScore: clean(form.testScore),
    // Rows the applicant added but left blank are not applications data.
    activities: activities
      .filter((a) => a.org.trim())
      .map((a) => ({
        organization: a.org.trim(),
        role: a.role.trim(),
        description: a.desc.trim(),
      })),
    honors: clean(form.honors),
    resume: clean(form.resume),
    linkedin: clean(form.linkedin),
    portfolio: clean(form.portfolio),
    essays: [form.essay1.trim(), form.essay2.trim(), form.essay3.trim()],
    anythingElse: clean(form.other),
  };
}
