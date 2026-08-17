import { ArrowRight } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Container,
} from "@mlfp/ui";

import { faq } from "@/content/landing";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-24 border-t border-border bg-surface-muted py-20 font-poppins md:py-24"
    >
      <Container
        width="wide"
        className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
      >
        <div>
          <h2 className="max-w-xs text-[clamp(2rem,3.2vw,3rem)] leading-[1.14] font-bold tracking-tight text-foreground">
            {faq.heading}
          </h2>

          <p className="mt-7 max-w-sm leading-relaxed font-semibold text-primary-subtle-foreground">
            {faq.subhead}
          </p>

          <span
            aria-hidden
            className="mt-9 block h-0.5 w-16 rounded-full bg-primary-strong"
          />

          <p className="mt-8 font-semibold text-foreground">{faq.contact.label}</p>
          <a
            href={`mailto:${faq.contact.email}`}
            className="mt-2 inline-flex items-center gap-2 font-medium text-primary-subtle-foreground transition-colors hover:text-primary-hover"
          >
            {faq.contact.email}
            <ArrowRight aria-hidden className="size-4" />
          </a>
        </div>

        <Accordion type="single" collapsible variant="cards">
          {faq.items.map((item, index) => (
            <AccordionItem key={item.question} value={item.question} variant="cards">
              <AccordionTrigger>
                <span className="flex items-center gap-5">
                  <span
                    aria-hidden
                    className="text-sm font-semibold text-foreground-subtle tabular-nums"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-semibold text-foreground">{item.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-11">
                <p className="leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
