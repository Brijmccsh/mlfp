import type { ComponentProps } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const containerVariants = cva("mx-auto w-full px-6 sm:px-8", {
  variants: {
    width: {
      /** Editorial measure — long-form prose. */
      prose: "max-w-3xl",
      /** Default page width. */
      default: "max-w-6xl",
      /** Full-bleed sections that still need a gutter. */
      wide: "max-w-7xl",
    },
  },
  defaultVariants: {
    width: "default",
  },
});

type ContainerProps = ComponentProps<"div"> & VariantProps<typeof containerVariants>;

export function Container({ className, width, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ width }), className)} {...props} />;
}

export type { ContainerProps };
