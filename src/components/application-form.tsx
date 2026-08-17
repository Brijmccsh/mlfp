"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ArrowRight } from "./ui";

const STEPS = [
  {
    n: "01",
    label: "About you",
    eyebrow: "About you",
    title: "Take the first step.",
    blurb:
      "Tell us a bit about yourself. We're looking for curious, motivated leaders ready to make an impact.",
  },
  {
    n: "02",
    label: "Cohort",
    eyebrow: "Cohort & academics",
    title: "Which cohort?",
    blurb:
      "Pick the term you're applying for. Academics are optional — they help us place you, not screen you out.",
  },
  {
    n: "03",
    label: "Activities",
    eyebrow: "Activities & honors",
    title: "What you've been building.",
    blurb: "Up to five activities, plus anything you've been recognised for.",
  },
  {
    n: "04",
    label: "Links",
    eyebrow: "Additional links",
    title: "Anything else to see?",
    blurb:
      "All optional. A résumé, LinkedIn, or portfolio link helps us picture your work.",
  },
  {
    n: "05",
    label: "Essays",
    eyebrow: "Essays",
    title: "Three short essays.",
    blurb: "Around 200–300 words each. Specific beats polished.",
  },
];

const EMPTY_FORM = {
  fullName: "",
  email: "",
  phone: "",
  education: "",
  gradYear: "",
  school: "",
  cohort: "",
  testScore: "",
  honors: "",
  resume: "",
  linkedin: "",
  portfolio: "",
  other: "",
  essay1: "",
  essay2: "",
  essay3: "",
};

type FormState = typeof EMPTY_FORM;
type Activity = { org: string; role: string; desc: string };

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "13px 15px",
  borderRadius: 10,
  border: "1px solid #dde3f2",
  background: "#ffffff",
  fontSize: 15,
  color: "#0d1c4f",
  outline: "none",
  fontFamily: "inherit",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 13.5,
  fontWeight: 500,
  color: "#0d1c4f",
  marginBottom: 7,
};

const errStyle: CSSProperties = {
  fontSize: 12.5,
  color: "#d92d20",
  marginTop: 6,
  minHeight: 15,
};

const hintStyle: CSSProperties = { fontSize: 13, color: "#5b6b93", marginTop: 8 };

function Optional() {
  return <span style={{ color: "#9aa6c4", fontWeight: 400 }}>(Optional)</span>;
}

function Chevron() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#5b6b93"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        position: "absolute",
        right: 15,
        top: "50%",
        marginTop: -7,
        pointerEvents: "none",
      }}
    >
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div style={{ position: "relative" }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          ...inputStyle,
          appearance: "none",
          WebkitAppearance: "none",
        }}
      >
        <option value="">Select one</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Chevron />
    </div>
  );
}

const words = (t: string) => (t.trim() ? t.trim().split(/\s+/).length : 0);

/**
 * MLFP-2: cap at 10 digits and format as the user types. Non-digits are
 * stripped first, so pasting "+1 (555) 555-5555" or "555.555.5555" both land
 * on the same 10 digits rather than being truncated mid-string.
 */
