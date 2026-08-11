import Image from "next/image";

import { cn } from "../lib/cn";

type MediaProps = {
  src: string;
  alt: string;
  /** Responsive hint for the image loader. */
  sizes?: string;
  priority?: boolean;
  /**
   * CSS `object-position`, e.g. `"center 45%"`. Aims the crop when the source
   * and the frame disagree on aspect ratio. Defaults to centre.
   */
  objectPosition?: string;
  /** Owns the aspect ratio, radius and crop. */
  className?: string;
  imageClassName?: string;
};

/**
 * A cropped, framed image. The wrapper owns the shape and the image fills it,
 * so a differently-proportioned file can be dropped in without touching code.
 */
export function Media({
  src,
  alt,
  sizes = "100vw",
  priority,
  objectPosition,
  className,
  imageClassName,
}: MediaProps) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={objectPosition ? { objectPosition } : undefined}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}

export type { MediaProps };
