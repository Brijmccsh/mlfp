import { PAGE_X } from "./ui";

const linkStyle = { color: "rgba(255,255,255,0.68)" };

export function SiteFooter() {
  return (
    <footer
      data-bg="dark"
      data-m="pad"
      style={{
        background: "#030b22",
        color: "rgba(255,255,255,0.68)",
        padding: `48px ${PAGE_X}`,
        display: "flex",
        justifyContent: "space-between",
        gap: 48,
        flexWrap: "wrap",
      }}
    >
      <div style={{ maxWidth: "34ch" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/mlfp-logo-header.svg"
          alt="Marketing Leaders Fellowship Program"
          style={{ height: 69, width: 215 }}
        />
        <p style={{ margin: "16px 0 0", fontSize: 14.5, lineHeight: 1.65 }}>
          An eight-week experiential fellowship in marketing leadership.
        </p>
      </div>

      <div style={{ display: "flex", gap: 56 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 14.5,
          }}
        >
          <a href="#program" style={linkStyle}>
            Program
          </a>
          <a href="#modules" style={linkStyle}>
            Modules
          </a>
          <a href="#challenge" style={linkStyle}>
            The Challenge
          </a>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            fontSize: 14.5,
          }}
        >
          <a href="#outcomes" style={linkStyle}>
            Outcomes
          </a>
          <a href="#faq" style={linkStyle}>
            FAQ
          </a>
          <a href="mailto:admin@themlfp.com" style={linkStyle}>
            admin@themlfp.com
          </a>
        </div>
      </div>

      <div
        style={{
          fontSize: 12.5,
          color: "rgba(255,255,255,0.4)",
          alignSelf: "flex-end",
        }}
      >
        © 2026 Marketing Leaders Fellowship Program. All rights reserved.
      </div>
    </footer>
  );
}
