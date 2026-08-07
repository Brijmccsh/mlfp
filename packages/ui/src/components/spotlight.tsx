import { cn } from "../lib/cn";

type SpotlightProps = {
  className?: string;
};

/**
 * The deck's signature vignette — a soft radial wash of brand blue that sits
 * behind a heading. Decorative only; the colour comes from the `--spotlight`
 * token so it re-tunes itself per theme.
 */
export function Spotlight({ className }: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 rounded-full blur-3xl",
        "bg-[radial-gradient(circle_at_center,var(--spotlight),transparent_70%)]",
        className,
      )}
    />
  );
}

export type { SpotlightProps };
