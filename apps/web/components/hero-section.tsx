import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container, FellowshipSeal, Media } from "@mlfp/ui";

import { hero } from "@/content/landing";
import type { FeatureIcon, HeroCredential } from "@/content/landing";

const FEATURE_ICONS: Record<FeatureIcon, LucideIcon> = {
  target: Target,
  lightbulb: Lightbulb,
  users: Users,
  trophy: Trophy,
};

const CREDENTIAL_ICONS: Record<HeroCredential["icon"], LucideIcon> = {
  shield: ShieldCheck,
  star: Star,
};

/**
 * The hero keeps its dark navy treatment in both themes, so it uses the fixed
 * `--hero-*` palette rather than the theme tokens. Nothing here reads
 * light/dark; the toggle governs every section below it.
 */
export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-hero-bg font-poppins pt-10 pb-16 lg:pt-14 lg:pb-24"
    >
      {/* Soft glow, brighter toward the card side. */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_78%_18%,var(--hero-bg-raised)_0%,transparent_62%)]"
      />
      <span
        aria-hidden
        className="absolute -top-40 -left-32 -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--hero-blue)_16%,transparent),transparent_70%)] blur-3xl"
      />

      <Container width="wide">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-[4.5rem]">
          {/* ── Left ─────────────────────────────────────────────── */}
          <div>
            <span className="inline-flex items-center rounded-full border border-hero-blue/45 bg-hero-blue/10 px-4 py-1.5 text-sm text-white/90">
              {hero.pill}
            </span>

            <h1 className="mt-8 font-poppins text-[clamp(2.1rem,3.4vw,3.4rem)] leading-[1.14] font-bold tracking-tight">
              <span className="block text-white">{hero.headline.lead}</span>
              <span className="block text-hero-blue">{hero.headline.highlight}</span>
            </h1>

            <span aria-hidden className="mt-5 block h-1 w-14 rounded-full bg-hero-blue" />

            <p className="mt-6 max-w-lg text-lg leading-relaxed font-medium text-white/65">
              {hero.body}
            </p>

            <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4">
              {hero.features.map((feature) => {
                const Icon = FEATURE_ICONS[feature.icon];

                return (
                  <li key={feature.title}>
                    <span className="flex size-11 items-center justify-center rounded-full border border-hero-gold/70 text-hero-gold shadow-[0_0_18px_-6px_var(--hero-gold)]">
                      <Icon className="size-5" />
                    </span>
                    <span className="mt-5 block font-semibold text-white">
                      {feature.title}
                    </span>
                    <span className="mt-3 block text-sm leading-relaxed text-white/55">
                      {feature.description}
                    </span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link
                href={hero.primaryCta.href}
                className="inline-flex h-13 items-center gap-2 rounded-lg bg-hero-blue-strong px-7 font-medium text-white transition-colors duration-200 ease-emphasis hover:bg-hero-blue"
              >
                {hero.primaryCta.label}
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex h-13 items-center rounded-lg border border-hero-blue/60 px-7 font-medium text-white transition-colors duration-200 ease-emphasis hover:bg-hero-blue/12"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>

          {/* ── Right: photo + featuring panel as one glowing card ── */}
          <div className="relative">
            <div className="overflow-hidden rounded-[1.4rem] border-2 border-hero-blue/70 bg-hero-bg-raised shadow-[0_0_60px_-12px_var(--hero-blue)]">
              <Media
                src={hero.image.src}
                alt={hero.image.alt}
                priority
                sizes="(min-width: 1024px) 44vw, 100vw"
                className="aspect-[4/3] w-full"
              />

              <div className="p-8 lg:p-9">
                <p className="text-eyebrow tracking-[0.18em] text-hero-blue uppercase">
                  {hero.card.eyebrow}
                </p>
                <p className="mt-3 text-3xl leading-tight font-bold text-white">
                  {hero.card.name}
                </p>
                <p className="mt-2 text-hero-blue">{hero.card.role}</p>

                <span aria-hidden className="mt-6 block h-0.5 w-12 rounded-full bg-hero-blue" />

                <ul className="mt-6 flex flex-col gap-4">
                  {hero.card.credentials.map((credential) => {
                    const Icon = CREDENTIAL_ICONS[credential.icon];

                    return (
                      <li key={credential.label} className="flex items-center gap-3.5">
                        <Icon aria-hidden className="size-5 shrink-0 text-hero-gold" />
                        <span className="font-medium text-white">{credential.label}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Overlaps the card's top-right corner, per the mockup. */}
            <FellowshipSeal
              src={hero.seal.src ?? undefined}
              eyebrow={hero.seal.eyebrow}
              title={hero.seal.title}
              footnote={hero.seal.footnote}
              className="absolute -top-8 -right-6 w-32 lg:-top-10 lg:-right-10 lg:w-40"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
