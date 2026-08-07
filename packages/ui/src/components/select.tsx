import type { ComponentProps } from "react";

import { ChevronDown } from "lucide-react";

import { cn } from "../lib/cn";

/**
 * A styled native <select>. Native keeps the mobile picker and keyboard
 * behaviour correct for free; the arrow is ours because appearance is reset.
 */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-10 w-full appearance-none rounded-md border border-border bg-surface px-3 pr-9 text-sm text-foreground transition-colors",
          "hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-foreground-subtle"
      />
    </div>
  );
}
