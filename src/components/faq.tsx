"use client";

import { useState } from "react";
import { FAQS } from "@/content/home";
import { ArrowRight, PAGE_X } from "./ui";

export function Faq() {
  // The comp opens the first entry by default (openFirstFaq).
  const [open, setOpen] = useState<number>(0);

  return (
    <section
      id="faq"
      data-bg="light"
      data-m="pad"
      style={{ background: "#f3f5fb", padding: `84px ${PAGE_X}` }}
    >
      <div
        data-m="faq-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "0.34fr 0.66fr",
          gap: 56,
          alignItems: "start",
        }}
      >
        <div>
          <h2
            style={{
              fontWeight: 700,
              fontSize: 52,
              lineHeight: 1.02,
              letterSpacing: "-0.032em",
              margin: "14px 0 0",
              color: "#0d1c4f",
            }}
          >
            Questions, answered.
          </h2>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 20,
              lineHeight: 1.7,
              color: "#46557d",
              maxWidth: "32ch",
            }}
          >
            <b style={{ color: "#086BFF", fontSize: 18 }}>
              Everything applicants ask before they start. If yours isn&rsquo;t
              here, write to us directly.
            </b>
          </p>
          <div style={{ marginTop: 28, paddingTop: 18 }}>
            <div
              style={{
                width: 64,
                height: 3,
                background: "#2f6bff",
                margin: "0 0 20px",
              }}
            />
            <div style={{ fontWeight: 600, fontSize: 18, color: "#0d1c4f" }}>
              Still have a question?
            </div>
            <a
              href="mailto:admin@themlfp.com"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginTop: 6,
                fontSize: 18,
                color: "#1a66e8",
              }}
            >
              admin@themlfp.com
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div
                key={q}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e3e8f5",
                  borderRadius: 14,
                  boxShadow: "0 1px 2px rgba(13,28,79,0.04)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: "22px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 600,
                    fontSize: 17,
                    letterSpacing: "-0.012em",
                    color: "#0d1c4f",
                  }}
                >
                  <span
                    data-m="faq-num"
                    style={{
                      flex: "none",
                      width: 22,
                      fontSize: 12.5,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: "#9db0da",
                    }}
                  >
                    {`0${i + 1}`}
                  </span>
                  <span style={{ flex: 1 }}>{q}</span>
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      flex: "none",
                      borderRadius: 999,
                      background: "#e6efff",
                      color: "#1a66e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      lineHeight: 1,
                    }}
                  >
                    {isOpen ? "–" : "+"}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 270 : 0,
                    overflow: "hidden",
                    transition: "max-height 280ms ease",
                  }}
                >
                  <p
                    data-m="faq-answer"
                    style={{
                      margin: 0,
                      padding: "0 30px 24px 64px",
                      fontSize: 15.5,
                      lineHeight: 1.75,
                      color: "#46557d",
                      maxWidth: "74ch",
                    }}
                  >
                    {a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
