import Image from "next/image";
import {
  BookOpen,
  Folder,
  Megaphone,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container, DottedGrid, Eyebrow, IconChip, NumberBadge } from "@mlfp/ui";

import { journey } from "@/content/landing";
import type { ChallengeFacet } from "@/content/landing";

const FACET_ICONS: Record<ChallengeFacet["icon"], LucideIcon> = {
  megaphone: Megaphone,
  folder: Folder,
  target: Target,
  users: Users,
};

/** Replaces the former standalone Modules and Challenge sections. */
export function JourneySection() {
  return (
    <section id="journey" className="scroll-mt-20 border-t border-border py-24 md:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          {/* The badge stacks above the heading on small screens. */}
          <div className="relative order-1 mx-auto w-full max-w-xs lg:order-2 lg:max-w-sm">
            <span
              aria-hidden
              className="absolute inset-x-[-12%] top-1/2 h-[70%] -translate-y-1/2 rounded-[50%] bg-primary-subtle"
            />
            <DottedGrid className="absolute -top-2 -right-2" columns={5} rows={4} />
            <DottedGrid className="absolute -bottom-2 -left-2" columns={5} rows={4} />
            <Image
              src={journey.badge.src}
              alt={journey.badge.alt}
              width={journey.badge.width}
              height={journey.badge.height}
              sizes="(min-width: 1024px) 24rem, 18rem"
              className="relative h-auto w-full"
            />
          </div>

          <div className="order-2 lg:order-1">
            <Eyebrow underline>{journey.eyebrow}</Eyebrow>
            <h2 className="mt-5 max-w-2xl font-display text-display-sm text-balance md:text-display-md">
              {journey.heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
              {journey.body}
            </p>
          </div>
        </div>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Modules — nav "Modules" deep-links here. */}
          <div
            id="journey-modules"
            className="h-full scroll-mt-24 rounded-2xl border border-border bg-surface p-7 shadow-sm sm:p-9"
          >
            <div className="flex items-center gap-4">
              <IconChip>
                <BookOpen />
              </IconChip>
              <h3 className="font-display text-lg font-semibold">
                {journey.modules.title}{" "}
                <span className="text-sm font-normal text-foreground-muted">
                  {journey.modules.meta}
                </span>
              </h3>
            </div>

            <ol className="mt-8 flex flex-col gap-7">
              {journey.modules.items.map((module, index) => (
                <li key={module.title} className="flex gap-4">
                  <NumberBadge>{index + 1}</NumberBadge>
                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-display font-semibold">{module.title}</h4>
                    <p className="leading-relaxed text-foreground-muted">
                      {module.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* CEO Challenge — nav "The Challenge" deep-links here. */}
          <div
            id="journey-challenge"
            className="h-full scroll-mt-24 rounded-2xl border border-border bg-surface p-7 shadow-sm sm:p-9"
          >
            <div className="flex items-center gap-4">
              <IconChip>
                <Megaphone />
              </IconChip>
              <h3 className="font-display text-lg font-semibold">
                {journey.challenge.title}{" "}
                <span className="text-sm font-normal text-foreground-muted">
                  {journey.challenge.meta}
                </span>
              </h3>
            </div>

            <ul className="mt-8 flex flex-col gap-7">
              {journey.challenge.items.map((facet) => {
                const Icon = FACET_ICONS[facet.icon];

                return (
                  <li key={facet.label} className="flex gap-4">
                    <IconChip size="sm">
                      <Icon />
                    </IconChip>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-eyebrow text-primary-subtle-foreground uppercase">
                        {facet.label}
                      </h4>
                      <p className="leading-relaxed text-foreground-muted">
                        {facet.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
