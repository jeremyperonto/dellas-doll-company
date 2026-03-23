/**
 * SiteBadge — universal "back to main site" navigation.
 * Drop into any project hosted on jeremyperonto.com.
 *
 * Renders:
 *  - Fixed "JP" monogram badge (top-right corner)
 *  - Footer link ("jeremyperonto.com")
 *
 * Zero dependencies beyond React. Fully self-contained styles.
 *
 * JPBadge variant:
 *  - "auto" (default): samples the pixel behind the badge on mount
 *    and picks light or dark style accordingly.
 *  - "light": white glass — use on dark backgrounds.
 *  - "dark":  dark glass  — use on light backgrounds.
 */

import { useState, useEffect, useRef } from "react";

const SITE_URL = "https://jeremyperonto.com";

const THEMES = {
  light: {
    bg: "rgba(255,255,255,.15)",
    bgHover: "rgba(255,255,255,.3)",
    border: "rgba(255,255,255,.25)",
    color: "rgba(255,255,255,.7)",
    colorHover: "rgba(255,255,255,.95)",
  },
  dark: {
    bg: "rgba(0,0,0,.12)",
    bgHover: "rgba(0,0,0,.22)",
    border: "rgba(0,0,0,.15)",
    color: "rgba(0,0,0,.45)",
    colorHover: "rgba(0,0,0,.7)",
  },
};

function luminanceAt(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;
  const bg = getComputedStyle(el).backgroundColor;
  const m = bg.match(/\d+/g);
  if (!m || m.length < 3) return null;
  const [r, g, b] = m.map(Number);
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function JPBadge({ variant = "auto" }) {
  const ref = useRef(null);
  const [theme, setTheme] = useState(variant === "auto" ? "light" : variant);

  useEffect(() => {
    if (variant !== "auto") { setTheme(variant); return; }
    // Sample after a paint so elements behind the badge are rendered
    const id = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const lum = luminanceAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
      setTheme(lum !== null && lum > 140 ? "dark" : "light");
    });
    return () => cancelAnimationFrame(id);
  }, [variant]);

  const t = THEMES[theme];

  return (
    <a
      ref={ref}
      href={SITE_URL}
      title="jeremyperonto.com"
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 9999,
        width: 32,
        height: 32,
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: t.bg,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${t.border}`,
        color: t.color,
        textDecoration: "none",
        fontFamily: "'Black Han Sans', sans-serif",
        fontSize: "0.7rem",
        lineHeight: 1,
        transition: "background .2s, color .2s",
      }}
      onPointerEnter={(e) => {
        e.currentTarget.style.background = t.bgHover;
        e.currentTarget.style.color = t.colorHover;
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.background = t.bg;
        e.currentTarget.style.color = t.color;
      }}
    >
      JP
    </a>
  );
}

export function SiteFooter() {
  return (
    <div
      style={{
        padding: "16px 20px",
        textAlign: "center",
      }}
    >
      <a
        href={SITE_URL}
        style={{
          color: "rgba(0,0,0,.3)",
          textDecoration: "none",
          fontSize: "0.7rem",
          letterSpacing: "1px",
          fontFamily: "system-ui, sans-serif",
          transition: "color .2s",
        }}
        onPointerEnter={(e) => { e.currentTarget.style.color = "rgba(0,0,0,.55)"; }}
        onPointerLeave={(e) => { e.currentTarget.style.color = "rgba(0,0,0,.3)"; }}
      >
        jeremyperonto.com
      </a>
    </div>
  );
}
