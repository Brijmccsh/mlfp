import type { ComponentProps } from "react";

import { Fallback, Image, Root } from "@radix-ui/react-avatar";

import { cn } from "../lib/cn";

export function Avatar({ className, ...props }: ComponentProps<typeof Root>) {
  return (
    <Root
      className={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full border border-border",
        className,
      )}
      {...props}
    />
  );
}

export function AvatarImage({ className, ...props }: ComponentProps<typeof Image>) {
  return <Image className={cn("aspect-square size-full object-cover", className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: ComponentProps<typeof Fallback>) {
  return (
    <Fallback
      className={cn(
        "flex size-full items-center justify-center bg-surface-muted text-xs font-medium text-foreground-muted",
        className,
      )}
      {...props}
    />
  );
}
