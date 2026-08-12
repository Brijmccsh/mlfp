import { PencilLine } from "lucide-react";

import { Container, DottedGrid, Eyebrow, IconChip, Spotlight } from "@mlfp/ui";

import { ApplicationForm } from "@/components/application-form";
import { application } from "@/content/landing";

export function ApplicationSection() {
  return (
    <section
      id="apply"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-border bg-surface-muted py-24 md:py-32"
    >
      <Spotlight className="top-[-12rem] right-[-10rem] h-[34rem] w-[34rem]" />

      <Container width="prose">
        <div className="flex items-start justify-between gap-10">
          <div>
            <Eyebrow underline>{application.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-display-sm text-balance md:text-display-md">
              {application.heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
              {application.body}
            </p>
          </div>

          <div className="relative hidden shrink-0 sm:block">
            <Spotlight className="inset-[-2.5rem] h-auto w-auto" />
            <DottedGrid className="absolute -top-3 -right-3" columns={4} rows={3} />
            <IconChip size="lg" className="relative">
              <PencilLine />
            </IconChip>
          </div>
        </div>

        <div className="mt-14">
          <ApplicationForm />
        </div>
      </Container>
    </section>
  );
}
