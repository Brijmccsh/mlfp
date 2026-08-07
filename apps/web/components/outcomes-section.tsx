import { Award, FileText, ScrollText } from "lucide-react";

import { Container } from "@mlfp/ui";

import { SectionHeading } from "@/components/section-heading";
import { outcomes } from "@/content/landing";

const ICONS = [ScrollText, Award, FileText] as const;

export function OutcomesSection() {
  return (
    <section id="outcomes" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={outcomes.eyebrow}
          heading={outcomes.heading}
          body={outcomes.body}
        />

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-12">
          {outcomes.items.map((item, index) => {
            const Icon = ICONS[index] ?? ScrollText;

            return (
              <div key={item.title} className="border-t-2 border-accent pt-6">
                <Icon aria-hidden className="size-6 text-accent-subtle-foreground" />
                <h3 className="mt-5 font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
