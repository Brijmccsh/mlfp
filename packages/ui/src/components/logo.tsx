import Image from "next/image";

import { cn } from "../lib/cn";

type LogoProps = {
  src: string;
  alt: string;
  /** Intrinsic dimensions of the artwork, so Next can reserve the right box. */
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/**
 * The brand lockup. Height is set by the caller; width follows the artwork.
 *
 * The supplied PNG draws "LEADERS" in brand ink, which disappears against a
 * dark surface, so dark mode renders the lockup as a solid white knockout.
 * Replace this with a real dark-variant asset when one exists.
 */
export function Logo({ src, alt, width, height, className, priority }: LogoProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn("h-8 w-auto dark:brightness-0 dark:invert", className)}
    />
  );
}

export type { LogoProps };
