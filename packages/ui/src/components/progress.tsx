import type { ComponentProps } from "react";

import { Indicator, Root } from "@radix-ui/react-progress";

import { cn } from "../lib/cn";

type ProgressProps = ComponentProps<typeof Root>;

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <Root
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-surface-muted",
        className,
      )}
      value={value}
      {...props}
    >
      <Indicator
        className="h-full w-full flex-1 rounded-full bg-primary transition-transform duration-200 ease-emphasis"
        style={{ transform: `translateX(-${100 - (value ?? 0)}%)` }}
      />
    </Root>
  );
}

export type { ProgressProps };
