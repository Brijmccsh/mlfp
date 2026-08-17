import type { ReactNode } from "react";
import { MODULES } from "@/content/home";
import { ApplyButton, PAGE_X } from "./ui";

const stroke = {
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const CHALLENGE_ROWS: { label: string; body: string; icon: ReactNode }[] = [
  {
    label: "Assignment:",
    body: "In teams, design a $25M 360 marketing campaign for a live IMT client, driving market awareness, community education, and public trust.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" stroke="#1a66e8" {...stroke}>
        <path d="M4 10.5v3l11 4.5V6z" />
        <path d="M15 9.5a3 3 0 0 1 0 5" />
        <path d="M6.5 14.5V19" />
      </svg>
    ),
  },
  {
    label: "Deliverables:",
    body: "A written report and pitch deck allocating budget and proposals across four channels — Linear/Traditional, Digital Content/Social, Experiential/Events, and Big Swings.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" stroke="#1a66e8" {...stroke}>
        <path d="M3.5 7.5h6l2 2.5h9v9.5h-17z" />
        <path d="M3.5 7.5V5.5h5l1.5 2" />
      </svg>
    ),
  },
  {
    label: "Key objectives:",
    body: "Increase market reach; educate on safety & trust; promote the consumer experience; and leverage the client’s partners.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#1a66e8" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3.4" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Process:",
    body: "Live Zoom sessions with an MLFP Coordinator, team collaboration, and a final live pitch presentation to Chad Tons for scoring and feedback.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" stroke="#1a66e8" {...stroke}>
        <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
        <circle cx="12" cy="11" r="2.2" />
        <path d="M8 16.5c.8-1.6 2.3-2.4 4-2.4s3.2.8 4 2.4" />
      </svg>
    ),
  },
];

const cardStyle = {
  background: "#ffffff",
  border: "1px solid #e3e8f5",
  borderRadius: 20,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column" as const,
  boxShadow: "0 18px 44px rgba(13,28,79,0.08)",
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: 14,
  padding: "22px 32px",
  background: "linear-gradient(150deg, #0d3a8f 0%, #0a2159 62%, #061737 100%)",
};

function CardHeader({
  icon,
  title,
  suffix,
}: {
  icon: ReactNode;
  title: string;
  suffix: string;
}) {
  return (
    <div style={cardHeader}>
      <span
        style={{
          width: 50,
          height: 52,
          flex: "none",
          borderRadius: 12,
          background: "rgba(150,196,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </span>
      <div>
        <span
          style={{
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          {title}
        </span>
        <span style={{ fontSize: 14, color: "#a9c8ff" }}> {suffix}</span>
      </div>
    </div>
  );
}

export function Program() {
  return (
    <section
      data-bg="light"
      data-m="pad"
      style={{ padding: `84px ${PAGE_X} 88px` }}
    >
      <div
        data-m="program-intro"
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 56,
          alignItems: "center",
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1.08,
              letterSpacing: "-0.034em",
              margin: "14px 0 16px",
              color: "#0d1c4f",
              maxWidth: "26ch",
            }}
          >
            A Fellowship Based On The Way Agencies Actually Work
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              lineHeight: 1.7,
              color: "#46557d",
              maxWidth: "50ch",
              padding: "20px 0",
              fontWeight: 700,
            }}
          >
            A step-by-step fellowship designed to take you from foundational
            insights to a real-world CEO challenge — the brief, the budget, the
            channel plan, and the room where the work gets sold.
          </p>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/ceo-challenge-logo.jpg"
            alt="The CEO Challenge"
            style={{
              width: "100%",
              maxWidth: 560,
              height: "auto",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      </div>

      <div
        data-m="cards-2up"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
          alignItems: "stretch",
        }}
      >
        <div id="modules" style={cardStyle}>
          <CardHeader
            title="Module-by-module outline"
            suffix="(Weeks 1–4)"
            icon={
              <svg
                viewBox="0 0 24 24"
                stroke="#bcd8ff"
                {...stroke}
                style={{ width: 30, height: 32 }}
              >
                <path d="M4 5.5h6a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H4z" />
                <path d="M20 5.5h-6a2 2 0 0 0-2 2V19a2 2 0 0 1 2-2h6z" />
              </svg>
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              padding: "28px 32px 34px",
            }}
          >
            {MODULES.map((m) => (
              <div
                key={m.i}
                data-m="module-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "30px 1fr",
                  gap: 16,
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 999,
                    background: "#1a66e8",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {m.i}
                </span>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#46557d",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "#0d1c4f" }}>
                    {m.title}
                  </span>{" "}
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="challenge" style={cardStyle}>
          <CardHeader
            title="The CEO Challenge"
            suffix="(Final Weeks)"
            icon={
              <svg
                viewBox="0 0 24 24"
                stroke="#bcd8ff"
                {...stroke}
                style={{ width: 29, height: 31 }}
              >
                <path d="M4 10.5v3l11 4.5V6z" />
                <path d="M15 9.5a3 3 0 0 1 0 5" />
                <path d="M6.5 14.5V19" />
              </svg>
            }
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              padding: "28px 32px 34px",
            }}
          >
            {CHALLENGE_ROWS.map((r) => (
              <div
                key={r.label}
                data-m="challenge-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "38px 1fr",
                  gap: 16,
                  alignItems: "start",
                }}
              >
                <span
                  style={{
                    width: 38,
                    height: 38,
                    flex: "none",
                    borderRadius: 12,
                    background: "#e6efff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {r.icon}
                </span>
                <p
                  style={{
                    margin: "3px 0 0",
                    fontSize: 15.5,
                    lineHeight: 1.65,
                    color: "#46557d",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 700,
                      letterSpacing: "0.02em",
                      textTransform: "uppercase",
                      fontSize: 13.5,
                      color: "#0d1c4f",
                    }}
                  >
                    {r.label}
                  </span>{" "}
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          background: "#ffffff",
          border: "1px solid #e3e8f5",
          borderRadius: 18,
          padding: "22px 26px",
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.018em",
              color: "#0d1c4f",
            }}
          >
            Four modules, then the live brief.
          </div>
          <div style={{ fontSize: 14.5, color: "#46557d", marginTop: 4 }}>
            <b style={{ color: "#086BFF", fontSize: 16 }}>
              The application takes approx. 1 hr — you can save and return.
            </b>
          </div>
        </div>
        <ApplyButton variant="square" />
      </div>
    </section>
  );
}
