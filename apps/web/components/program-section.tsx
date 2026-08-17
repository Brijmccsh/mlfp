import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Star,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container, Eyebrow, IconChip, Media, cn } from "@mlfp/ui";

import { program } from "@/content/landing";
import type { PhaseAccent, ProgramPhase } from "@/content/landing";

const PHASE_ICONS: Record<ProgramPhase["icon"], LucideIcon> = {
  "book-open": BookOpen,
  users: Users,
  trophy: Trophy,
};

const DETAIL_ICONS: Record<ProgramPhase["detailIcon"], LucideIcon> = {
  calendar: Calendar,
  users: Users,
  star: Star,
};

const ACCENT_TEXT: Record<PhaseAccent, string> = {
  accent: "text-accent-subtle-foreground",
  primary: "text-primary-subtle-foreground",
  violet: "text-accent-violet-subtle-foreground",
};

/** The large faded numeral in each card's top-right corner. */
const ACCENT_NUMERAL: Record<PhaseAccent, string> = {
  accent: "text-accent/35",
  primary: "text-primary/35",
  violet: "text-accent-violet/35",
};

/**
 * Fixed dark in both themes, like the hero. The crowd photo covers the whole
 * section and a vertical gradient carries it down into the navy, so the cards
 * straddle the image rather than sitting beneath a short strip.
 */
export function ProgramSection() {
  return (
    <section
      id="program"
      className="relative isolate scroll-mt-24 overflow-hidden bg-hero-bg font-poppins"
    >
      <Media
        src={program.background.src}
        alt={program.background.alt}
        sizes="100vw"
        className="absolute inset-0 -z-20 h-full w-full"
        objectPosition="center 62%"
        imageClassName="saturate-150 brightness-110"
      />
      {/* Two overlays, because one cannot do both jobs: the heading shares its
          rows with the photo's brightest area. The horizontal pass darkens only
          the text column; the vertical pass carries the band down into navy so
          the cards land on a solid surface. Measured, not eyeballed. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--hero-bg)_92%,transparent)_0%,color-mix(in_oklab,var(--hero-bg)_88%,transparent)_45%,color-mix(in_oklab,var(--hero-bg)_35%,transparent)_62%,color-mix(in_oklab,var(--hero-bg)_8%,transparent)_80%,transparent_100%)]"
      />
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_0%,color-mix(in_oklab,var(--hero-bg)_10%,transparent)_45%,color-mix(in_oklab,var(--hero-bg)_55%,transparent)_62%,color-mix(in_oklab,var(--hero-bg)_95%,transparent)_78%,var(--hero-bg)_100%)]"
      />

      {/* Heading sits on the bright part of the band. */}
      <Container width="wide" className="pt-20 pb-[clamp(7rem,16vw,13rem)] md:pt-24">
        <Eyebrow tone="inverse" underline>
          {program.eyebrow}
        </Eyebrow>
        <h2 className="mt-5 max-w-lg text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.12] font-bold tracking-tight text-white">
          {program.headingLead}
          <span className="block text-hero-blue">{program.headingHighlight}</span>
        </h2>
        <p className="mt-6 max-w-lg leading-relaxed font-medium text-white/85">
          {program.body}
        </p>
      </Container>

      {/* Pulled up so the cards overlap the bottom of the image. */}
      <Container width="wide" className="-mt-[clamp(5rem,11vw,9rem)] pb-20 md:pb-24">
        {/* `light` forces the light palette inside this permanently dark
            section, so the cards keep their verified light-mode contrast. */}
        <div className="light grid gap-6 md:grid-cols-3">
          {program.phases.map((phase) => {
            const Icon = PHASE_ICONS[phase.icon];
            const DetailIcon = DETAIL_ICONS[phase.detailIcon];

            return (
              <article
                key={phase.title}
                className="relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface p-7 shadow-lg transition-transform duration-200 ease-emphasis hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <IconChip tone={phase.accent} size="sm" className="rounded-full">
                      <Icon />
                    </IconChip>
                    <span
                      className={cn(
                        "text-eyebrow tracking-[0.16em] uppercase",
                        ACCENT_TEXT[phase.accent],
                      )}
                    >
                      {phase.eyebrow}
                    </span>
                  </div>
                  <span
                    aria-hidden
                    className={cn(
                      "-mt-1 text-[2rem] leading-none font-bold tabular-nums",
                      ACCENT_NUMERAL[phase.accent],
                    )}
                  >
                    {phase.number}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-bold text-foreground">{phase.title}</h3>
                <p className="mt-3 leading-relaxed font-medium text-foreground-muted">
                  {phase.description}
                </p>

                <div className="mt-auto flex items-center gap-3 border-t border-border pt-5 text-sm font-medium text-foreground-muted">
                  <DetailIcon
                    aria-hidden
                    className={cn("size-4 shrink-0", ACCENT_TEXT[phase.accent])}
                  />
                  {phase.detail}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <p className="text-white/70">{program.cta.note}</p>
          <Link
            href={program.cta.href}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-hero-blue-strong px-7 font-medium text-white transition-colors duration-200 ease-emphasis hover:bg-hero-blue"
          >
            {program.cta.label}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
