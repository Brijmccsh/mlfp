import type { ComponentProps } from "react";

import { Root as LabelRoot } from "@radix-ui/react-label";

import { cn } from "../lib/cn";

export function Label({ className, ...props }: ComponentProps<typeof LabelRoot>) {
  return (
    <LabelRoot
      className={cn(
        "text-sm leading-none font-medium text-foreground select-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
