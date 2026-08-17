import type { ReactNode } from "react";
import { ApplyButton, ArrowRight, GOLD_GLOW, PAGE_X } from "./ui";

const goldRing = {
  width: 48,
  height: 48,
  flex: "none" as const,
  borderRadius: 999,
  border: "1.5px solid rgba(250,219,138,0.95)",
  background:
    "radial-gradient(circle at 50% 28%, rgba(250,219,138,0.28) 0%, rgba(212,168,83,0.10) 100%)",
  boxShadow:
    "0 0 14px rgba(250,219,138,0.55), 0 0 38px rgba(227,173,51,0.34), inset 0 0 14px rgba(250,219,138,0.2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const FEATURES: { icon: ReactNode; title: string; body: string }[] = [
  {
    title: "Real Campaigns",
    body: "Work on live brand challenges.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="url(#mlGold)"
        style={{ filter: GOLD_GLOW }}
        strokeWidth="2.2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4" fill="url(#mlGold)" stroke="none" />
        <path d="M15 9l5-5" />
      </svg>
    ),
  },
  {
    title: "Expert Mentorship",
    body: "Learn from top industry leaders.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="url(#mlGold)"
        style={{ filter: GOLD_GLOW }}
      >
        <path d="M12 2.5A6.2 6.2 0 0 0 5.8 8.7c0 2.4 1.4 3.8 2.4 5 .5.6.8 1 .8 1.6h6c0-.6.3-1 .8-1.6 1-1.2 2.4-2.6 2.4-5A6.2 6.2 0 0 0 12 2.5z" />
        <path d="M9 17h6v1.6H9zM10 20h4v1.5h-4z" />
      </svg>
    ),
  },
  {
    title: "Collaborative Teams",
    body: "Solve big problems together.",
    icon: (
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="url(#mlGold)"
        style={{ filter: GOLD_GLOW }}
      >
        <circle cx="8.6" cy="8.4" r="3.4" />
        <circle cx="16.4" cy="9.4" r="2.6" />
        <path d="M2.6 19c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4z" />
        <path d="M15.4 14.1c2.8.2 4.6 2 4.6 4.9h-4.2c0-1.9-.5-3.5-1.4-4.7z" />
      </svg>
    ),
  },
  {
    title: "Recognition",
    body: "Earn a certificate of completion.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="url(#mlGold)"
        style={{ filter: GOLD_GLOW }}
      >
        <path d="M7.5 3.5h9v5.2a4.5 4.5 0 0 1-9 0z" />
        <path
          d="M7.5 4.9H4.4c0 2.4 1.4 4.2 3.4 4.7zM16.5 4.9h3.1c0 2.4-1.4 4.2-3.4 4.7z"
          opacity="0.75"
        />
        <path d="M11 13.6h2v4.9h-2zM8.6 19.4h6.8v1.9H8.6z" />
      </svg>
    ),
  },
];

