import type { ComponentProps } from "react";

import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const arrowCircleVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-full transition-colors duration-200 ease-emphasis",
  {
    variants: {
      tone: {
        solid: "bg-hero-blue-strong text-white",
        outline: "border border-white/35 text-white/85",
      },
      size: {
        sm: "size-8 [&_svg]:size-4",
        md: "size-12 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      tone: "solid",
      size: "md",
    },
  },
);

type ArrowCircleProps = Omit<ComponentProps<"span">, "children"> &
  VariantProps<typeof arrowCircleVariants>;

/** Decorative circular arrow. The wrapping element carries the real link. */
export function ArrowCircle({ className, tone, size, ...props }: ArrowCircleProps) {
  return (
    <span
      aria-hidden
      className={cn(arrowCircleVariants({ tone, size }), className)}
      {...props}
    >
      <ArrowRight className="transition-transform duration-200 ease-emphasis group-hover:translate-x-0.5" />
    </span>
  );
}

export { arrowCircleVariants };
export type { ArrowCircleProps };
