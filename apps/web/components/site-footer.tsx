import { Container, Logo } from "@mlfp/ui";

import { brand, footer } from "@/content/landing";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-muted py-16">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo {...brand.logo} className="h-8 w-auto" />
            <p className="mt-5 text-sm leading-relaxed text-foreground-muted">
              {footer.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Footer">
              <ul className="flex flex-col gap-3">
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-eyebrow text-foreground-subtle uppercase">Contact</p>
              <a
                href={`mailto:${footer.email}`}
                className="mt-3 inline-block text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {footer.email}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-border pt-8 text-sm text-foreground-subtle">
          {footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
