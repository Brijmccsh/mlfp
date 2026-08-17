import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Container } from "@mlfp/ui";

import { apply, applyCta } from "@/content/landing";

/**
 * Fixed dark card on the light page. The step list is rendered straight from
 * `apply.steps`, so this preview and the real form cannot disagree.
 */
export function ApplyCtaSection() {
  return (
    <section className="bg-background py-20 font-poppins md:py-24">
      <Container width="wide">
        <div className="rounded-3xl bg-hero-bg p-8 shadow-[0_40px_90px_-40px_var(--hero-blue)] ring-1 ring-hero-border sm:p-12 lg:p-16">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            {/* Left */}
            <div>
              <h2 className="text-[clamp(2.5rem,5vw,4.25rem)] leading-none font-bold tracking-tight text-white">
                {applyCta.heading}
              </h2>

              <span
                aria-hidden
                className="mt-6 block h-1 w-14 rounded-full bg-hero-blue-strong"
              />

              <p className="mt-7 text-[clamp(1.35rem,2.2vw,1.9rem)] leading-tight font-bold text-white">
                {applyCta.subheading.plain}{" "}
                <span className="text-hero-blue">{applyCta.subheading.accent}</span>
              </p>

              <p className="mt-5 max-w-md leading-relaxed text-hero-muted">
                {applyCta.body}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Link
                  href={applyCta.cta.href}
                  className="inline-flex h-13 items-center gap-2 rounded-lg bg-hero-blue-strong px-7 font-medium text-white shadow-[0_0_30px_-6px_var(--hero-blue)] transition-colors duration-200 ease-emphasis hover:bg-hero-blue"
                >
                  {applyCta.cta.label}
                  <ArrowRight className="size-4" />
                </Link>
                <p className="text-sm text-hero-muted">{applyCta.note}</p>
              </div>
            </div>

            {/* Right — stays light inside the dark card. */}
            <div className="light rounded-2xl bg-surface p-7 shadow-lg sm:p-9">
              <p className="text-center text-eyebrow tracking-[0.16em] text-foreground uppercase">
                {applyCta.panel.title}
              </p>
              <span
                aria-hidden
                className="mx-auto mt-4 block h-0.5 w-12 rounded-full bg-primary-strong"
              />

              <ol className="mt-7 flex flex-col">
                {apply.steps.map((step, index) => (
                  <li
                    key={step.id}
                    className="flex items-center gap-4 border-b border-border py-4 first:pt-0 last:border-0 last:pb-0"
                  >
                    <span className="text-sm font-bold text-primary-subtle-foreground tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-semibold text-foreground">{step.label}</span>
                  </li>
                ))}
              </ol>

              <p className="mt-7 text-center text-sm text-foreground-muted">
                {applyCta.panel.footnote}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
