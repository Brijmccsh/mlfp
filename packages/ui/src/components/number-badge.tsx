import type { ComponentProps } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const numberBadgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold tabular-nums",
  {
    variants: {
      tone: {
        /** Filled brand ink with a white numeral. */
        solid: "bg-brand-ink text-white dark:bg-primary dark:text-primary-foreground",
        subtle: "bg-primary-subtle text-primary-subtle-foreground",
      },
      size: {
        sm: "size-7 text-xs",
        md: "size-9 text-sm",
      },
    },
    defaultVariants: {
      tone: "solid",
      size: "md",
    },
  },
);

type NumberBadgeProps = ComponentProps<"span"> & VariantProps<typeof numberBadgeVariants>;

export function NumberBadge({ className, tone, size, ...props }: NumberBadgeProps) {
  return <span className={cn(numberBadgeVariants({ tone, size }), className)} {...props} />;
}

export { numberBadgeVariants };
export type { NumberBadgeProps };
