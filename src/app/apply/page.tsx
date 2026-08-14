import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply — Marketing Leaders Fellowship Program",
};

// Form fields and copy follow design/Application.dc.html.
export default function Apply() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold text-navy-700">Apply now</h1>
    </main>
  );
}
