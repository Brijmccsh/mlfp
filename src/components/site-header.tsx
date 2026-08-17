"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/content/home";
import { ApplyButton, ArrowRight, PAGE_X } from "./ui";

/**
 * Header behaviour ported from the comp:
 *  - hides on scroll down, returns on scroll up, always visible above 90px
 *  - chrome turns to glass past 70px, tinted by whichever [data-bg] zone is
 *    under the header line
 *  - the oversized hero logo crossfades into the compact header logo
 */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [light, setLight] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY || 0;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        const dy = y - lastY;

        setHidden((prev) => {
          if (y < 90) return false;
          if (dy > 5) return true;
          if (dy < -5) return false;
          return prev;
        });
        lastY = y;

        let isLight = false;
        document.querySelectorAll("[data-bg]").forEach((zone) => {
          const r = zone.getBoundingClientRect();
          if (r.top <= 46 && r.bottom > 46) {
            isLight = zone.getAttribute("data-bg") === "light";
          }
        });
        setLight(isLight);
        setScrolled(y > 70);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const chrome = !scrolled
    ? { background: "transparent", borderBottom: "1px solid transparent" }
    : light
      ? {
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(13,28,79,0.08)",
        }
      : {
          background: "rgba(3,11,34,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        };

  const invert = light ? "invert(1) hue-rotate(180deg)" : undefined;

  return (
    <>
      {/* Oversized logo shown only at the top of the page */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        data-m="hero-logo"
        src="/brand/mlfp-logo-header.svg"
        alt="Marketing Leaders Fellowship Program"
        style={{
          position: "fixed",
          left: "max(28px, calc((100% - 1440px) / 2))",
          top: 10,
          width: "clamp(210px, 24vw, 420px)",
          height: "auto",
          zIndex: 60,
          pointerEvents: "none",
          transition: "opacity 300ms ease, transform 300ms ease",
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? "translateY(-8px)" : "translateY(0)",
          filter: invert,
        }}
      />

      <header
        data-m="desktop-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24,
          padding: `18px ${PAGE_X}`,
          transition:
            "transform 300ms ease, background 260ms ease, border-color 260ms ease",
          transform: hidden ? "translateY(-112%)" : "translateY(0)",
          ...chrome,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/mlfp-logo-header.svg"
          alt="Marketing Leaders Fellowship Program"
          style={{
            width: 196,
            height: 55,
            objectFit: "contain",
            justifySelf: "start",
            transition: "opacity 300ms ease",
            opacity: scrolled ? 1 : 0,
            filter: invert,
          }}
        />
        <nav style={{ display: "flex", gap: 30, fontSize: 14 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 14,
                transition: "opacity 160ms ease",
                color: light ? "rgba(13,28,79,0.74)" : "rgba(255,255,255,0.72)",
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ApplyButton variant="small" />
        </div>
      </header>

      {/* Mobile bar — revealed under 900px by globals.css */}
      <div
        data-m="mobile-bar"
        style={{
          display: "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          padding: "12px 20px",
          transition:
            "transform 300ms ease, background 260ms ease, border-color 260ms ease",
          transform: hidden ? "translateY(-112%)" : "translateY(0)",
          ...chrome,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/mlfp-logo-header.svg"
          alt="Marketing Leaders Fellowship Program"
          style={{
            height: 30,
            width: "auto",
            maxWidth: "52vw",
            objectFit: "contain",
            objectPosition: "left center",
            transformOrigin: "left top",
            transition: "transform 460ms cubic-bezier(0.22,0.61,0.36,1)",
            transform: scrolled
              ? "translateY(0) scale(1)"
              : "translateY(4px) scale(1.3)",
            filter: invert,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <ApplyButton variant="small" style={{ fontSize: 13, padding: "9px 18px" }} />
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            style={{
              width: 40,
              height: 40,
              flex: "none",
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              stroke={light ? "#0d1c4f" : "#ffffff"}
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M1 1.5h16" />
              <path d="M1 7h16" />
              <path d="M1 12.5h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Fullscreen mobile menu */}
      <div
        style={{
          display: menuOpen ? "flex" : "none",
          position: "fixed",
          inset: 0,
          zIndex: 90,
          background: "rgba(3,11,34,0.97)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          flexDirection: "column",
          padding: "18px 22px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/mlfp-logo-header.svg"
            alt="Marketing Leaders Fellowship Program"
            style={{ height: 26, width: "auto" }}
          />
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            style={{
              width: 40,
              height: 40,
              flex: "none",
              borderRadius: 12,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M3 3l10 10" />
              <path d="M13 3L3 13" />
            </svg>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            marginTop: 34,
          }}
        >
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontWeight: 600,
                fontSize: 24,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                padding: "14px 0",
                borderBottom:
                  i === NAV_LINKS.length - 1
                    ? undefined
                    : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <Link
          href="/apply"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontWeight: 600,
            fontSize: 16,
            padding: "16px 26px",
            borderRadius: 999,
            color: "#ffffff",
            background: "#0a6bff",
            border: "1px solid rgba(255,255,255,0.26)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.5), 0 12px 28px rgba(23,72,214,0.42)",
          }}
        >
          Apply Now
          <ArrowRight />
        </Link>
      </div>
    </>
  );
}
