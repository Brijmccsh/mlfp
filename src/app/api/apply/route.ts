import { NextResponse } from "next/server";

export type Activity = {
  organization: string;
  role: string;
  description: string;
};

export type Application = {
  fullName: string;
  email: string;
  phone?: string;
  educationLevel: string;
  school: string;
  gradYear: string;
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

const REQUIRED = [
  "fullName",
  "email",
  "educationLevel",
  "school",
  "gradYear",
  "startTerm",
] as const;

export async function POST(request: Request) {
  let body: Partial<Application>;

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

  // TODO: deliver the application (email, CRM, or datastore) before launch.
  // Returning 501 rather than 200 so a submission is never silently dropped.
  return NextResponse.json(
    { error: "Application delivery is not configured yet" },
    { status: 501 },
  );
}
