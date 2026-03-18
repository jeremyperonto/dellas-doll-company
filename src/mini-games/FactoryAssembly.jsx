import { useState, useCallback } from "react";
import { playClick, playError, playSuccess } from "../sound.js";
import DollSVG from "../components/DollSVG.jsx";

const PARTS = ["Body", "Head", "Arms", "Legs", "Hair + Outfit"];
const PART_EMOJI = ["🧱", "🗣️", "💪", "🦵", "✨"];

export default function FactoryAssembly({ onComplete, dollCfg }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [shakeIdx, setShakeIdx] = useState(-1);
  const [flyIdx, setFlyIdx] = useState(-1);

  const handleTap = useCallback((idx) => {
    if (done) return;
    if (idx === step) {
      playClick();
      setFlyIdx(idx);
      setTimeout(() => {
        setFlyIdx(-1);
        const next = step + 1;
        setStep(next);
        if (next >= PARTS.length) {
          setDone(true);
          playSuccess();
          setTimeout(onComplete, 1000);
        }
      }, 400);
    } else {
      playError();
      setShakeIdx(idx);
      setTimeout(() => setShakeIdx(-1), 500);
    }
  }, [step, done, onComplete]);

  const dollOpacity = done ? 1 : Math.max(0.12, step * 0.2);

  return (
    <div className="mini-game" style={{ minHeight: 320 }}>
      <div className="mini-game-instruction">Tap parts in order to build your doll!</div>

      {/* Part buttons — clean centered row */}
      <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "center",
        gap: 8, marginBottom: 16,
      }}>
        {PARTS.map((part, idx) => {
          const completed = idx < step;
          const isCurrent = idx === step && !done;
          const isShaking = shakeIdx === idx;
          const isFlying = flyIdx === idx;

          return (
            <button key={part}
              onPointerDown={() => handleTap(idx)}
              disabled={completed || isFlying}
              style={{
                padding: "8px 16px", borderRadius: 20,
                border: `2px solid ${isCurrent ? "var(--coral)" : completed ? "var(--mint)" : "var(--border)"}`,
                background: completed ? "var(--mint)" : isCurrent ? "var(--coral-pale)" : "var(--white)",
                fontFamily: "'Black Han Sans',cursive", fontSize: 13,
                color: completed ? "#fff" : "var(--navy)",
                cursor: completed ? "default" : "pointer",
                opacity: isFlying ? 0 : 1,
                boxShadow: isCurrent ? "0 0 12px rgba(232,53,74,.25)" : "0 2px 6px rgba(0,0,0,.06)",
                animation: isShaking ? "shake .4s ease" : isCurrent ? "gentle-pulse 1.5s ease-in-out infinite" : "none",
                transition: "opacity .3s, background .2s, border-color .2s",
                display: "flex", alignItems: "center", gap: 5,
              }}>
              <span style={{ fontSize: 16 }}>{completed ? "✓" : PART_EMOJI[idx]}</span>
              {part}
            </button>
          );
        })}
      </div>

      {/* Ghost doll in center */}
      <div style={{
        display: "flex", justifyContent: "center", alignItems: "center",
        opacity: dollOpacity, transition: "opacity .5s",
        transform: done ? "scale(1.08)" : "scale(1)",
        transitionProperty: "opacity, transform",
        filter: done ? "none" : "grayscale(0.3)",
      }}>
        <DollSVG cfg={dollCfg} size={130} />
      </div>

      {done && (
        <div style={{
          textAlign: "center", fontFamily: "'Black Han Sans',cursive",
          fontSize: 20, color: "var(--coral)", marginTop: 12,
          animation: "sup .35s ease",
        }}>
          Doll assembled!
        </div>
      )}

      <style>{`
        @keyframes shake {
          0%,100% { transform:translateX(0) }
          20% { transform:translateX(-6px) }
          40% { transform:translateX(6px) }
          60% { transform:translateX(-4px) }
          80% { transform:translateX(4px) }
        }
        @keyframes gentle-pulse {
          0%,100% { transform:scale(1); }
          50% { transform:scale(1.05); }
        }
      `}</style>
    </div>
  );
}
