import { Container } from "@mlfp/ui";

import { SectionHeading } from "@/components/section-heading";
import { value } from "@/content/landing";

export function ValueSection() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading eyebrow={value.eyebrow} heading={value.heading} />

        <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {value.items.map((item) => (
            <div key={item.title} className="border-t border-border pt-6">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 max-w-md leading-relaxed text-foreground-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
