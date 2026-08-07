import { Container, Spotlight } from "@mlfp/ui";

import { SectionHeading } from "@/components/section-heading";
import { challenge } from "@/content/landing";

export function ChallengeSection() {
  return (
    <section
      id="challenge"
      className="relative isolate scroll-mt-20 overflow-hidden border-t border-border bg-surface-muted py-24 md:py-32"
    >
      <Spotlight className="top-[-8rem] right-[-12rem] h-[34rem] w-[34rem]" />

      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <SectionHeading
            eyebrow={challenge.eyebrow}
            heading={challenge.heading}
            body={challenge.body}
          />

          <div className="lg:text-right">
            <p
              aria-hidden
              className="font-display text-display-lg leading-none font-semibold text-primary xl:text-display-xl"
            >
              {challenge.budget.value}
            </p>
            <p className="mt-3 text-sm text-foreground-muted">{challenge.budget.label}</p>
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {challenge.steps.map((step, index) => (
            <li key={step.title} className="bg-surface p-8">
              <span
                aria-hidden
                className="font-display text-sm font-semibold text-accent-subtle-foreground"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-foreground-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
