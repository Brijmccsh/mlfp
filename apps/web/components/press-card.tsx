import { ArrowUpRight, ImageIcon } from "lucide-react";

import { Media, cn } from "@mlfp/ui";

import type { PressItem } from "@/content/landing";

/**
 * A compact press appearance: image on the left, title on the right, arrow
 * bottom-right. All three sources share one square frame so cards of different
 * proportions line up; `focal` aims each crop.
 *
 * Renders as a link only once a URL exists — until then it is an inert tile,
 * so a half-wired item can never ship as a dead link and the hover affordance
 * never promises something that does not happen.
 */
export function PressCard({ title, image, focal, href }: PressItem) {
  const isLink = href !== null;
  const Wrapper = isLink ? "a" : "div";

  return (
    <Wrapper
      {...(isLink ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group flex items-stretch gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-sm",
        "transition-[transform,box-shadow,border-color] duration-200 ease-emphasis",
        isLink && "hover:-translate-y-1 hover:border-border-strong hover:shadow-md",
      )}
    >
      {image ? (
        <Media
          src={image}
          alt={title}
          sizes="(min-width: 768px) 15vw, 40vw"
          objectPosition={focal}
          className="aspect-square w-[40%] shrink-0 self-stretch rounded-xl"
          imageClassName={cn(
            "transition-transform duration-500 ease-emphasis",
            isLink && "group-hover:scale-[1.06]",
          )}
        />
      ) : (
        <div
          aria-hidden
          className="flex aspect-square w-[40%] shrink-0 items-center justify-center rounded-xl bg-surface-muted"
        >
          <ImageIcon className="size-5 text-foreground-subtle" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-between py-2 pr-2">
        <span className="font-display leading-snug font-semibold text-balance">{title}</span>
        {isLink ? (
          <span
            aria-hidden
            className={cn(
              "mt-3 flex size-8 shrink-0 items-center justify-center self-end rounded-full",
              "border border-border-strong text-foreground-muted",
              "transition-colors duration-200 ease-emphasis",
              "group-hover:border-primary-strong group-hover:bg-primary-strong group-hover:text-primary-foreground",
            )}
          >
            <ArrowUpRight className="size-4 transition-transform duration-200 ease-emphasis group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
