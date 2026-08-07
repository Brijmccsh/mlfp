"use client";

import { useState } from "react";

import { Menu, X } from "lucide-react";

import { Button, Container, Logo, ThemeToggle } from "@mlfp/ui";

import { brand, nav } from "@/content/landing";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-6">
        <a href="#top" className="shrink-0" aria-label={brand.name}>
          <Logo {...brand.logo} priority className="h-7 w-auto sm:h-8" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={nav.cta.href}>{nav.cta.label}</a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-border bg-background lg:hidden"
        >
          <Container className="flex flex-col py-2">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 text-base font-medium text-foreground-muted transition-colors last:border-0 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="my-3 sm:hidden">
              <a href={nav.cta.href} onClick={() => setOpen(false)}>
                {nav.cta.label}
              </a>
            </Button>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
