import { PAGE_X, Rule } from "./ui";

const cardShell = {
  display: "grid",
  gridTemplateColumns: "170px minmax(0, 1fr)",
  gap: 14,
  alignItems: "stretch",
  minWidth: 0,
  position: "relative" as const,
  zIndex: 2,
  background: "linear-gradient(155deg, #0d3a8f 0%, #0a2159 58%, #061737 100%)",
  border: "1px solid rgba(150,196,255,0.5)",
  borderRadius: 16,
  padding: 14,
  boxShadow:
    "0 0 0 1px rgba(150,196,255,0.18), 0 0 26px rgba(10,107,255,0.28), 0 16px 34px rgba(6,23,55,0.28)",
  transition: "box-shadow 200ms ease, transform 200ms ease",
};

const PRESS = [
  {
    href: "https://www.linkedin.com/posts/chadtons_always-a-highlight-to-end-my-year-imt-and-activity-7407860934221869056-pWOo",
    img: "/press/pico-international-conference.jpeg",
    alt: "Chad Tons at the PICO Group International Conference",
    pos: "50% 45%",
    title: "Tons Keynotes Pico Global Conference",
  },
  {
    href: "https://www.marshall.usc.edu/posts/chad-tons-caf-unveiled-in-fertitta-hall",
    img: "/press/chad-tons-family-cafe.jpeg",
    alt: "Chad Tons Family Café unveiling at Fertitta Hall",
    pos: "50% 50%",
    title: "Chad Tons Family Café unveiled at USC's Fertitta Hall",
  },
  {
    href: "https://www.marshall.usc.edu/posts/chad-tons-caf-unveiled-in-fertitta-hall",
    img: "/press/chad-tons-portrait.png",
    alt: "Chad Tons portrait",
    pos: "48% 32%",
    title: "USA Today's Notable Entrepreneurs of 2026",
  },
];

function SmallArrow() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9cc6ff"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        alignSelf: "flex-end",
        strokeWidth: "3px",
        filter: "drop-shadow(0 0 6px rgba(120,175,255,0.6))",
      }}
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="M12.5 6l6 6-6 6" />
    </svg>
  );
}

export function LearnFrom() {
  return (
    <section
      data-bg="light"
      data-m="pad"
      style={{ background: "#f3f5fb", padding: `30px ${PAGE_X} 96px` }}
    >
      <div style={{ margin: "18px 0 50px" }}>
        <h2
          style={{
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            margin: 0,
            color: "#0d1c4f",
          }}
        >
          Who You&rsquo;ll Learn From
        </h2>
        <Rule style={{ margin: "18px 0 0" }} />
      </div>

      <div
        data-m="press-row"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          columnGap: 18,
          rowGap: 26,
          marginTop: 20,
          marginBottom: 55,
        }}
      >
        <a
          href="https://www.marshall.usc.edu/posts/marshall-alumni-reconnect-at-leadership-summit"
          data-m="press-hero"
          style={{
            gridColumn: "1 / -1",
            display: "block",
            position: "relative",
            minWidth: 0,
            border: "3px solid transparent",
            background:
              "#ffffff padding-box, linear-gradient(150deg, #eaf3ff 0%, #6aa6ff 22%, #086BFF 46%, #2f86ff 62%, #9cc6ff 80%, #ffffff 100%) border-box",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow:
              "0 0 0 1px rgba(150,196,255,0.45), 0 0 30px rgba(61,123,255,0.3), 0 0 80px rgba(37,110,235,0.22), 0 0 160px rgba(20,95,225,0.16), 0 24px 70px rgba(26,102,232,0.16)",
            transition: "box-shadow 200ms ease, transform 200ms ease",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/press/usc-marshall-keynote-wide.png"
            alt="Chad Tons speaking at the USC Marshall Leadership Summit"
            style={{
              width: "100%",
              height: 495,
              objectFit: "cover",
              objectPosition: "50% 58%",
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "auto 0 0 0",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: 24,
              padding: "74px 30px 26px",
              background:
                "linear-gradient(180deg, rgba(6,12,38,0) 0%, rgba(6,12,38,0.82) 62%, rgba(6,12,38,0.94) 100%)",
            }}
          >
            <div
              data-m="keynote-title"
              style={{
                fontWeight: 700,
                fontSize: 40,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                maxWidth: "24ch",
              }}
            >
              Chad Tons Keynotes USC Marshall Leadership Summit
            </div>
            <span
              style={{
                flex: "none",
                width: 48,
                height: 48,
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.28)",
                background: "#0a6bff",
                boxShadow:
                  "0 0 34px rgba(61,123,255,0.5), inset 0 1px 0 rgba(255,255,255,0.45), 0 12px 26px rgba(23,72,214,0.35)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  strokeWidth: "3px",
                  filter: "drop-shadow(0 0 6px rgba(180,215,255,0.9))",
                }}
              >
                <path d="M5 12h13" />
                <path d="M12.5 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </a>

        {PRESS.map((p) => (
          <a key={p.title} href={p.href} data-m="press-card" style={cardShell}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.img}
              alt={p.alt}
              style={{
                width: 170,
                height: "100%",
                minHeight: 104,
                objectFit: "cover",
                objectPosition: p.pos,
                borderRadius: 10,
                display: "block",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "4px 4px 4px 0",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  lineHeight: 1.35,
                  color: "#ffffff",
                }}
              >
                {p.title}
              </div>
              <SmallArrow />
            </div>
          </a>
        ))}
      </div>

      <div
        data-m="bio-box"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "start",
          border: "2px solid #086BFF",
          borderRadius: 26,
          padding: "40px 44px",
          background:
            "linear-gradient(155deg, #0d3a8f 0%, #0a2159 58%, #061737 100%)",
          boxShadow:
            "0 0 0 1px rgba(150,196,255,0.35), 0 0 30px rgba(10,107,255,0.34), 0 0 90px rgba(10,107,255,0.18)",
          width: "100%",
          minHeight: 500,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "8px 24px 8px 0",
          }}
        >
          <p
            data-m="pull-quote"
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 55,
              lineHeight: 1.26,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              textWrap: "pretty",
            }}
          >
            <Quote />
            Great marketing doesn&rsquo;t just sell, it moves people, shifts
            culture, and drives real impact.
            <Quote />
          </p>
        </div>
        <div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 52,
              letterSpacing: "-0.032em",
              margin: "12px 0 4px",
              color: "#ffffff",
            }}
          >
            Chad Tons
          </h2>
          <div style={{ fontSize: 16, color: "#a9c8ff" }}>
            Founder &amp; CEO, Infinity Marketing Team
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              marginTop: 24,
              fontSize: 16,
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "66ch",
            }}
          >
            <p style={{ margin: 0 }}>
              Chad Tons has spent his career building integrated campaigns for
              brands operating at national scale — the kind of work where
              strategy, media, creative, and measurement have to move as one or
              not at all.
            </p>
            <p style={{ margin: 0 }}>
              He founded Infinity Marketing Team to do that work end to end, and
              built the fellowship because the gap between how marketing is
              taught and how it is practised kept showing up in the people he
              hired.
            </p>
            <p style={{ margin: 0 }}>
              He teaches every module himself, and sits in the room for every
              final pitch.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Quote() {
  return (
    <span
      style={{
        color: "#4d97ff",
        fontSize: "1.5em",
        lineHeight: 0,
        verticalAlign: "-0.16em",
      }}
    >
      &ldquo;
    </span>
  );
}
