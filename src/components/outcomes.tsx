import type { ReactNode } from "react";
import { PAGE_X } from "./ui";

const stroke = {
  fill: "none",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  stroke: "#ffffff",
  style: {
    filter:
      "drop-shadow(0 0 6px rgba(180,215,255,0.9)) drop-shadow(0 0 16px rgba(61,123,255,0.5))",
  },
};

const CARDS: { title: ReactNode; body: string; icon: ReactNode }[] = [
  {
    title: (
      <>
        Industry-Recognized
        <br />
        <span style={{ color: "#2f80ff" }}>Fellowship</span>
      </>
    ),
    body: "Finish as a Marketing Leaders Fellow — a credential that reads clearly on a resume, a LinkedIn profile and a college application.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <circle cx="12" cy="9.6" r="5.6" />
        <path
          d="M12 6.9l.85 1.72 1.9.28-1.37 1.34.32 1.89L12 11.23l-1.7.9.32-1.89-1.37-1.34 1.9-.28z"
          fill="#ffffff"
          stroke="none"
        />
        <path d="M8.9 14.6L7.2 20.5l4.8-2.3 4.8 2.3-1.7-5.9" />
      </svg>
    ),
  },
  {
    title: (
      <>
        Portfolio-Ready
        <br />
        <span style={{ color: "#2f80ff" }}>Work</span>
      </>
    ),
    body: "You leave holding a real $25M campaign strategy and pitch deck for a live client — polished enough to show and talk through.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <rect x="3" y="7.6" width="18" height="11.4" rx="1.8" />
        <path d="M9 7.6V6a1.6 1.6 0 0 1 1.6-1.6h2.8A1.6 1.6 0 0 1 15 6v1.6" />
        <path d="M3 12.4h18" />
        <path d="M10.6 12.4h2.8" />
      </svg>
    ),
  },
  {
    title: (
      <>
        Real Industry
        <br />
        <span style={{ color: "#2f80ff" }}>Skills</span>
      </>
    ),
    body: "Strategy, branding, digital, social, analytics, content and presenting — the same skills working marketers use every week.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <path d="M4 19.5h16" />
        <rect x="5.4" y="13" width="2.9" height="5" fill="#ffffff" stroke="none" />
        <rect x="10.6" y="10" width="2.9" height="8" fill="#ffffff" stroke="none" />
        <rect x="15.8" y="6.4" width="2.9" height="11.6" fill="#ffffff" stroke="none" />
        <path d="M5.6 9.4L11 5.6l3.1 2.1L19 3.6" />
        <path d="M15.4 3.4H19v3.5" />
      </svg>
    ),
  },
  {
    title: (
      <>
        Resume + College
        <br />
        <span style={{ color: "#2f80ff" }}>App Upgrade</span>
      </>
    ),
    body: "A selective, project-based fellowship that demonstrates initiative, leadership, collaboration and applied learning.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <path d="M6 3.2h7.6L18 7.6v8.2" />
        <path d="M6 3.2v17.6h12V15.8" />
        <path d="M13.4 3.4v4.3H18" />
        <path d="M8.8 9.4h4.4M8.8 12.6h3" />
        <circle cx="16.4" cy="16.6" r="3.9" fill="none" />
        <path d="M14.7 16.6l1.3 1.3 2.2-2.4" />
      </svg>
    ),
  },
  {
    title: (
      <>
        Recognition That
        <br />
        <span style={{ color: "#2f80ff" }}>Sets You Apart</span>
      </>
    ),
    body: "Channel awards across all four disciplines, plus a personal letter of recommendation from Chad Tons for the winning team.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" {...stroke}>
        <path d="M7.6 3.8h8.8v5.1a4.4 4.4 0 0 1-8.8 0z" />
        <path d="M7.6 5.1H4.5c0 2.4 1.4 4.1 3.4 4.6M16.4 5.1h3.1c0 2.4-1.4 4.1-3.4 4.6" />
        <path d="M12 13.4v3.4M8.6 19.9h6.8" />
        <path
          d="M12 5.5l.72 1.46 1.61.24-1.16 1.14.27 1.6L12 9.15l-1.44.79.27-1.6-1.16-1.14 1.61-.24z"
          fill="#ffffff"
          stroke="none"
        />
      </svg>
    ),
  },
];

