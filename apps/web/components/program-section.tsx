import { Card, CardContent, CardDescription, CardHeader, CardTitle, Container } from "@mlfp/ui";

import { SectionHeading } from "@/components/section-heading";
import { program } from "@/content/landing";

export function ProgramSection() {
  return (
    <section id="program" className="scroll-mt-20 border-t border-border bg-surface-muted py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={program.eyebrow}
          heading={program.heading}
          body={program.body}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {program.phases.map((phase, index) => (
            <Card key={phase.title} className="flex flex-col bg-surface">
              <CardHeader>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-eyebrow text-accent-subtle-foreground uppercase">
                    {phase.eyebrow}
                  </span>
                  <span
                    aria-hidden
                    className="font-display text-2xl leading-none font-semibold text-border-strong"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <CardTitle className="mt-3 text-xl">{phase.title}</CardTitle>
                <CardDescription className="mt-2 text-base leading-relaxed">
                  {phase.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <p className="border-t border-border pt-4 text-sm text-foreground-subtle">
                  {phase.detail}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
