import { ArrowRight } from "lucide-react";

import { Badge, Button, Container, Media, Spotlight } from "@mlfp/ui";

import { hero } from "@/content/landing";

export function HeroSection() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Spotlight className="top-[-14rem] left-[-10rem] h-[36rem] w-[36rem] lg:left-[-4rem]" />

      <Container className="grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-28">
        <div>
          <Badge variant="primary">{hero.eyebrow}</Badge>

          <h1 className="mt-7 font-display text-display-md text-balance sm:text-display-lg xl:text-display-xl">
            {hero.headline.map((line, index) => (
              <span key={line} className="block">
                {index === hero.headline.length - 1 ? (
                  <span className="text-primary-subtle-foreground">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground-muted">
            {hero.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>
        </div>

        <figure className="relative">
          <Media
            src={hero.image.src}
            alt={hero.image.alt}
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="aspect-4/5 w-full rounded-2xl shadow-lg"
          />
          <figcaption className="mt-5 flex flex-col gap-0.5 border-l-2 border-accent pl-4">
            <span className="font-display font-semibold">{hero.caption.name}</span>
            <span className="text-sm text-foreground-muted">{hero.caption.role}</span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
