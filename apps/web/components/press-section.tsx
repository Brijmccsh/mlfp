import { Container, Eyebrow } from "@mlfp/ui";

import { PressCard } from "@/components/press-card";
import { press } from "@/content/landing";

export function PressSection() {
  return (
    <section className="border-t border-border py-20 md:py-24">
      <Container>
        <Eyebrow underline>{press.eyebrow}</Eyebrow>

        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {press.items.map((item) => (
            <PressCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
