import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Container,
} from "@mlfp/ui";

import { SectionHeading } from "@/components/section-heading";
import { faq } from "@/content/landing";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-border bg-surface-muted py-24 md:py-32">
      <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <SectionHeading eyebrow={faq.eyebrow} heading={faq.heading} />

        <Accordion type="single" collapsible>
          {faq.items.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="leading-relaxed">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