export function Outcomes() {
  return (
    <section
      id="outcomes"
      data-bg="dark"
      data-m="pad"
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, #030b22 0%, #061737 48%, #030b22 100%)",
        color: "#ffffff",
        padding: `92px ${PAGE_X}`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -200,
          right: "4%",
          width: 780,
          height: 660,
          background:
            "radial-gradient(circle at 50% 50%, rgba(47,108,255,0.2) 0%, rgba(3,11,34,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        data-m="uplevel-top"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.04fr 0.96fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <h2
            data-m="uplevel-h2"
            style={{
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1.05,
              letterSpacing: "-0.035em",
              margin: "18px 0 0",
              color: "#ffffff",
              textWrap: "pretty",
            }}
          >
            Uplevel your <span style={{ color: "#4b87f5" }}>resume</span> &amp;
            college or <span style={{ color: "#4b87f5" }}>job application.</span>
          </h2>
          <div
            style={{
              width: 64,
              height: 3,
              background: "#2f6bff",
              margin: "28px 0 20px",
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.78)",
              padding: "20px 0",
              fontWeight: 700,
            }}
          >
            Real skills. Real work. Real recognition that{" "}
            <span style={{ color: "#2f80ff" }}>opens doors.</span>
          </p>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: "6%",
              right: "6%",
              top: "10%",
              bottom: "10%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(61,123,255,0.34) 0%, rgba(3,11,34,0) 72%)",
              filter: "blur(28px)",
              pointerEvents: "none",
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/mlfp-certificate.png"
            alt="MLFP certificate — Marketing Leaders Fellow"
            style={{
              position: "relative",
              zIndex: 1,
              display: "block",
              width: "100%",
              height: "auto",
              borderRadius: 6,
              boxShadow: "0 34px 74px rgba(2,7,22,0.66)",
            }}
          />
        </div>
      </div>

      <div
        data-m="outcome-cards"
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
          marginTop: 56,
        }}
      >
        {CARDS.map((c, i) => (
          <div
            key={i}
            style={{
              border: "1px solid rgba(122,166,255,0.22)",
              borderRadius: 14,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)",
              padding: "28px 22px 26px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span
              style={{
                width: 54,
                height: 54,
                flex: "none",
                borderRadius: 999,
                border: "1.5px solid rgba(160,200,255,0.95)",
                background:
                  "radial-gradient(circle at 50% 28%, rgba(120,175,255,0.3) 0%, rgba(10,107,255,0.12) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 16px rgba(120,175,255,0.6), 0 0 44px rgba(10,107,255,0.4), inset 0 0 16px rgba(150,196,255,0.22)",
              }}
            >
              {c.icon}
            </span>
            <div
              style={{
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: 1.45,
                textAlign: "center",
                marginTop: 20,
                minHeight: 78,
                color: "#ffffff",
              }}
            >
              {c.title}
            </div>
            <span
              style={{
                width: 30,
                height: 2,
                background: "#2f6bff",
                margin: "13px 0 16px",
              }}
            />
            <p
              style={{
                margin: 0,
                alignSelf: "stretch",
                fontSize: 16,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.64)",
              }}
            >
              {c.body}
            </p>
          </div>
        ))}
      </div>

      <div
        data-m="uplevel-strip"
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: 22,
          marginTop: 46,
        }}
      >
        <span
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(122,166,255,0) 0%, rgba(122,166,255,0.4) 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ color: "#ffffff" }}>Do the work.</span>
          <span style={{ color: "#2f6bff" }}>•</span>
          <span style={{ color: "#2f80ff" }}>Get recognized.</span>
          <span style={{ color: "#2f6bff" }}>•</span>
          <span style={{ color: "#ffffff" }}>Open more doors.</span>
        </div>
        <span
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(122,166,255,0.4) 0%, rgba(122,166,255,0) 100%)",
          }}
        />
      </div>
    </section>
  );
}
