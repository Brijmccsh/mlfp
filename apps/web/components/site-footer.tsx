import { Container, Logo } from "@mlfp/ui";

import { brand, footer } from "@/content/landing";

/**
 * Fixed dark in both themes, matching the hero and the CTA band. Uses the
 * `--hero-*` palette rather than the theme tokens so the toggle never
 * lightens it.
 */
export function SiteFooter() {
  return (
    <footer className="bg-hero-bg py-16 font-poppins">
      <Container width="wide">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            {/* Reversed lockup: the default one is brand ink and would vanish here. */}
            <Logo
              src={brand.logo.srcDark}
              alt={brand.logo.alt}
              width={brand.logo.width}
              height={brand.logo.height}
              className="h-9 w-auto"
            />
            <p className="mt-6 leading-relaxed text-hero-muted">{footer.tagline}</p>
          </div>

          <div className="flex gap-16 sm:gap-24">
            {footer.linkGroups.map((group, index) => (
              <nav key={index} aria-label={`Footer ${index + 1}`}>
                <ul className="flex flex-col gap-4">
                  {group.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-hero-muted transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}

                  {/* The email closes the second column. */}
                  {index === footer.linkGroups.length - 1 ? (
                    <li>
                      <a
                        href={`mailto:${footer.email}`}
                        className="text-hero-blue transition-colors hover:text-white"
                      >
                        {footer.email}
                      </a>
                    </li>
                  ) : null}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="mt-14 border-t border-hero-border pt-8 text-sm text-hero-muted">
          {footer.copyright}
        </p>
      </Container>
    </footer>
  );
}
