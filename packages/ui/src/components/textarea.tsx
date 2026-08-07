import type { ComponentProps } from "react";

import { cn } from "../lib/cn";

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-28 w-full resize-y rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground transition-colors",
        "placeholder:text-foreground-subtle hover:border-border-strong",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
