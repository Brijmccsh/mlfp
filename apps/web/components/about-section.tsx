import { Container, Media } from "@mlfp/ui";

import { about } from "@/content/landing";

export function AboutSection() {
  return (
    <section className="bg-surface-muted pt-24 pb-16 md:pt-28 md:pb-20">
      <Container width="wide">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Media
            src={about.image.src}
            alt={about.image.alt}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-4/5 w-full rounded-2xl shadow-md lg:sticky lg:top-28 lg:self-start"
          />

          <div>
            <p className="text-eyebrow text-primary-subtle-foreground uppercase">
              {about.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-display-sm md:text-display-md">
              {about.heading}
            </h2>
            <p className="mt-3 text-lg text-primary-subtle-foreground">{about.role}</p>

            <div className="mt-8 flex flex-col gap-5">
              {about.body.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-foreground-muted">
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote className="mt-10 border-l-2 border-accent pl-6">
              <p className="font-display text-2xl leading-snug text-balance sm:text-3xl">
                “{about.quote}”
              </p>
              <footer className="mt-4 text-sm text-foreground-muted">
                {about.quoteAttribution.name} — {about.quoteAttribution.role}
              </footer>
            </blockquote>
          </div>
        </div>

      </Container>
    </section>
  );
}
