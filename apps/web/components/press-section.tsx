import { Container, Eyebrow } from "@mlfp/ui";

import { PressCard } from "@/components/press-card";
import { press } from "@/content/landing";

export function PressSection() {
  return (
    <section className="bg-surface-muted pt-4 pb-24 md:pb-28">
      <Container width="wide">
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
