import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Folder,
  Megaphone,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container, IconChip } from "@mlfp/ui";

import { journey } from "@/content/landing";
import type { ChallengeFacet } from "@/content/landing";

const FACET_ICONS: Record<ChallengeFacet["icon"], LucideIcon> = {
  megaphone: Megaphone,
  folder: Folder,
  target: Target,
  users: Users,
};

/** Dark navy bar across the top of each card. */
function CardHeader({
  icon: Icon,
  title,
  meta,
}: {
  icon: LucideIcon;
  title: string;
  meta: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-[linear-gradient(100deg,var(--brand-ink)_0%,var(--hero-bg-raised)_100%)] px-7 py-6">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/12 text-white">
        <Icon className="size-5" />
      </span>
      <h3 className="text-lg font-bold tracking-wide text-white uppercase">
        {title}{" "}
        <span className="text-base font-normal text-white/70 normal-case">{meta}</span>
      </h3>
    </div>
  );
}

export function JourneySection() {
  return (
    <section
      id="journey"
      className="scroll-mt-24 bg-background py-20 font-poppins md:py-24"
    >
      <Container width="wide">
        {/* Heading beside the challenge lockup. */}
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.88fr] lg:gap-10">
          <div>
            <h2 className="max-w-3xl text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.14] font-bold tracking-tight text-balance text-foreground">
              {journey.heading}
            </h2>
            <p className="mt-7 max-w-lg leading-relaxed font-medium text-foreground-muted">
              {journey.body}
            </p>
          </div>

          <Image
            src={journey.badge.src}
            alt={journey.badge.alt}
            width={journey.badge.width}
            height={journey.badge.height}
            sizes="(min-width: 1024px) 34vw, 70vw"
            className="mx-auto h-auto w-full max-w-sm lg:mr-0 lg:ml-auto lg:max-w-lg"
          />
        </div>

        {/* Two cards */}
        <div className="mt-14 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          <div
            id="journey-modules"
            className="overflow-hidden scroll-mt-28 rounded-2xl border border-border bg-surface shadow-sm"
          >
            <CardHeader
              icon={BookOpen}
              title={journey.modules.title}
              meta={journey.modules.meta}
            />
            <ol className="flex flex-col gap-7 p-7 sm:p-8">
              {journey.modules.items.map((module, index) => (
                <li key={module.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-strong text-sm font-semibold text-white tabular-nums">
                    {index + 1}
                  </span>
                  <p className="leading-relaxed text-foreground-muted">
                    <span className="font-bold text-foreground">{module.title}:</span>{" "}
                    {module.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div
            id="journey-challenge"
            className="overflow-hidden scroll-mt-28 rounded-2xl border border-border bg-surface shadow-sm"
          >
            <CardHeader
              icon={Megaphone}
              title={journey.challenge.title}
              meta={journey.challenge.meta}
            />
            <ul className="flex flex-col gap-7 p-7 sm:p-8">
              {journey.challenge.items.map((facet) => {
                const Icon = FACET_ICONS[facet.icon];

                return (
                  <li key={facet.label} className="flex gap-4">
                    <IconChip size="sm" className="mt-0.5">
                      <Icon />
                    </IconChip>
                    <p className="leading-relaxed text-foreground-muted">
                      <span className="font-bold text-foreground uppercase">
                        {facet.label}:
                      </span>{" "}
                      {facet.description}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-border bg-surface px-7 py-6 sm:px-9">
          <div>
            <p className="font-bold text-foreground">{journey.bottomBar.headline}</p>
            <p className="mt-1.5 font-semibold text-primary-subtle-foreground">
              {journey.bottomBar.note}
            </p>
          </div>
          <Link
            href={journey.bottomBar.cta.href}
            className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary-strong px-7 font-medium text-primary-foreground transition-colors duration-200 ease-emphasis hover:bg-primary-hover"
          >
            {journey.bottomBar.cta.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
