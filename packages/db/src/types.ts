/**
 * Hand-written until the Supabase project exists, then replaced wholesale by:
 *
 *   pnpm dlx supabase gen types typescript --project-id <id> \
 *     > packages/db/src/types.ts
 *
 * Every client in this package is parameterised by `Database`, so regenerating
 * this file is all that is needed to get end-to-end typed queries.
 *
 * Schema lives in `packages/db/sql/`.
 */

/** Short-answer responses, keyed by question name. Free-form by design. */
export type ApplicationAnswers = Record<string, string>;

type ApplicationRow = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  education_level: string;
  school: string;
  graduation_year: number;
  answers: ApplicationAnswers;
};

export type Database = {
  public: {
    Tables: {
      applications: {
        Row: ApplicationRow;
        Insert: Omit<ApplicationRow, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        };
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
