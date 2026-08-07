import { cn } from "@mlfp/ui";

type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  body?: string;
  align?: "start" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "start",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <p className="text-eyebrow text-primary-subtle-foreground uppercase">{eyebrow}</p>
      <h2 className="mt-4 max-w-2xl font-display text-display-sm text-balance md:text-display-md">
        {heading}
      </h2>
      {body ? (
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">{body}</p>
      ) : null}
    </div>
  );
}
