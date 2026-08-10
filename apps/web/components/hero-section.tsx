import { ArrowRight, Lightbulb, Target, Trophy, Users, type LucideIcon } from "lucide-react";

import { Badge, Button, Container, Logo, Media, Spotlight } from "@mlfp/ui";

import { brand, hero } from "@/content/landing";
import type { FeatureIcon } from "@/content/landing";

const FEATURE_ICONS: Record<FeatureIcon, LucideIcon> = {
  target: Target,
  lightbulb: Lightbulb,
  users: Users,
  trophy: Trophy,
};

/**
 * The band is dark in both themes, so it carries its own `dark` class. Every
 * token inside resolves to its dark value and no child needs to know.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      className="dark relative isolate overflow-hidden bg-background bg-[linear-gradient(180deg,var(--brand-ink)_0%,var(--background)_65%)] text-foreground"
    >
      <Spotlight className="top-[-18rem] left-[-14rem] h-[44rem] w-[44rem]" />
      <Spotlight className="right-[-16rem] bottom-[-22rem] h-[38rem] w-[38rem]" />

      <Container className="py-14 lg:py-20">
        <Logo
          src={brand.logo.src}
          srcDark={brand.logo.srcDark}
          alt={brand.logo.alt}
          width={brand.logo.width}
          height={brand.logo.height}
          priority
          className="h-11 w-auto sm:h-14"
        />

        <div className="mt-14 grid items-start gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <Badge variant="primary">{hero.pill}</Badge>

            <h1 className="mt-7 max-w-3xl font-display text-display-sm text-balance sm:text-display-md xl:text-display-lg">
              {hero.headline.lead}{" "}
              <span className="text-brand-blue">{hero.headline.highlight}</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground-muted">
              {hero.body}
            </p>

            <ul className="mt-11 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {hero.features.map((feature) => {
                const Icon = FEATURE_ICONS[feature.icon];

                return (
                  <li key={feature.title} className="flex items-start gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-primary">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-display font-semibold">{feature.title}</span>
                      <span className="text-sm text-foreground-muted">
                        {feature.description}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 flex flex-wrap items-center gap-3">
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

          <figure className="overflow-hidden rounded-2xl border border-primary/30 bg-surface shadow-lg ring-1 ring-primary/10">
            <Media
              src={hero.image.src}
              alt={hero.image.alt}
              priority
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="aspect-4/5 w-full"
            />
            <figcaption className="flex flex-col gap-2 p-7">
              <span className="text-eyebrow text-primary uppercase">
                {hero.card.eyebrow}
              </span>
              <span className="font-display text-2xl leading-tight font-semibold">
                {hero.card.name}
              </span>
              <span className="text-primary">{hero.card.role}</span>
              <blockquote className="mt-3 text-foreground-muted">
                <p className="leading-relaxed">
                  <span aria-hidden className="font-display text-primary">
                    “
                  </span>
                  {hero.card.quote}
                  <span aria-hidden className="font-display text-primary">
                    ”
                  </span>
                </p>
              </blockquote>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
