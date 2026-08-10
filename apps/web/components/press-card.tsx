import { ArrowUpRight, ImageIcon } from "lucide-react";

import { Media, cn } from "@mlfp/ui";

import type { PressItem } from "@/content/landing";

/**
 * A press appearance. Renders as a link only once a URL exists; until then it
 * is an inert card, so a half-wired item can never ship as a dead link.
 */
export function PressCard({ title, image, href }: PressItem) {
  const isLink = href !== null;
  const Wrapper = isLink ? "a" : "div";

  return (
    <Wrapper
      {...(isLink
        ? { href, target: "_blank", rel: "noopener noreferrer" }
        : { "aria-disabled": true })}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-colors",
        isLink && "hover:border-border-strong",
      )}
    >
      {image ? (
        <Media
          src={image}
          alt={title}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="aspect-16/10 w-full"
        />
      ) : (
        <div
          aria-hidden
          className="flex aspect-16/10 w-full items-center justify-center bg-surface-muted"
        >
          <ImageIcon className="size-6 text-foreground-subtle" />
        </div>
      )}

      <div className="flex flex-1 items-start justify-between gap-4 p-5">
        <span className="font-display leading-snug font-medium text-balance">{title}</span>
        {isLink ? (
          <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-foreground-subtle transition-colors group-hover:text-primary" />
        ) : null}
      </div>
    </Wrapper>
  );
}
