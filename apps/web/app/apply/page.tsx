import type { Metadata } from "next";

import { Container } from "@mlfp/ui";

import { ApplyForm } from "@/components/apply-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { apply } from "@/content/landing";

export const metadata: Metadata = {
  title: "Apply — Marketing Leaders Fellowship Program",
  description: apply.subhead,
};

export default function ApplyPage() {
  return (
    <>
      <SiteHeader />
      <main className="bg-background py-16 font-poppins md:py-20">
        <Container width="prose" className="max-w-[45rem]">
          <h1 className="text-[clamp(1.9rem,3vw,2.75rem)] leading-tight font-bold tracking-tight text-balance text-foreground">
            {apply.heading}
          </h1>
          <p className="mt-4 leading-relaxed text-foreground-muted">{apply.subhead}</p>

          <div className="mt-10">
            <ApplyForm />
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
