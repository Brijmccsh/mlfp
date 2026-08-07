import Image from "next/image";

import { cn } from "../lib/cn";

type MediaProps = {
  src: string;
  alt: string;
  /** Responsive hint for the image loader. */
  sizes?: string;
  priority?: boolean;
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
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}

export type { MediaProps };
