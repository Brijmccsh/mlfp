import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export const PAGE_X = "var(--page-pad)";

/** Gold gradient referenced as url(#mlGold) by the hero + phase icons. */
export function GoldDefs() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
    >
      <defs>
        <linearGradient id="mlGold" x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="28%" stopColor="#f8d478" />
          <stop offset="58%" stopColor="#e3ad33" />
          <stop offset="100%" stopColor="#b47c17" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export const GOLD_GLOW =
  "drop-shadow(0 0 6px rgba(248,212,120,0.8)) drop-shadow(0 0 16px rgba(227,173,51,0.45))";

export function ArrowRight({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="M12.5 6l6 6-6 6" />
    </svg>
  );
}

const APPLY_BASE: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  fontWeight: 600,
  color: "#ffffff",
  background: "#0a6bff",
  border: "1px solid rgba(255,255,255,0.24)",
  transition: "box-shadow 200ms ease, background 200ms ease",
};

/**
 * Apply CTA. The comp renders this seven times at slightly different sizes and
 * radii; `variant` covers the distinct treatments rather than duplicating them.
 */
export function ApplyButton({
  children = "Apply Now",
  variant = "pill",
  style,
}: {
  children?: ReactNode;
  variant?: "pill" | "square" | "glow" | "small";
  style?: CSSProperties;
}) {
  const variants: Record<string, CSSProperties> = {
    pill: {
      fontSize: 14.5,
      padding: "13px 26px",
      borderRadius: 999,
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.5), 0 12px 28px rgba(6,20,58,0.45)",
    },
    small: {
      fontSize: 14,
      padding: "10px 22px",
      borderRadius: 999,
      boxShadow:
        "inset 0 1px 0 rgba(255,255,255,0.5), 0 8px 20px rgba(23,72,214,0.4)",
    },
    square: {
      fontSize: 14.5,
      padding: "14px 26px",
      borderRadius: 10,
      boxShadow:
        "0 0 26px rgba(61,123,255,0.35), inset 0 1px 0 rgba(255,255,255,0.45), 0 10px 24px rgba(23,72,214,0.28)",
    },
    glow: {
      fontSize: 15,
      padding: "15px 26px",
      borderRadius: 10,
      boxShadow:
        "0 0 34px rgba(61,123,255,0.5), inset 0 1px 0 rgba(255,255,255,0.45), 0 12px 26px rgba(23,72,214,0.35)",
    },
  };

  return (
    <Link href="/apply" style={{ ...APPLY_BASE, ...variants[variant], ...style }}>
      {children}
      <ArrowRight />
    </Link>
  );
}

/** Shared section heading rule — 3px accent bar under a title. */
export function Rule({
  color = "#086BFF",
  width = 64,
  glow = true,
  style,
}: {
  color?: string;
  width?: number;
  glow?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        height: 3,
        borderRadius: 2,
        background: color,
        boxShadow: glow ? "0 0 16px rgba(10,107,255,0.45)" : undefined,
        ...style,
      }}
    />
  );
}
