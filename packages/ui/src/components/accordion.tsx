"use client";

import type { ComponentProps } from "react";

import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn";

const rootVariants = cva("", {
  variants: {
    variant: {
      /** Hairline-separated rows sharing one border box. */
      flush: "divide-y divide-border border-y border-border",
      /** Each row is its own raised card, separated by space. */
      cards: "flex flex-col gap-4",
    },
  },
  defaultVariants: { variant: "flush" },
});

const itemVariants = cva("group", {
  variants: {
    variant: {
      flush: "",
      cards: "rounded-2xl border border-border bg-surface px-6 shadow-sm sm:px-7",
    },
  },
  defaultVariants: { variant: "flush" },
});

type AccordionProps = ComponentProps<typeof Root> & VariantProps<typeof rootVariants>;

export function Accordion({ className, variant, ...props }: AccordionProps) {
  return <Root className={cn(rootVariants({ variant }), className)} {...props} />;
}

type AccordionItemProps = ComponentProps<typeof Item> & VariantProps<typeof itemVariants>;

export function AccordionItem({ className, variant, ...props }: AccordionItemProps) {
  return <Item className={cn(itemVariants({ variant }), className)} {...props} />;
}

export function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentProps<typeof Trigger>) {
  return (
    <Header className="flex">
      <Trigger
        className={cn(
          "flex flex-1 items-center justify-between gap-6 py-6 text-left",
          "font-display text-lg font-medium transition-colors hover:text-primary-subtle-foreground",
          className,
        )}
        {...props}
      >
        {children}
        {/* Plus while collapsed, minus while open — swapped by Radix's
            data-state on the item, so no client state is needed here. */}
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-subtle text-primary-subtle-foreground transition-colors duration-200 ease-emphasis"
        >
          <Plus className="size-4 group-data-[state=open]:hidden" />
          <Minus className="hidden size-4 group-data-[state=open]:block" />
        </span>
      </Trigger>
    </Header>
  );
}

export function AccordionContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Content>) {
  return (
    <Content
      className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("max-w-2xl pb-6 text-foreground-muted", className)}>{children}</div>
    </Content>
  );
}
