/**
 * Hand-written to match the live Supabase schema, then replaced wholesale by:
 *
 *   pnpm dlx supabase gen types typescript --project-id <id> \
 *     > packages/db/src/types.ts
 *
 * Every client in this package is parameterised by `Database`, so regenerating
 * this file is all that is needed to get end-to-end typed queries.
 *
 * Schema of record: `packages/db/sql/0001_applications.sql`.
 */

export type ApplicationStatus = "pending" | "approved" | "waitlisted" | "rejected";

/** One extracurricular row. Only rows the applicant actually filled in are stored. */
export type ApplicationActivity = {
  organization: string;
  role: string;
  description: string;
};

/** The flexible half of an application, stored in the `details` jsonb column. */
export type ApplicationDetails = {
  extracurriculars: ApplicationActivity[];
  honors_awards?: string;
  links?: {
    resume?: string;
    linkedin?: string;
    portfolio?: string;
    other?: string;
  };
  anything_else?: string;
  essays: {
    why_join: string;
    admired_campaign: string;
    team_under_pressure: string;
  };
};

type ApplicationRow = {
  id: string;
  status: ApplicationStatus;
  cohort: string;
  full_name: string;
  email: string;
  phone: string | null;
  education_level: string | null;
  school: string | null;
  grad_year: number | null;
  test_score: string | null;
  details: ApplicationDetails;
  created_at: string;
  updated_at: string;
};

type ApplicationInsert = Omit<
  ApplicationRow,
  "id" | "status" | "created_at" | "updated_at" | "phone" | "education_level" | "school" | "grad_year" | "test_score"
> & {
  id?: string;
  status?: ApplicationStatus;
  created_at?: string;
  updated_at?: string;
  phone?: string | null;
  education_level?: string | null;
  school?: string | null;
  grad_year?: number | null;
  test_score?: string | null;
};

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: ApplicationRow;
        Insert: ApplicationInsert;
        Update: Partial<ApplicationRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
