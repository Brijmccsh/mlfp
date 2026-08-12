import { cn } from "../lib/cn";

type DottedGridProps = {
  /** Dots per row / column. */
  columns?: number;
  rows?: number;
  className?: string;
};

/**
 * Decorative grid of small brand-blue dots. Purely ornamental, so it is hidden
 * from assistive technology.
 */
export function DottedGrid({ columns = 6, rows = 4, className }: DottedGridProps) {
  return (
    <span
      aria-hidden
      className={cn("pointer-events-none grid w-fit gap-1.5", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: columns * rows }, (_, index) => (
        <span key={index} className="size-1 rounded-full bg-primary/35" />
      ))}
    </span>
  );
}

export type { DottedGridProps };
