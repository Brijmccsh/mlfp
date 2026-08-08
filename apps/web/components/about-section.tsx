import { Container, Media } from "@mlfp/ui";

import { about } from "@/content/landing";

export function AboutSection() {
  return (
    <section className="border-t border-border bg-surface-muted py-24 md:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Media
          src={about.image.src}
          alt={about.image.alt}
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="aspect-4/5 w-full rounded-2xl shadow-md lg:sticky lg:top-28 lg:self-start"
        />

        <div>
          <p className="text-eyebrow text-primary-subtle-foreground uppercase">
            {about.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-display-sm md:text-display-md">
            {about.heading}
          </h2>
          <p className="mt-3 text-lg text-foreground-muted">{about.role}</p>

          <div className="mt-8 flex flex-col gap-5">
            {about.body.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === 0
                    ? "text-xl leading-relaxed text-foreground"
                    : "text-lg leading-relaxed text-foreground-muted"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          <blockquote className="mt-10 border-l-2 border-accent pl-6">
            <p className="font-display text-2xl leading-snug text-balance sm:text-3xl">
              “{about.quote}”
            </p>
            <footer className="mt-4 text-sm text-foreground-muted">
              {about.heading} — {about.role}
            </footer>
          </blockquote>
        </div>
      </Container>
    </section>
  );
}