export function Hero() {
  return (
    <div
      data-bg="dark"
      style={{
        background: "#030b22",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -280,
          left: "8%",
          width: 900,
          height: 760,
          background:
            "radial-gradient(circle at 50% 50%, rgba(47,108,255,0.28) 0%, rgba(47,108,255,0.10) 40%, rgba(3,11,34,0) 72%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 120,
          right: -160,
          width: 760,
          height: 700,
          background:
            "radial-gradient(circle at 50% 50%, rgba(47,108,255,0.16) 0%, rgba(3,11,34,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <section
        data-m="hero"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.08fr 0.92fr",
          gap: 72,
          alignItems: "start",
          padding: `116px ${PAGE_X} 64px`,
        }}
      >
        <div
          data-m="hero-left"
          style={{
            paddingTop: 150,
            position: "relative",
            alignSelf: "stretch",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: 749,
            minHeight: 708,
          }}
        >
          <div
            data-m="hero-pill"
            style={{
              display: "inline-block",
              alignSelf: "flex-start",
              padding: "7px 16px",
              borderRadius: 999,
              fontSize: 12.5,
              letterSpacing: "0.02em",
              color: "#ffffff",
              background: "rgba(58,132,255,0.34)",
              border: "1px solid rgba(148,192,255,0.68)",
              boxShadow:
                "0 6px 20px rgba(10,107,255,0.3), inset 0 1px 0 rgba(255,255,255,0.22)",
              maxWidth: "100%",
            }}
          >
            8-Week Experiential Fellowship
          </div>

          <h1
            data-m="headline"
            style={{
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: "20px 0 0",
              color: "#ffffff",
              maxWidth: "20ch",
              textWrap: "pretty",
              position: "relative",
              top: 20,
            }}
          >
            Your 8-Week Journey to{" "}
            <span style={{ color: "#2f80ff" }}>Marketing Leadership.</span>
          </h1>

          <div
            style={{
              width: 84,
              height: 3,
              borderRadius: 2,
              background: "#0a6bff",
              boxShadow: "0 0 18px rgba(10,107,255,0.55)",
              margin: "26px 0 22px",
            }}
          />

          <p
            data-m="body"
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.62)",
              maxWidth: "48ch",
              fontWeight: 700,
            }}
          >
            A step-by-step fellowship designed to take you from foundational
            insights to a real-world CEO challenge.
          </p>

          <div
            data-m="feature-strip"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 26,
              margin: "36px 0 40px",
            }}
          >
            {FEATURES.map((f) => (
              <div key={f.title} data-m="feature-item">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 14,
                  }}
                >
                  <span style={goldRing}>{f.icon}</span>
                  <span
                    data-m="feature-title"
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      color: "#ffffff",
                      minHeight: 42,
                    }}
                  >
                    {f.title}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,0.66)",
                    marginTop: 10,
                  }}
                >
                  {f.body}
                </div>
              </div>
            ))}
          </div>

          <div
            data-m="hero-cta"
            style={{
              display: "flex",
              gap: 14,
              marginTop: "auto",
              paddingBottom: 4,
            }}
          >
            <ApplyButton variant="glow" />
            <a
              href="#program"
              style={{
                fontWeight: 600,
                fontSize: 15,
                padding: "15px 26px",
                borderRadius: 10,
                color: "#ffffff",
                background: "rgba(10,107,255,0.06)",
                border: "1px solid #0a6bff",
                transition: "background 200ms ease, border-color 200ms ease",
              }}
            >
              Explore the Program
            </a>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div
            data-m="hero-badge"
            style={{
              position: "absolute",
              top: -18,
              right: -86,
              zIndex: 5,
              width: 228,
              transformOrigin: "top right",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/gold-ribbon.png"
              alt=""
              style={{
                display: "block",
                width: "100%",
                height: "auto",
                filter: "drop-shadow(0 14px 30px rgba(2,7,22,0.55))",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "32.5%",
                transform: "translate(-50%, -50%)",
                width: "58%",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#ffe9b8",
                  lineHeight: 1.55,
                }}
              >
                Industry
                <br />
                Recognized
              </div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: "0.03em",
                  textTransform: "uppercase",
                  color: "#ffffff",
                  margin: "4px 0 5px",
                  textShadow: "0 0 12px rgba(255,232,180,0.45)",
                }}
              >
                Fellowship
              </div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.11em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.5,
                }}
              >
                For high school &amp; college students
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              left: "0%",
              right: "4%",
              top: "8%",
              bottom: "4%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(43,131,255,0.72) 0%, rgba(10,107,255,0.38) 44%, rgba(10,107,255,0.14) 64%, rgba(3,11,34,0) 80%)",
              filter: "blur(42px)",
              zIndex: 0,
              pointerEvents: "none",
            }}
          />

          <div
            data-m="portrait-card"
            style={{
              position: "relative",
              zIndex: 1,
              margin: "30px 32px 0 0",
              borderRadius: 24,
              overflow: "hidden",
              border: "3px solid transparent",
              background:
                "linear-gradient(180deg, rgba(12,28,68,0.92) 0%, rgba(6,16,44,0.92) 100%) padding-box, linear-gradient(150deg, #eaf3ff 0%, #6aa6ff 22%, #086BFF 46%, #2f86ff 62%, #9cc6ff 80%, #ffffff 100%) border-box",
              boxShadow:
                "0 0 0 1px rgba(180,215,255,0.55), 0 0 16px rgba(120,175,255,0.85), 0 0 40px rgba(61,123,255,0.6), 0 0 100px rgba(10,107,255,0.42), 0 0 190px rgba(10,107,255,0.22), 0 30px 70px rgba(2,7,22,0.6)",
            }}
          >
            {/*
              MLFP-4: the source is 900x1348 with the subject occupying roughly
              30%-77% of the frame. A fixed pixel height meant the crop window
              changed with the card width — once the hero collapses to one
              column the box gets very wide, the vertical crop deepens, and
              object-position pushes it below his head. An aspect ratio keeps
              the crop identical at every width.
            */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/team/chad-tons-seated.jpg"
              data-m="portrait"
              alt="Chad Tons, guest instructor"
              style={{
                width: "100%",
                aspectRatio: "11 / 10",
                objectFit: "cover",
                objectPosition: "50% 57%",
                background: "#f2f0ec",
                display: "block",
              }}
            />
            <div style={{ padding: "26px 28px 30px" }}>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#4d97ff",
                }}
              >
                Featuring
              </div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 30,
                  letterSpacing: "-0.022em",
                  color: "#ffffff",
                  marginTop: 8,
                }}
              >
                Chad Tons
              </div>
              <div style={{ fontSize: 16, color: "#a9c8ff", marginTop: 6 }}>
                Founder &amp; CEO, Infinity Marketing Team
              </div>
              <div
                style={{
                  width: 56,
                  height: 2,
                  background: "#0a6bff",
                  margin: "20px 0 0",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  marginTop: 22,
                }}
              >
                <Accolade
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="url(#mlGold)"
                      style={{ filter: GOLD_GLOW }}
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
                      <path d="M8 6H5.5a3 3 0 0 0 3 3" />
                      <path d="M16 6h2.5a3 3 0 0 1-3 3" />
                      <path d="M10 20h4" />
                      <path d="M12 13v7" />
                    </svg>
                  }
                  label="USC Marshall Entrepreneur Hall of Fame"
                />
                <Accolade
                  icon={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="url(#mlGold)"
                      style={{ filter: GOLD_GLOW }}
                    >
                      <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1.1 5.8-5.3-2.9-5.3 2.9 1.1-5.8L3.5 9.7l5.9-.8z" />
                    </svg>
                  }
                  label="USA Today's Notable Entrepreneurs of 2026"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Accolade({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div
      data-m="rec-row"
      style={{
        display: "grid",
        gridTemplateColumns: "26px 1fr",
        gap: 14,
        alignItems: "center",
      }}
    >
      {icon}
      <div
        style={{
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: "-0.012em",
          lineHeight: 1.3,
          color: "#ffffff",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export { ArrowRight };
