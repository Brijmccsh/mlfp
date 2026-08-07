import { Container } from "@mlfp/ui";

import { summary } from "@/content/landing";

export function SummarySection() {
  return (
    <section className="py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="text-eyebrow text-primary-subtle-foreground uppercase">
            {summary.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-display-sm text-balance md:text-display-md">
            {summary.heading}
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:pt-3">
          {summary.body.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "text-xl leading-relaxed text-foreground"
                  : "text-lg leading-relaxed text-foreground-muted"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
