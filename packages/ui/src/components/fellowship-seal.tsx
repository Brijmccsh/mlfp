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
      <path d="M62 150 L62 232 L100 208 L138 232 L138 150 Z" fill="url(#mlfp-seal-gold)" />
      <path d="M100 208 L138 232 L138 196 Z" fill="#8d6018" opacity="0.55" />
      <circle cx="100" cy="96" r="88" fill="url(#mlfp-seal-gold)" />
      <circle cx="100" cy="96" r="76" fill="var(--hero-bg-raised)" />
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
    <span
      className={cn(
        // Matches the artwork's 1080x1612 so nothing letterboxes.
        "relative inline-block aspect-[1080/1612] w-40",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt=""
          fill
          sizes="14rem"
          // The glow reads as the seal catching light, not a box shadow.
          className="object-contain drop-shadow-[0_0_28px_rgb(212_175_86/0.55)]"
          aria-hidden
        />
      ) : (
        <DrawnSeal />
      )}

      {/* Measured from the artwork: the navy field spans 8.9%-58.6% vertically
          and 13%-87% horizontally. The text is centred inside that. */}
      <span className="absolute top-[8.9%] right-[13%] left-[13%] flex h-[49.7%] flex-col items-center justify-center px-[7%] text-center">
        <span className="text-[0.5rem] leading-tight font-semibold tracking-[0.14em] text-hero-gold uppercase sm:text-[0.58rem]">
          {eyebrow}
        </span>
        <span className="mt-1 text-sm leading-none font-bold tracking-wide text-white uppercase sm:text-base">
          {title}
        </span>
        <span className="mt-1.5 text-[0.44rem] leading-tight font-medium tracking-[0.08em] text-white/85 uppercase sm:text-[0.5rem]">
          {footnote}
        </span>
      </span>
    </span>
  );
}

export type { FellowshipSealProps };
