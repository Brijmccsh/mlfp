import type { ComponentProps } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const iconChipVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-xl [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        primary: "bg-primary-subtle text-primary-subtle-foreground",
        accent: "bg-accent-subtle text-accent-subtle-foreground",
        violet: "bg-accent-violet-subtle text-accent-violet-subtle-foreground",
        neutral: "bg-surface-muted text-foreground-muted",
      },
      size: {
        sm: "size-9 [&_svg]:size-4",
        md: "size-11 [&_svg]:size-5",
        lg: "size-14 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "md",
    },
  },
);

type IconChipProps = ComponentProps<"span"> & VariantProps<typeof iconChipVariants>;

/** A tinted, rounded container for a single lucide icon. */
export function IconChip({ className, tone, size, ...props }: IconChipProps) {
  return <span className={cn(iconChipVariants({ tone, size }), className)} {...props} />;
}

export { iconChipVariants };
export type { IconChipProps };
