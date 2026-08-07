"use client";

import type { ComponentProps } from "react";

import { Content, Header, Item, Root, Trigger } from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "../lib/cn";

export function Accordion({ className, ...props }: ComponentProps<typeof Root>) {
  return <Root className={cn("divide-y divide-border border-y border-border", className)} {...props} />;
}

export function AccordionItem({ className, ...props }: ComponentProps<typeof Item>) {
  return <Item className={cn("group", className)} {...props} />;
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
          "flex flex-1 items-start justify-between gap-6 py-6 text-left",
          "font-display text-lg font-medium transition-colors hover:text-primary-subtle-foreground",
          className,
        )}
        {...props}
      >
        {children}
        <Plus
          aria-hidden
          className="mt-0.5 size-5 shrink-0 text-foreground-subtle transition-transform duration-200 ease-emphasis group-data-[state=open]:rotate-45"
        />
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
