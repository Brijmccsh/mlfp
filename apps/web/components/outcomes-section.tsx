import Image from "next/image";
import {
  Award,
  BarChart3,
  Briefcase,
  ClipboardCheck,
  Trophy,
  type LucideIcon,
} from "lucide-react";

import { Container, cn } from "@mlfp/ui";

import { outcomes } from "@/content/landing";
import type { OutcomeIcon } from "@/content/landing";

const OUTCOME_ICONS: Record<OutcomeIcon, LucideIcon> = {
  award: Award,
  briefcase: Briefcase,
  chart: BarChart3,
  clipboard: ClipboardCheck,
  trophy: Trophy,
};

/**
 * Fixed dark in both themes, like the hero — it uses the `--hero-*` palette
 * rather than the theme tokens, so the toggle never lightens it.
 */
export function OutcomesSection() {
  return (
    <section
      id="outcomes"
      className="scroll-mt-24 bg-hero-bg py-20 font-poppins md:py-24"
    >
      <Container width="wide">
        {/* Heading beside the framed certificate. */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h2 className="text-[clamp(2rem,3.4vw,3.25rem)] leading-[1.14] font-bold tracking-tight text-white">
              {outcomes.headingLines.map((line) => (
                <span key={line.plain} className="block">
                  {line.plain}{" "}
                  <span className="text-hero-blue-strong">{line.accent}</span>
                </span>
              ))}
            </h2>

            <span
              aria-hidden
              className="mt-6 block h-1 w-14 rounded-full bg-hero-blue-strong"
            />

            <p className="mt-8 max-w-md leading-relaxed font-semibold text-hero-muted">
              {outcomes.subhead.plain}{" "}
              <span className="text-hero-blue">{outcomes.subhead.accent}</span>
            </p>
          </div>

          {/* Dark mat + lift. Deliberately not rotated — a tilt reads as a
              crooked frame rather than a designed lift. */}
          <div className="rounded-xl bg-hero-card p-3 shadow-[0_30px_70px_-25px_rgb(0_0_0/0.85)] ring-1 ring-hero-border sm:p-4">
            <Image
              src={outcomes.certificate.src}
              alt={outcomes.certificate.alt}
              width={outcomes.certificate.width}
              height={outcomes.certificate.height}
              sizes="(min-width: 1024px) 44vw, 90vw"
              className="h-auto w-full rounded-md"
            />
          </div>
        </div>

        {/* Five across on desktop. */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {outcomes.items.map((item) => {
            const Icon = OUTCOME_ICONS[item.icon];

            return (
              <article
                key={item.titleTop}
                className={cn(
                  "flex flex-col rounded-2xl border border-hero-border bg-hero-card p-6",
                  "shadow-[0_0_40px_-24px_var(--hero-blue)]",
                  "transition-transform duration-200 ease-emphasis hover:-translate-y-1",
                )}
              >
                <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-hero-blue/60 text-white shadow-[0_0_20px_-4px_var(--hero-blue)]">
                  <Icon className="size-5" />
                </span>

                <h3 className="mt-7 text-center text-sm leading-snug font-bold tracking-wide uppercase">
                  <span className="block text-white">{item.titleTop}</span>
                  <span className="mt-1 block text-hero-blue">{item.titleBottom}</span>
                </h3>

                <span
                  aria-hidden
                  className="mx-auto mt-4 block h-0.5 w-8 rounded-full bg-hero-blue"
                />

                <p className="mt-5 text-sm leading-relaxed text-hero-muted">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* Divider with the tagline sitting on it. */}
        <div className="mt-16 flex items-center gap-6">
          <span aria-hidden className="h-px flex-1 bg-hero-border" />
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-eyebrow tracking-[0.18em] uppercase">
            {outcomes.tagline.map((phrase, index) => (
              <span key={phrase.text} className="flex items-center gap-3">
                {index > 0 ? (
                  <span aria-hidden className="text-hero-blue">
                    {outcomes.taglineSeparator}
                  </span>
                ) : null}
                <span className={phrase.accent ? "text-hero-blue" : "text-white"}>
                  {phrase.text}
                </span>
              </span>
            ))}
          </p>
          <span aria-hidden className="h-px flex-1 bg-hero-border" />
        </div>
      </Container>
    </section>
  );
}
