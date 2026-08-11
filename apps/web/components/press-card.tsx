import { ArrowUpRight, ImageIcon } from "lucide-react";

import { Media, cn } from "@mlfp/ui";

import type { PressItem } from "@/content/landing";

/**
 * A press appearance. Every card uses the same 3:2 frame so three sources of
 * different proportions read as one set; `focal` aims each crop.
 *
 * Renders as a link only once a URL exists — until then it is an inert tile,
 * so a half-wired item can never ship as a dead link, and the hover affordance
 * never promises something that does not happen.
 */
export function PressCard({ title, image, focal, href }: PressItem) {
  const isLink = href !== null;
  const Wrapper = isLink ? "a" : "div";

  return (
    <Wrapper
      {...(isLink ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface",
        "transition-[border-color,box-shadow] duration-200 ease-emphasis",
        isLink && "hover:border-border-strong hover:shadow-md",
      )}
    >
      {image ? (
        <Media
          src={image}
          alt={title}
          sizes="(min-width: 768px) 33vw, 100vw"
          objectPosition={focal}
          className="aspect-3/2 w-full"
          imageClassName={cn(
            "transition-transform duration-300 ease-emphasis",
            isLink && "group-hover:scale-[1.03]",
          )}
        />
      ) : (
        <div
          aria-hidden
          className="flex aspect-3/2 w-full items-center justify-center bg-surface-muted"
        >
          <ImageIcon className="size-6 text-foreground-subtle" />
        </div>
      )}

      <div className="flex flex-1 items-start justify-between gap-4 border-t border-border p-5">
        <span className="font-display leading-snug font-medium text-balance">{title}</span>
        {isLink ? (
          <ArrowUpRight className="mt-0.5 size-5 shrink-0 text-foreground-subtle transition-colors group-hover:text-primary" />
        ) : null}
      </div>
    </Wrapper>
  );
}
