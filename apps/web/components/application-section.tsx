import { Container, Spotlight } from "@mlfp/ui";

import { ApplicationForm } from "@/components/application-form";
import { SectionHeading } from "@/components/section-heading";
import { application } from "@/content/landing";

export function ApplicationSection() {
  return (
    <section
      id="apply"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-border py-24 md:py-32"
    >
      <Spotlight className="top-[-10rem] left-1/2 h-[32rem] w-[32rem] -translate-x-1/2" />

      <Container width="prose">
        <SectionHeading
          eyebrow={application.eyebrow}
          heading={application.heading}
          body={application.body}
          align="center"
        />

        <div className="mt-14">
          <ApplicationForm />
        </div>
      </Container>
    </section>
  );
}