export function formatPhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  // A pasted "+1 555..." is 11 digits; drop the country code rather than
  // truncating the last digit off the real number. No NANP area code starts
  // with 1, so this is unambiguous.
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [activities, setActivities] = useState<Activity[]>([
    { org: "", role: "", desc: "" },
  ]);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    },
    [],
  );

  const set = (key: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [key]: v }));

  const setActivity = (i: number, key: keyof Activity, v: string) =>
    setActivities((list) =>
      list.map((a, idx) => (idx === i ? { ...a, [key]: v } : a)),
    );

  function validate(s: number) {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.fullName.trim()) e.fullName = "Please add your full name.";
      if (!form.email.trim())
        e.email = "Please add an email we can reach you at.";
      else if (!form.email.includes("@"))
        e.email = "That email doesn't look right.";
    }
    if (s === 1 && !form.cohort)
      e.cohort = "Pick a cohort — “Not sure yet” is fine.";
    if (s === 2 && !activities.some((a) => a.org.trim()))
      e.activities = "Add at least one activity.";
    if (s === 4) {
      if (!words(form.essay1) || !words(form.essay2) || !words(form.essay3))
        e.essays = "All three essays are required before submitting.";
    }
    return e;
  }

  function goNext() {
    const e = validate(step);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    if (step === 4) {
      setDone(true);
      window.scrollTo(0, 0);
      return;
    }
    setSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 2200);
    setStep((s) => s + 1);
    window.scrollTo(0, 0);
  }

  const current = STEPS[step];
  const firstName = form.fullName.trim()
    ? `, ${form.fullName.trim().split(/\s+/)[0]}`
    : "";

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid #eaeef8",
        }}
      >
        <div
          data-a="page"
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "14px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/mlfp-logo-header.svg"
              alt="Marketing Leaders Fellowship Program"
              style={{
                height: 44,
                width: "auto",
                // The comp flattens the logo to brand blue for the light header.
                filter:
                  "brightness(0) saturate(100%) invert(32%) sepia(83%) saturate(3200%) hue-rotate(213deg) brightness(97%) contrast(96%)",
              }}
            />
          </Link>
          <div
            data-a="pips"
            style={{ display: "flex", alignItems: "center", gap: 24 }}
          >
            {STEPS.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => {
                  setStep(idx);
                  setErrors({});
                  window.scrollTo(0, 0);
                }}
                style={{
                  background: "none",
                  border: 0,
                  borderBottom: `2px solid ${idx === step ? "#1a66e8" : "transparent"}`,
                  borderRadius: 0,
                  padding: "6px 1px",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 600,
                  fontSize: 13.5,
                  transition: "color 160ms ease, border-color 160ms ease",
                  color:
                    idx === step ? "#0d1c4f" : idx < step ? "#46557d" : "#9aa6c4",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        data-a="page"
        style={{
          flex: 1,
          width: "100%",
          maxWidth: 820,
          margin: "0 auto",
          padding: "84px 32px 190px",
        }}
      >
        {done ? (
          <div style={{ textAlign: "center", padding: "60px 0 40px" }}>
            <span
              style={{
                width: 62,
                height: 62,
                borderRadius: 999,
                background: "#e6efff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a66e8"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </span>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 52,
                letterSpacing: "-0.032em",
                margin: "26px 0 14px",
                color: "#0d1c4f",
              }}
            >
              Application submitted.
            </h1>
            <p
              style={{
                margin: "0 auto",
                fontSize: 20,
                lineHeight: 1.7,
                color: "#46557d",
                maxWidth: "46ch",
              }}
            >
              Thanks{firstName} — your application is in. We review on a rolling
              basis and you&rsquo;ll hear from the MLFP team by email within two
              weeks.
            </p>
          </div>
        ) : (
          <>
            <div
              style={{
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#1a66e8",
              }}
            >
              Apply now
            </div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: 52,
                lineHeight: 1.04,
                letterSpacing: "-0.034em",
                margin: "14px 0 12px",
                color: "#0d1c4f",
              }}
            >
              {current.title}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 20,
                lineHeight: 1.65,
                color: "#46557d",
                maxWidth: "52ch",
              }}
            >
              {current.blurb}
            </p>

            <div
              style={{
                marginTop: 34,
                border: "1px solid #e3e8f5",
                borderRadius: 20,
                padding: "32px 34px 34px",
                background: "#ffffff",
                boxShadow: "0 18px 44px rgba(13,28,79,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  paddingBottom: 22,
                  borderBottom: "1px solid #eaeef8",
                }}
              >
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: "#e6efff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#1a66e8",
                  }}
                >
                  {current.n}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: 16,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#1a66e8",
                  }}
                >
                  {current.eyebrow}
                </span>
              </div>

              {step === 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    paddingTop: 24,
                  }}
                >
                  <div>
                    <label style={labelStyle}>Full name</label>
                    <input
                      value={form.fullName}
                      onChange={(e) => set("fullName")(e.target.value)}
                      placeholder="First and last name"
                      style={inputStyle}
                    />
                    <div style={errStyle}>{errors.fullName}</div>
                  </div>
                  <div
                    data-a="grid2"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 20,
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        value={form.email}
                        onChange={(e) => set("email")(e.target.value)}
                        placeholder="you@school.edu"
                        style={inputStyle}
                      />
                      <div style={errStyle}>{errors.email}</div>
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Phone <Optional />
                      </label>
                      <input
                        value={form.phone}
                        onChange={(e) => set("phone")(formatPhone(e.target.value))}
                        placeholder="(555) 555-5555"
                        inputMode="tel"
                        autoComplete="tel"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div
                    data-a="grid2"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 20,
                    }}
                  >
                    <div>
                      <label style={labelStyle}>Education level</label>
                      <Select
                        value={form.education}
                        onChange={set("education")}
                        options={[
                          "High school student",
                          "High school graduate",
                          "Undergraduate student",
                          "Graduate student",
                          "Other",
                        ]}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>
                        Graduation year <Optional />
                      </label>
                      <input
                        value={form.gradYear}
                        onChange={(e) => set("gradYear")(e.target.value)}
                        placeholder="e.g. 2027"
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>
                      School <Optional />
                    </label>
                    <input
                      value={form.school}
                      onChange={(e) => set("school")(e.target.value)}
                      placeholder="High school, college, or university"
                      style={inputStyle}
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 20,
                    paddingTop: 24,
                  }}
                >
                  <div>
                    <label style={labelStyle}>
                      Which cohort are you applying for?
                    </label>
                    <Select
                      value={form.cohort}
                      onChange={set("cohort")}
                      options={[
                        "Fall 2026",
                        "Spring 2027",
                        "Summer 2027",
                        "Not sure yet",
                      ]}
                    />
                    <div style={errStyle}>{errors.cohort}</div>
                  </div>
                  <div>
                    <label style={labelStyle}>
                      PSAT / SAT / ACT score <Optional />
                    </label>
                    <input
                      value={form.testScore}
                      onChange={(e) => set("testScore")(e.target.value)}
                      placeholder="e.g. 1380 SAT"
                      style={inputStyle}
                    />
                    <div style={hintStyle}>
                      Your highest so far. Leave blank if you haven&rsquo;t taken
                      one.
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ paddingTop: 24 }}>
                  <div style={{ fontSize: 16, color: "#46557d" }}>
                    List up to five. At least one is required.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      marginTop: 18,
                    }}
                  >
                    {activities.map((a, i) => (
                      <div
                        key={i}
                        style={{
                          background: "#f7f9fd",
                          border: "1px solid #e3e8f5",
                          borderRadius: 16,
                          padding: "20px 22px 22px",
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
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 11,
                            }}
                          >
                            <span
                              style={{
                                width: 26,
                                height: 26,
                                borderRadius: 999,
                                background: "#e6efff",
                                color: "#1a66e8",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontWeight: 700,
                                fontSize: 12,
                              }}
                            >
                              {i + 1}
                            </span>
                            <span
                              style={{
                                fontWeight: 600,
                                fontSize: 16,
                                color: "#0d1c4f",
                              }}
                            >
                              Activity {i + 1}
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              setActivities((list) =>
                                list.filter((_, j) => j !== i),
                              )
                            }
                            style={{
                              background: "none",
                              border: 0,
                              padding: 0,
                              fontSize: 13,
                              color: "#8a97b8",
                              cursor: "pointer",
                              fontFamily: "inherit",
                              display: activities.length > 1 ? "block" : "none",
                            }}
                          >
                            Remove
                          </button>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 14,
                            marginTop: 16,
                          }}
                        >
                          <div>
                            <label style={labelStyle}>
                              Organization / activity
                            </label>
                            <input
                              value={a.org}
                              onChange={(e) =>
                                setActivity(i, "org", e.target.value)
                              }
                              placeholder="e.g. DECA, school newspaper, family business"
                              style={{ ...inputStyle, padding: "12px 15px" }}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>
                              Leadership role / position
                            </label>
                            <input
                              value={a.role}
                              onChange={(e) =>
                                setActivity(i, "role", e.target.value)
                              }
                              placeholder="e.g. Chapter President, Editor, Volunteer"
                              style={{ ...inputStyle, padding: "12px 15px" }}
                            />
                          </div>
                          <div>
                            <label style={labelStyle}>Description</label>
                            <textarea
                              value={a.desc}
                              onChange={(e) =>
                                setActivity(i, "desc", e.target.value)
                              }
                              placeholder="What you did, and what came of it."
                              rows={3}
                              style={{
                                ...inputStyle,
                                padding: "12px 15px",
                                lineHeight: 1.6,
                                resize: "vertical",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...errStyle, marginTop: 10 }}>
                    {errors.activities}
                  </div>
                  <button
                    onClick={() =>
                      setActivities((list) =>
                        list.length < 5
                          ? [...list, { org: "", role: "", desc: "" }]
                          : list,
                      )
                    }
                    style={{
                      width: "100%",
                      marginTop: 14,
                      padding: 15,
                      borderRadius: 12,
                      border: "1px dashed #c9d6f0",
                      background: "#ffffff",
                      color: "#1a66e8",
                      fontFamily: "inherit",
                      fontWeight: 600,
                      fontSize: 14.5,
                      cursor: "pointer",
                      display: activities.length < 5 ? "block" : "none",
                    }}
                  >
                    +&nbsp;&nbsp;Add another activity
                  </button>

                  <div
                    style={{
                      marginTop: 30,
                      paddingTop: 26,
                      borderTop: "1px solid #eaeef8",
                    }}
                  >
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <span
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 999,
                          background: "#e6efff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#1a66e8"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="9.5" r="5" />
                          <path d="M9 14l-1 6.5 4-2 4 2-1-6.5" />
                        </svg>
                      </span>
                      <span
                        style={{
                          fontWeight: 600,
                          fontSize: 12,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          color: "#1a66e8",
                        }}
                      >
                        Honors and awards
                      </span>
                    </div>
                    <label style={{ ...labelStyle, margin: "18px 0 7px" }}>
                      Anything you&rsquo;d like us to know about <Optional />
                    </label>
                    <textarea
                      value={form.honors}
                      onChange={(e) => set("honors")(e.target.value)}
                      placeholder="Awards, scholarships, recognitions — or leave this blank."
                      rows={4}
                      style={{
                        ...inputStyle,
                        lineHeight: 1.6,
                        resize: "vertical",
                      }}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ paddingTop: 24 }}>
                  <div style={{ fontSize: 14.5, color: "#46557d" }}>
                    Optional — paste links (LinkedIn, portfolio, or a shared
                    resume URL).
                  </div>
                  <div
                    data-a="grid2"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 20,
                      marginTop: 20,
                    }}
                  >
                    {(
                      [
                        ["resume", "Resume URL", "https://..."],
                        ["linkedin", "LinkedIn", "https://linkedin.com/in/..."],
                        ["portfolio", "Portfolio or website", "https://..."],
                        ["other", "Anything else", "https://..."],
                      ] as const
                    ).map(([key, label, ph]) => (
                      <div key={key}>
                        <label style={labelStyle}>{label}</label>
                        <input
                          value={form[key]}
                          onChange={(e) => set(key)(e.target.value)}
                          placeholder={ph}
                          style={inputStyle}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div style={{ paddingTop: 24 }}>
                  <div style={{ fontSize: 14.5, color: "#46557d" }}>
                    Three short essays, around 200–300 words each.
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 26,
                      marginTop: 20,
                    }}
                  >
                    {(
                      [
                        [
                          "essay1",
                          "1. Tell us about a brand or ad campaign you love. Why does it stick with you?",
                          "What it was, and why it stayed with you.",
                        ],
                        [
                          "essay2",
                          "2. Have you ever helped promote something (a club, event, small business, fundraiser)? What did you do?",
                          "It does not have to be marketing work. Tell us what you actually did.",
                        ],
                        [
                          "essay3",
                          "3. Why do you want to join the Marketing Leaders Fellowship Program?",
                          "Be specific about what you want out of the eight weeks.",
                        ],
                      ] as const
                    ).map(([key, label, ph]) => (
                      <div key={key}>
                        <label
                          style={{
                            ...labelStyle,
                            fontSize: 15,
                            lineHeight: 1.5,
                            marginBottom: 9,
                          }}
                        >
                          {label}
                        </label>
                        <textarea
                          value={form[key]}
                          onChange={(e) => set(key)(e.target.value)}
                          placeholder={ph}
                          rows={6}
                          style={{
                            ...inputStyle,
                            padding: "14px 16px",
                            borderRadius: 12,
                            lineHeight: 1.7,
                            resize: "vertical",
                          }}
                        />
                        <div style={{ ...hintStyle, marginTop: 7 }}>
                          {words(form[key])} of 200–300 words
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...errStyle, marginTop: 12 }}>
                    {errors.essays}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {!done && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 30,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderTop: "1px solid #eaeef8",
          }}
        >
          <div style={{ height: 3, background: "#eef1f9" }}>
            <div
              style={{
                height: 3,
                width: `${Math.round(((step + 1) / 5) * 100)}%`,
                background: "linear-gradient(90deg, #1a66e8 0%, #6a9dff 100%)",
                transition: "width 320ms ease",
              }}
            />
          </div>
          <div
            data-a="bar-inner"
            style={{
              maxWidth: 820,
              margin: "0 auto",
              padding: "16px 32px 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#0d1c4f" }}>
                Step {step + 1} of 5 · {current.eyebrow}
              </div>
              <div style={{ fontSize: 13, color: "#5b6b93", marginTop: 2 }}>
                {saved ? "Progress saved ✓" : "You can save and return at any time."}
              </div>
            </div>
            <div
              data-a="bar-actions"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <button
                onClick={() => {
                  if (step > 0) {
                    setStep(step - 1);
                    setErrors({});
                    window.scrollTo(0, 0);
                  }
                }}
                disabled={step === 0}
                style={{
                  fontFamily: "inherit",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "13px 24px",
                  borderRadius: 999,
                  background: "#f3f5fb",
                  border: "1px solid #dde3f2",
                  color: "#0d1c4f",
                  cursor: step === 0 ? "not-allowed" : "pointer",
                  opacity: step === 0 ? 0.45 : 1,
                }}
              >
                Back
              </button>
              <button
                onClick={goNext}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "inherit",
                  fontWeight: 600,
                  fontSize: 15,
                  padding: "14px 28px",
                  borderRadius: 999,
                  color: "#ffffff",
                  cursor: "pointer",
                  background: "linear-gradient(180deg, #3d7bff 0%, #1e57ec 100%)",
                  border: "1px solid rgba(255,255,255,0.26)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.5), 0 10px 24px rgba(23,72,214,0.28)",
                  transition: "box-shadow 200ms ease",
                }}
              >
                {step === 4 ? "Submit application" : "Save & next"}
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
