import { ArrowCircle, Container, Media, cn } from "@mlfp/ui";

import { learnFrom } from "@/content/landing";
import type { LearnFromCard } from "@/content/landing";

/**
 * Cards link only when a URL exists, so a half-wired item never ships as a
 * dead link and the arrow never promises something that does not happen.
 */
function linkProps(href: string | null) {
  return href !== null
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

function SmallCard({ title, image, focal, href }: LearnFromCard) {
  const isLink = href !== null;
  const Wrapper = isLink ? "a" : "div";

  return (
    <Wrapper
      {...linkProps(href)}
      className={cn(
        "group flex gap-4 rounded-2xl bg-hero-bg p-4 font-poppins ring-1 ring-hero-blue/35",
        "transition-[transform,box-shadow] duration-200 ease-emphasis",
        isLink && "hover:-translate-y-1 hover:shadow-lg",
      )}
    >
      <Media
        src={image}
        alt={title}
        sizes="(min-width: 768px) 12vw, 30vw"
        objectPosition={focal}
        className="aspect-square w-28 shrink-0 rounded-xl"
        imageClassName={cn(
          "transition-transform duration-500 ease-emphasis",
          isLink && "group-hover:scale-[1.06]",
        )}
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
        <p className="leading-snug font-semibold text-balance text-white">{title}</p>
        {/* Shown on every card so the three read as a set. Decorative and
            aria-hidden, and a card without a URL is a <div>, so nothing is
            announced or focusable as a link. */}
        <ArrowCircle tone="outline" size="sm" className="self-end" />
      </div>
    </Wrapper>
  );
}

export function LearnFromSection() {
  const { featured } = learnFrom;
  const featuredIsLink = featured.href !== null;
  const FeaturedWrapper = featuredIsLink ? "a" : "div";

  return (
    <section className="bg-section-light py-20 font-poppins md:py-[5.25rem]">
      <Container width="wide">
        <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight font-bold tracking-tight text-hero-bg-raised">
          {learnFrom.heading}
        </h2>
        <span
          aria-hidden
          className="mt-4 block h-1 w-14 rounded-full bg-hero-blue-strong"
        />

        {/* Featured */}
        <FeaturedWrapper
          {...linkProps(featured.href)}
          className={cn(
            "group relative mt-10 block overflow-hidden rounded-[1.25rem]",
            "border-2 border-hero-blue shadow-[0_0_80px_-14px_var(--hero-blue)]",
            "transition-shadow duration-200 ease-emphasis",
            featuredIsLink && "hover:shadow-[0_0_95px_-8px_var(--hero-blue)]",
          )}
        >
          <Media
            src={featured.image}
            alt={featured.title}
            sizes="(min-width: 1024px) 88vw, 100vw"
            objectPosition={featured.focal}
            className="aspect-16/9 w-full"
            imageClassName={cn(
              "transition-transform duration-500 ease-emphasis",
              featuredIsLink && "group-hover:scale-[1.03]",
            )}
          />

          {/* Grounds the title against a bright stage photo. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,color-mix(in_oklab,var(--hero-bg)_92%,transparent),color-mix(in_oklab,var(--hero-bg)_55%,transparent)_45%,transparent)]"
          />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 sm:p-8">
            <p className="max-w-md text-[clamp(1.1rem,1.7vw,1.6rem)] leading-snug font-bold text-balance text-white">
              {featured.title}
            </p>
            {featuredIsLink ? <ArrowCircle /> : null}
          </div>
        </FeaturedWrapper>

        {/* Three across */}
        <div className="mt-[1.375rem] grid gap-[1.375rem] md:grid-cols-3">
          {learnFrom.cards.map((card) => (
            <SmallCard key={card.title} {...card} />
          ))}
        </div>

        {/* Quote + bio. The gradient runs to the bottom-right so the reading
            column on the right sits on the darker end. */}
        <div className="mt-[1.375rem] overflow-hidden rounded-3xl bg-[linear-gradient(135deg,var(--quote-from)_0%,var(--quote-to)_100%)] shadow-[0_0_80px_-18px_var(--quote-from)] ring-2 ring-hero-blue/70">
          <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14 lg:p-14">
            <blockquote className="text-[clamp(1.6rem,2.6vw,2.65rem)] leading-[1.22] font-bold text-white">
              <p>
                <span aria-hidden className="text-hero-blue">
                  &ldquo;
                </span>
                {learnFrom.quoteCard.quote}
                <span aria-hidden className="text-hero-blue">
                  &rdquo;
                </span>
              </p>
            </blockquote>

            <div>
              <p className="text-[clamp(1.6rem,2.2vw,2.25rem)] leading-tight font-bold text-white">
                {learnFrom.quoteCard.name}
              </p>
              <p className="mt-2 text-quote-role">{learnFrom.quoteCard.role}</p>

              <div className="mt-6 flex flex-col gap-4">
                {learnFrom.quoteCard.body.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-quote-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
