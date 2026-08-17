import Link from "next/link";
import { APPLY_STEPS } from "@/content/home";
import { ArrowRight, PAGE_X } from "./ui";

export function ApplyCta() {
  return (
    <section
      id="apply"
      data-bg="light"
      data-m="pad"
      style={{ padding: `84px ${PAGE_X} 92px` }}
    >
      <div
        data-m="apply-panel"
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 26,
          background:
            "linear-gradient(135deg, #030b22 0%, #0a1e4a 54%, #03102b 100%)",
          padding: 9,
          boxShadow:
            "0 0 0 1px rgba(150,196,255,0.22), 0 0 40px rgba(61,123,255,0.14), 0 0 110px rgba(37,110,235,0.1), 0 24px 70px rgba(26,102,232,0.1)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: "16%",
            width: 620,
            height: 540,
            background:
              "radial-gradient(circle at 50% 50%, rgba(94,146,255,0.3) 0%, rgba(7,20,51,0) 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          data-m="apply-inner"
          style={{
            position: "relative",
            border: "1px solid #8AA2C980",
            borderRadius: 19,
            padding: "54px 50px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 6,
              border: "1px solid #ABABAB33",
              borderRadius: 14,
              pointerEvents: "none",
            }}
          />
          <div
            data-m="apply-grid"
            style={{
              position: "relative",
              zIndex: 2,
              display: "grid",
              gridTemplateColumns: "1fr 0.8fr",
              gap: 56,
              alignItems: "center",
            }}
          >
            <div>
              <div
                data-m="apply-title"
                style={{ fontWeight: 700, fontSize: 52, color: "#FFFFFF" }}
              >
                Apply now
              </div>
              <div
                style={{
                  width: 46,
                  height: 2,
                  margin: "24px 0 18px",
                  backgroundColor: "#086BFF",
                }}
              />
              <h2
                style={{
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: 1.04,
                  letterSpacing: "-0.035em",
                  margin: "0 0 18px",
                  color: "#ffffff",
                }}
              >
                Take the <span style={{ color: "#2f80ff" }}>first step.</span>
              </h2>
              <p
                style={{
                  margin: "0 0 32px",
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: "40ch",
                  fontWeight: 700,
                }}
              >
                Tell us about yourself and your goals. We&rsquo;re looking for
                curious, motivated students ready to do real work for a real
                client.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  flexWrap: "wrap",
                }}
              >
                <Link
                  href="/apply"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontWeight: 600,
                    fontSize: 16,
                    padding: "15px 30px",
                    borderRadius: 999,
                    color: "#ffffff",
                    background: "#0a6bff",
                    border: "1px solid rgba(255,255,255,0.24)",
                    boxShadow:
                      "0 0 34px rgba(61,123,255,0.45), inset 0 1px 0 rgba(255,255,255,0.5), 0 14px 32px rgba(6,20,58,0.5)",
                    transition: "box-shadow 200ms ease, background 200ms ease",
                  }}
                >
                  Start your application
                  <ArrowRight />
                </Link>
                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  Rolling admissions.
                  <br />
                  No application fee.
                </div>
              </div>
            </div>

            <div
              style={{
                position: "relative",
                background:
                  "linear-gradient(180deg, #f2f4f8 0%, #ffffff 100%)",
                border: "2px solid #BCBBB9",
                borderRadius: 12,
                padding: "30px 30px 26px",
                boxShadow: "0 28px 60px rgba(2,7,22,0.5)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 5,
                  border: "1px solid #A5C9FF99",
                  borderRadius: 8,
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 18,
                    letterSpacing: "0.18em",
                    color: "#282F49",
                    textAlign: "center",
                  }}
                >
                  The application, in five steps
                </div>
                <div
                  style={{
                    width: 44,
                    height: 1,
                    margin: "12px auto 14px",
                    backgroundColor: "#6A6A6A",
                  }}
                />
                {APPLY_STEPS.map((label, i) => (
                  <div
                    key={label}
                    data-m="apply-step"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "34px 1fr",
                      gap: 14,
                      alignItems: "baseline",
                      padding: "11px 0",
                      borderBottom:
                        i === APPLY_STEPS.length - 1
                          ? undefined
                          : "1px solid rgba(201,180,138,0.4)",
                    }}
                  >
                    <span
                      style={{ fontWeight: 700, fontSize: 16, color: "#086BFF" }}
                    >
                      {`0${i + 1}`}
                    </span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 16,
                        letterSpacing: "-0.01em",
                        color: "#10214e",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 16,
                    paddingTop: 14,
                    borderTop: "1px solid rgba(201,180,138,0.4)",
                    fontSize: 13,
                    letterSpacing: "0.02em",
                    color: "#7D7D7C",
                    textAlign: "center",
                  }}
                >
                  <b style={{ color: "#6A6A6A", fontSize: 18 }}>
                    Approx. 1 hr · Save and return anytime
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
