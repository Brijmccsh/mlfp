"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { ApplyButton, PAGE_X } from "./ui";

type Phase = {
  weeks: string;
  num: string;
  title: string;
  body: string;
  note: string;
  accent: string;
  chipBg: string;
  numColor: string;
  icon: ReactNode;
  noteIcon: ReactNode;
};

const stroke = {
  fill: "none",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PHASES: Phase[] = [
  {
    weeks: "Weeks 1–4",
    num: "01",
    title: "Self-Paced Learning",
    body: "Four modules taught by Chad Tons, covering how an agency runs, how a brand defines itself, and how a 360 campaign is designed from brief to buy.",
    note: "Roughly 3–5 hours per week, on your own schedule.",
    accent: "#b1802a",
    chipBg: "#fdf1dc",
    numColor: "#f0d6a4",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" stroke="#b1802a" {...stroke}>
        <path d="M3 5.5h7a2 2 0 0 1 2 2V19a2 2 0 0 0-2-2H3z" />
        <path d="M21 5.5h-7a2 2 0 0 0-2 2V19a2 2 0 0 1 2-2h7z" />
      </svg>
    ),
    noteIcon: (
      <svg
        viewBox="0 0 24 24"
        stroke="#b1802a"
        {...stroke}
        style={{ flex: "none", width: 34, height: 34 }}
      >
        <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
        <path d="M3.5 10h17" />
        <path d="M8 3.5v3" />
        <path d="M16 3.5v3" />
      </svg>
    ),
  },
  {
    weeks: "Weeks 5–7",
    num: "02",
    title: "The CEO Challenge Project",
    body: "Teams receive a live client brief and build a full integrated campaign against it — strategy, channels, budget allocation, and creative direction.",
    note: "Team-based, with checkpoints along the way.",
    accent: "#1a66e8",
    chipBg: "#e6efff",
    numColor: "#a9c6ff",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" stroke="#1a66e8" {...stroke}>
        <circle cx="9" cy="9" r="3" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M16 7.5a2.8 2.8 0 0 1 0 5.4" />
        <path d="M17.5 19c0-2.2-.8-3.9-2.2-4.8" />
      </svg>
    ),
    noteIcon: (
      <svg
        viewBox="0 0 24 24"
        stroke="#1a66e8"
        {...stroke}
        style={{ flex: "none", width: 34, height: 34 }}
      >
        <circle cx="9" cy="9" r="3" />
        <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5" />
        <path d="M16 7.5a2.8 2.8 0 0 1 0 5.4" />
      </svg>
    ),
  },
  {
    weeks: "Week 8",
    num: "03",
    title: "Program Close",
    body: "Every team presents live. Work is judged on strategic clarity, channel logic, and the strength of the pitch itself.",
    note: "Live pitch, awards, and recognition.",
    accent: "#6b46c8",
    chipBg: "#efe9fd",
    numColor: "#c3aef0",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" stroke="#6b46c8" {...stroke}>
        <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
        <path d="M8 6H5.5a3 3 0 0 0 3 3" />
        <path d="M16 6h2.5a3 3 0 0 1-3 3" />
        <path d="M10 20h4" />
        <path d="M12 13v7" />
      </svg>
    ),
    noteIcon: (
      <svg
        viewBox="0 0 24 24"
        stroke="#6b46c8"
        {...stroke}
        style={{ flex: "none", width: 34, height: 34 }}
      >
        <path d="M12 4l2.5 5 5.5.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.5-.8z" />
      </svg>
    ),
  },
];

export function Phases() {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const onScroll = () => {
      const card = el.children[0] as HTMLElement | undefined;
      if (!card) return;
      const step = card.getBoundingClientRect().width + 14;
      const i = Math.max(0, Math.min(2, Math.round(el.scrollLeft / step)));
      setPhase(i);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const goToPhase = useCallback((i: number) => {
    const el = rowRef.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (!el || !target) return;
    el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setPhase(i);
  }, []);

  return (
    <section
      id="program"
      data-bg="dark"
      data-m="pad"
      style={{
        position: "relative",
        background: "#0a1231",
        padding: `78px ${PAGE_X} 84px`,
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/phases-crowd.png"
        alt="Audience inside the REGEN dome experience"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 42%",
        }}
      />
      <div
        data-m="phases-overlay"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(115deg, rgba(6,12,38,0.9) 0%, rgba(8,14,44,0.62) 42%, rgba(22,10,52,0.34) 100%)",
          pointerEvents: "none",
          opacity: 0.25,
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <h2
          style={{
            fontWeight: 700,
            fontSize: 52,
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "#ffffff",
          }}
        >
          Eight weeks,
          <br />
          <span style={{ color: "#2f80ff" }}>three phases.</span>
        </h2>
        <p
          style={{
            margin: "20px 0 0",
            fontSize: 18,
            lineHeight: 1.65,
            color: "#ffffff",
            maxWidth: "46ch",
            fontWeight: 700,
          }}
        >
          Structured enough to follow while you study or work. Demanding enough
          to be worth putting on a résumé.
        </p>

        <div
          data-m="phase-row"
          ref={rowRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 22,
            marginTop: 46,
          }}
        >
          {PHASES.map((p) => (
            <div
              key={p.num}
              data-m="phase-card"
              style={{
                background: "#ffffff",
                borderRadius: 18,
                padding: "24px 24px 20px",
                boxShadow: "0 26px 60px rgba(2,7,22,0.4)",
                display: "flex",
                flexDirection: "column",
                minHeight: 400,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <span
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 999,
                      background: p.chipBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {p.icon}
                  </span>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 18,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: p.accent,
                    }}
                  >
                    {p.weeks}
                  </span>
                </div>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 40,
                    letterSpacing: "-0.02em",
                    color: p.numColor,
                  }}
                >
                  {p.num}
                </span>
              </div>

              <h3
                style={{
                  fontWeight: 600,
                  fontSize: 30,
                  letterSpacing: "-0.02em",
                  margin: "18px 0 10px",
                  color: "#0d1c4f",
                }}
              >
                {p.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "#46557d",
                }}
              >
                <b style={{ fontSize: 18 }}>{p.body}</b>
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginTop: "auto",
                  paddingTop: 16,
                  borderTop: "1px solid #eaeef8",
                  height: 78,
                  boxSizing: "border-box",
                }}
              >
                {p.noteIcon}
                <b style={{ fontSize: 13, color: "#5B6B93" }}>{p.note}</b>
              </div>
            </div>
          ))}
        </div>

        <div
          data-m="phase-dots"
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            marginTop: 20,
          }}
        >
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              onClick={() => goToPhase(i)}
              aria-label={`Show phase ${i + 1}`}
              style={{
                width: phase === i ? 22 : 8,
                height: 8,
                borderRadius: 999,
                border: 0,
                padding: 0,
                cursor: "pointer",
                transition: "width 240ms ease, background 240ms ease",
                background: phase === i ? "#2f86ff" : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            flexWrap: "wrap",
            marginTop: 38,
          }}
        >
          <span style={{ fontSize: 15.5, color: "rgba(255,255,255,0.74)" }}>
            Applications for the next cohort are open.
          </span>
          <ApplyButton variant="pill" />
        </div>
      </div>
    </section>
  );
}
