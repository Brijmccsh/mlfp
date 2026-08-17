"use client";

import { useState } from "react";

import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Container, Logo, ThemeToggle } from "@mlfp/ui";

import { brand, nav } from "@/content/landing";

/**
 * The bar carries the hero's navy in both themes so it reads as one piece with
 * the hero, and stays legible when it sticks over the light sections below.
 * It is scoped `dark` so the theme toggle inside it renders correctly.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="dark sticky top-0 z-50 bg-hero-bg/95 font-poppins backdrop-blur-md">
      <Container width="wide" className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="shrink-0" aria-label={brand.name}>
          <Logo
            src={brand.logo.src}
            srcDark={brand.logo.srcDark}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            className="h-[clamp(2.75rem,7vw,6.5rem)] w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="text-white/75 hover:text-white" />
          <Link
            href={nav.cta.href}
            className="hidden h-11 items-center rounded-full bg-hero-blue-strong px-6 font-medium text-white transition-colors duration-200 ease-emphasis hover:bg-hero-blue sm:inline-flex"
          >
            {nav.cta.label}
          </Link>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-white/80 transition-colors hover:text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-white/10 bg-hero-bg lg:hidden"
        >
          <Container width="wide" className="flex flex-col py-2">
            {nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3.5 text-base font-medium text-white/75 transition-colors last:border-0 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="my-3 inline-flex h-11 items-center justify-center rounded-full bg-hero-blue-strong px-6 font-medium text-white sm:hidden"
            >
              {nav.cta.label}
            </Link>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
