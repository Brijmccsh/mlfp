import { Container } from "@mlfp/ui";

import { credibility } from "@/content/landing";

export function CredibilityStrip() {
  return (
    <section className="border-y border-border bg-surface-muted">
      <Container className="py-14">
        <p className="max-w-3xl font-display text-xl leading-snug text-balance sm:text-2xl">
          {credibility.lead}
        </p>
        <ul className="mt-9 grid gap-x-10 gap-y-4 sm:grid-cols-3">
          {credibility.points.map((point) => (
            <li key={point} className="border-t border-border-strong pt-4 text-sm leading-relaxed text-foreground-muted">
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
