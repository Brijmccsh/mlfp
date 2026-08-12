import Image from "next/image";

import { cn } from "../lib/cn";

type LogoProps = {
  src: string;
  /**
   * Reversed artwork for dark surfaces. When supplied, the two files are
   * swapped by the `dark` variant, which keeps the brand blue intact.
   * Without it, dark mode falls back to a flat white knockout of `src`.
   */
  srcDark?: string;
  alt: string;
  /** Intrinsic dimensions of the artwork, so Next can reserve the right box. */
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export function Logo({
  src,
  srcDark,
  alt,
  width,
  height,
  className,
  priority,
}: LogoProps) {
  const base = cn("h-8 w-auto", className);

  if (!srcDark) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={cn(base, "dark:brightness-0 dark:invert")}
      />
    );
  }

  // Both variants are in the DOM and CSS picks one, so `priority` is dropped
  // here: preloading both would always waste one and the browser logs the
  // unused preload as a console warning. The lockup is small enough that
  // normal loading is imperceptible.
  const shared = { alt, width, height };

  return (
    <>
      <Image src={src} {...shared} className={cn(base, "dark:hidden")} />
      <Image src={srcDark} {...shared} className={cn(base, "hidden dark:block")} />
    </>
  );
}

export type { LogoProps };
