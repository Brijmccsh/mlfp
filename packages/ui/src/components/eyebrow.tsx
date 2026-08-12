import type { ComponentProps } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const eyebrowVariants = cva("text-eyebrow uppercase", {
  variants: {
    tone: {
      primary: "text-primary-subtle-foreground",
      accent: "text-accent-subtle-foreground",
      violet: "text-accent-violet-subtle-foreground",
      /** For dark photographic bands, where the text sits on an overlay. */
      inverse: "text-white",
      muted: "text-foreground-subtle",
    },
  },
  defaultVariants: {
    tone: "primary",
  },
});

type EyebrowProps = ComponentProps<"p"> &
  VariantProps<typeof eyebrowVariants> & {
    /** Short gold rule beneath the label. */
    underline?: boolean;
  };

export function Eyebrow({ className, tone, underline, children, ...props }: EyebrowProps) {
  return (
    <p className={cn("flex flex-col gap-2", className)} {...props}>
      <span className={eyebrowVariants({ tone })}>{children}</span>
      {underline ? <span aria-hidden className="h-0.5 w-10 rounded-full bg-accent" /> : null}
    </p>
  );
}

export { eyebrowVariants };
export type { EyebrowProps };
