import { useState, useRef, useCallback } from "react";
import { playStamp, playSuccess } from "../sound.js";
import DollSVG from "../components/DollSVG.jsx";

const ZONES = [
  { id: "eyes", label: "Eyes", yMin: 0, yMax: 0.3 },
  { id: "seams", label: "Seams", yMin: 0.3, yMax: 0.6 },
  { id: "edges", label: "Edges", yMin: 0.6, yMax: 1.0 },
];

/* SVG checkmark — avoids Unicode emoji rendering issues */
function CheckMark({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill="#4ADE80" />
      <path d="M7 12.5L10.5 16L17 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function QualityInspect({ onComplete, dollCfg }) {
  const [stamped, setStamped] = useState({});
  const [magPos, setMagPos] = useState({ x: 200, y: 150 });
  const [activeZone, setActiveZone] = useState(null);
  const [approved, setApproved] = useState(false);
  const dollRef = useRef(null);

  const allDone = ZONES.every((z) => stamped[z.id]);

  const detectZone = useCallback((e) => {
    if (!dollRef.current) return null;
    const dr = dollRef.current.getBoundingClientRect();
    const relY = (e.clientY - dr.top) / dr.height;
    const relX = (e.clientX - dr.left) / dr.width;
    if (relX >= -0.1 && relX <= 1.1) {
      const found = ZONES.find((z) => !stamped[z.id] && relY >= z.yMin && relY < z.yMax);
      return found?.id || null;
    }
    return null;
  }, [stamped]);

  const onMove = useCallback((e) => {
    if (approved) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMagPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setActiveZone(detectZone(e));
  }, [detectZone, approved]);

  const onClick = useCallback((e) => {
    if (approved) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMagPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    const zone = detectZone(e);
    if (!zone || stamped[zone]) return;
    playStamp();
    const next = { ...stamped, [zone]: true };
    setStamped(next);
    setActiveZone(null);
    if (ZONES.every((z) => next[z.id])) {
      setTimeout(() => {
        setApproved(true);
        playSuccess();
        setTimeout(onComplete, 1200);
      }, 300);
    }
  }, [detectZone, stamped, approved, onComplete]);

  return (
    <div className="mini-game"
      onPointerMove={onMove} onPointerDown={onClick}
      style={{ minHeight: 320, cursor: "none", position: "relative", overflow: "hidden" }}>
      <div className="mini-game-instruction">Move the magnifier and tap to inspect each area!</div>

      {/* Zone labels — show which areas need inspection */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 12, marginBottom: 12,
      }}>
        {ZONES.map((z) => (
          <div key={z.id} style={{
            display: "flex", alignItems: "center", gap: 4,
            padding: "4px 10px", borderRadius: 12,
            background: stamped[z.id] ? "#E8FFF0" : "var(--white)",
            border: `1.5px solid ${stamped[z.id] ? "#4ADE80" : "var(--border)"}`,
            fontSize: 12, fontFamily: "'Black Han Sans',cursive",
            color: stamped[z.id] ? "#16A34A" : "var(--mid)",
            transition: "all .3s",
          }}>
            {stamped[z.id] ? <CheckMark size={16} /> : <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid var(--border)", display: "inline-block" }} />}
            {z.label}
          </div>
        ))}
      </div>

      {/* Doll */}
      <div style={{ display: "flex", justifyContent: "center", position: "relative" }}>
        <div ref={dollRef} style={{ position: "relative" }}>
          <DollSVG cfg={dollCfg} size={160} />
        </div>
      </div>

      {/* Magnifying glass */}
      {!approved && (
        <div style={{
          position: "absolute", left: magPos.x - 50, top: magPos.y - 50,
          width: 100, height: 100, borderRadius: "50%",
          border: `3px solid ${activeZone ? "var(--coral)" : "rgba(26,38,144,.4)"}`,
          boxShadow: activeZone
            ? "0 0 20px rgba(232,53,74,.3), inset 0 0 15px rgba(232,53,74,.08)"
            : "0 0 10px rgba(0,0,0,.08)",
          pointerEvents: "none", overflow: "hidden",
          background: "rgba(255,255,255,.15)",
          transition: "border-color .2s, box-shadow .2s",
        }}>
          <div style={{
            width: "100%", height: "100%", borderRadius: "50%",
            background: "radial-gradient(circle, transparent 60%, rgba(26,38,144,.06) 100%)",
          }} />
        </div>
      )}

      {/* Handle line */}
      {!approved && (
        <div style={{
          position: "absolute",
          left: magPos.x + 30, top: magPos.y + 30,
          width: 26, height: 5, borderRadius: 3,
          background: activeZone ? "var(--coral)" : "rgba(26,38,144,.4)",
          transform: "rotate(45deg)",
          pointerEvents: "none",
          transition: "background .2s",
        }} />
      )}

      {/* APPROVED stamp */}
      {approved && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          pointerEvents: "none",
        }}>
          <div style={{
            fontFamily: "'Black Han Sans',cursive", fontSize: 32,
            color: "#16A34A", background: "rgba(255,255,255,.92)",
            padding: "12px 28px", borderRadius: 16,
            border: "3px solid #4ADE80",
            animation: "stamp-slam .4s ease",
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 20px rgba(74,222,128,.3)",
          }}>
            <CheckMark size={32} />
            APPROVED
          </div>
        </div>
      )}

      <style>{`
        @keyframes stamp-slam {
          0% { transform:scale(3); opacity:0; }
          60% { transform:scale(0.95); opacity:1; }
          100% { transform:scale(1); }
        }
      `}</style>
    </div>
  );
}
