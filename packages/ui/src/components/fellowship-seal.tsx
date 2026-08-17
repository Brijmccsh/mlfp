import Image from "next/image";

import { cn } from "../lib/cn";

type FellowshipSealProps = {
  /**
   * The empty gold seal artwork. When supplied it is used as the backdrop and
   * the three lines are laid over its navy centre. When omitted the seal is
   * drawn instead, so the hero is never missing its badge.
   */
  src?: string;
  /** Small caps line above the headline word. */
  eyebrow: string;
  /** The large word at the centre of the seal. */
  title: string;
  /** Small caps line below. */
  footnote: string;
  className?: string;
};

/** Gold ring + ribbon, drawn so the badge stands alone without the artwork. */
function DrawnSeal() {
  return (
    <svg viewBox="0 0 200 240" aria-hidden className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="mlfp-seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0d493" />
          <stop offset="28%" stopColor="#b1802a" />
          <stop offset="52%" stopColor="#f7e6b4" />
          <stop offset="76%" stopColor="#a8761f" />
          <stop offset="100%" stopColor="#e3c179" />
        </linearGradient>
      </defs>
      {/* Ribbon tails, behind the ring. */}
      <path d="M62 150 L62 232 L100 208 L138 232 L138 150 Z" fill="url(#mlfp-seal-gold)" />
      <path d="M100 208 L138 232 L138 196 Z" fill="#8d6018" opacity="0.55" />
      {/* Ring. */}
      <circle cx="100" cy="96" r="88" fill="url(#mlfp-seal-gold)" />
      <circle cx="100" cy="96" r="76" fill="var(--hero-bg-raised)" />
      <circle
        cx="100"
        cy="96"
        r="80"
        fill="none"
        stroke="url(#mlfp-seal-gold)"
        strokeWidth="2"
        opacity="0.7"
      />
    </svg>
  );
}

export function FellowshipSeal({
  src,
  eyebrow,
  title,
  footnote,
  className,
}: FellowshipSealProps) {
  return (
    <span className={cn("relative inline-block aspect-[5/6] w-40", className)}>
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="10rem"
          className="object-contain"
          aria-hidden
        />
      ) : (
        <DrawnSeal />
      )}

      {/* Text sits on the seal's navy centre, which is the upper ~72%. */}
      <span className="absolute inset-x-0 top-0 flex h-[72%] flex-col items-center justify-center px-7 text-center">
        <span className="text-[0.5rem] leading-tight font-semibold tracking-[0.14em] text-hero-gold uppercase">
          {eyebrow}
        </span>
        <span className="mt-1 text-sm leading-none font-bold tracking-wide text-white uppercase">
          {title}
        </span>
        <span className="mt-1 text-[0.44rem] leading-tight font-medium tracking-[0.08em] text-white/80 uppercase">
          {footnote}
        </span>
      </span>
    </span>
  );
}

export type { FellowshipSealProps };
