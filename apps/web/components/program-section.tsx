import {
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

/** The big outline numeral behind the top-right of each card. */
const ACCENT_NUMERAL: Record<PhaseAccent, string> = {
  accent: "text-accent/20",
  primary: "text-primary/20",
  violet: "text-accent-violet/20",
};

export function ProgramSection() {
  return (
    <section id="program" className="scroll-mt-20">
      {/* Photographic band. Scoped `dark` so tokens resolve to their dark
          values here only — the cards below sit outside it and stay light.
          That also gives the heading the lifted blue, which is the only blue
          that clears 3:1 against a photo this bright. */}
      <div className="dark relative isolate overflow-hidden pt-24 pb-44 md:pt-28 md:pb-52">
        {/* Cropped low so the crowd with raised hands carries the frame rather
            than the dark top of the dome, and lifted a little so it reads as
            energetic once the overlay thins out. */}
        <Media
          src={program.background.src}
          alt={program.background.alt}
          sizes="100vw"
          className="absolute inset-0 -z-20 h-full w-full"
          objectPosition="center 78%"
          imageClassName="saturate-150 brightness-110"
        />
        {/* Near-opaque only under the text column, then released hard so the
            right side of the photo stays vivid. The stops are tuned against a
            measured worst-case pixel, not by eye. */}
        <span
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(95deg,color-mix(in_oklab,var(--brand-ink)_93%,transparent)_0%,color-mix(in_oklab,var(--brand-ink)_88%,transparent)_40%,color-mix(in_oklab,var(--brand-ink)_42%,transparent)_60%,color-mix(in_oklab,var(--brand-ink)_12%,transparent)_78%,color-mix(in_oklab,var(--brand-ink)_2%,transparent)_100%)]"
        />

        <Container width="wide">
          <Eyebrow tone="inverse" underline>
            {program.eyebrow}
          </Eyebrow>
          {/* Text is held to a narrow column so the overlay only has to stay
              opaque over the left ~45%, letting the crowd read on the right. */}
          <h2 className="mt-5 max-w-md font-display text-display-sm text-white text-balance md:text-display-md">
            {program.headingLead}
            <span className="block text-primary">{program.headingHighlight}</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
            {program.body}
          </p>
        </Container>
      </div>

      {/* Cards lift up onto the band. */}
      <Container width="wide" className="-mt-32 pb-24 md:-mt-36 md:pb-32">
        <div className="grid gap-6 md:grid-cols-3">
          {program.phases.map((phase) => {
            const Icon = PHASE_ICONS[phase.icon];
            const DetailIcon = DETAIL_ICONS[phase.detailIcon];

            return (
              <article
                key={phase.title}
                className="relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-lg transition-transform duration-200 ease-emphasis hover:-translate-y-1"
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute top-4 right-6 font-display text-display-md leading-none font-semibold",
                    ACCENT_NUMERAL[phase.accent],
                  )}
                >
                  {phase.number}
                </span>

                <IconChip tone={phase.accent} size="lg">
                  <Icon />
                </IconChip>

                <p
                  className={cn(
                    "mt-6 text-eyebrow uppercase",
                    ACCENT_TEXT[phase.accent],
                  )}
                >
                  {phase.eyebrow}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold">{phase.title}</h3>
                <p className="mt-3 leading-relaxed text-foreground-muted">
                  {phase.description}
                </p>

                <div className="mt-auto flex items-center gap-2.5 border-t border-border pt-5 text-sm text-foreground-subtle">
                  <DetailIcon aria-hidden className="size-4 shrink-0" />
                  {phase.detail}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
