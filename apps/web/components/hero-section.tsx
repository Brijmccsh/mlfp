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
 *
 * Framing follows the approved mockup: the lockup sits at the top of the left
 * column, top-aligned with the photo card, and the section is content-sized so
 * nothing floats in an empty middle.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      className="dark relative isolate overflow-hidden bg-background bg-[linear-gradient(180deg,var(--brand-ink)_0%,var(--background)_65%)] pt-8 pb-10 text-foreground lg:pt-9 lg:pb-12"
    >
      <Spotlight className="top-[-18rem] left-[-14rem] h-[44rem] w-[44rem]" />
      <Spotlight className="right-[-16rem] bottom-[-22rem] h-[38rem] w-[38rem]" />

      <Container width="wide">
        <div className="grid items-start gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-24">
          <div>
            <Logo
              src={brand.logo.src}
              srcDark={brand.logo.srcDark}
              alt={brand.logo.alt}
              width={brand.logo.width}
              height={brand.logo.height}
              className="h-[clamp(3rem,8.4vw,8rem)] w-auto"
            />

            <div className="mt-[clamp(1rem,2.4vh,1.75rem)]">
              <Badge variant="primary">{hero.pill}</Badge>
            </div>

            {/* Two blocks, never inline: the blue clause always starts its own
                line. "award‑winning" carries a non-breaking hyphen in the
                content, so it cannot split mid-word. */}
            <h1 className="mt-[clamp(0.75rem,1.6vh,1.25rem)] max-w-2xl font-display text-hero text-pretty">
              <span className="block">{hero.headline.lead}</span>
              <span className="block text-brand-blue">{hero.headline.highlight}</span>
            </h1>

            {/* Short rule between headline and subhead, per the mockup. */}
            <span
              aria-hidden
              className="mt-[clamp(1rem,2vh,1.5rem)] block h-px w-14 bg-primary/60"
            />

            <p className="mt-[clamp(0.75rem,1.6vh,1.25rem)] max-w-lg leading-relaxed text-foreground-muted">
              {hero.body}
            </p>

            {/* One row of four on large screens, split by hairlines. */}
            <ul className="mt-[clamp(1.25rem,2.6vh,2rem)] grid grid-cols-2 gap-x-5 gap-y-6 lg:grid-cols-4 lg:gap-x-0 lg:divide-x lg:divide-border">
              {hero.features.map((feature, index) => {
                const Icon = FEATURE_ICONS[feature.icon];

                return (
                  <li
                    key={feature.title}
                    className={index === 0 ? "lg:pr-4" : "lg:px-4 lg:last:pr-0"}
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-primary-subtle text-primary">
                      <Icon className="size-4" />
                    </span>
                    <span className="mt-2.5 block font-display text-sm font-semibold">
                      {feature.title}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-foreground-muted">
                      {feature.description}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-[clamp(1.5rem,3vh,2.25rem)] flex flex-wrap items-center gap-3">
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

          {/* Photo and instructor panel are one bordered unit, per the mockup. */}
          <figure className="overflow-hidden rounded-2xl border border-primary/30 bg-surface shadow-lg ring-1 ring-primary/10">
            <Media
              src={hero.image.src}
              alt={hero.image.alt}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              objectPosition="center 18%"
              className="aspect-square w-full"
            />
            <figcaption className="flex flex-col gap-1.5 p-6 lg:p-7">
              <span className="text-eyebrow text-primary uppercase">
                {hero.card.eyebrow}
              </span>
              <span className="font-display text-2xl leading-tight font-semibold">
                {hero.card.name}
              </span>
              <span className="text-sm text-primary">{hero.card.role}</span>
              <blockquote className="mt-2 leading-relaxed text-foreground-muted">
                <p>
                  <span aria-hidden className="mr-0.5 font-display text-primary">
                    “
                  </span>
                  {hero.card.quote}
                  <span aria-hidden className="ml-0.5 font-display text-primary">
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
