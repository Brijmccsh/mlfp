import { Container } from "@mlfp/ui";

import { SectionHeading } from "@/components/section-heading";
import { modules } from "@/content/landing";

export function ModulesSection() {
  return (
    <section id="modules" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <SectionHeading
          eyebrow={modules.eyebrow}
          heading={modules.heading}
          body={modules.body}
        />

        <ol className="mt-16 border-t border-border">
          {modules.items.map((item) => (
            <li
              key={item.number}
              className="group grid gap-4 border-b border-border py-10 md:grid-cols-[auto_1fr] md:gap-12"
            >
              <span
                aria-hidden
                className="font-display text-display-sm leading-none font-semibold text-border-strong transition-colors duration-200 ease-emphasis group-hover:text-primary md:w-24"
              >
                {item.number}
              </span>
              <div className="max-w-2xl">
                <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-foreground-muted">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
