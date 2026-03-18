import { useState, useEffect, useRef } from "react";
import DollPreview from "../components/DollPreview.jsx";
import OptionGrid from "../components/OptionGrid.jsx";
import { playClick, playSuccess } from "../sound.js";
import { HAIR_STYLES, HAIR_COLORS, SKIN_TONES, OUTFITS, BODY_OPTS, PR } from "../constants.js";

/* ══════════════════════════════════════
   PHASE 1 — DESIGN YOUR DOLL
   Pick name, hair style, hair color, skin tone, outfit, body
   ══════════════════════════════════════ */

/* ── Sparkle particles around the preview ── */
const SPARKLE_COLORS = ["#E8354A", "#1A2690", "#FFD34E", "#4ADE80", "#FF9F0A", "#C084FC", "#FFB5C8", "#A8E6CF"];

function SparkleParticles() {
  return (
    <>
      {SPARKLE_COLORS.map((color, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 72;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const delay = i * 0.12;
        return (
          <div
            key={i}
            className="sparkle"
            style={{
              position: "absolute",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: color,
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              animation: `sparkle-pulse 1.2s ease-in-out ${delay}s infinite`,
              pointerEvents: "none",
            }}
          />
        );
      })}
      <style>{`
        @keyframes sparkle-pulse {
          0%, 100% { transform: scale(0.3); opacity: 0.2; }
          50% { transform: scale(1.3); opacity: 1; }
        }
      `}</style>
    </>
  );
}

/* ── Sparkle burst effect on selection change ── */
function SparkleBurst({ trigger }) {
  const [active, setActive] = useState(false);
  const prevTrigger = useRef(trigger);

  useEffect(() => {
    if (trigger !== prevTrigger.current && trigger) {
      setActive(true);
      const t = setTimeout(() => setActive(false), 350);
      prevTrigger.current = trigger;
      return () => clearTimeout(t);
    }
    prevTrigger.current = trigger;
  }, [trigger]);

  if (!active) return null;

  return (
    <style>{`
      .doll-burst { animation: doll-bounce .3s ease; }
      @keyframes doll-bounce {
        0% { transform: scale(1); }
        40% { transform: scale(1.08); }
        100% { transform: scale(1); }
      }
    `}</style>
  );
}

export default function Phase1Design({ onCostChange, onDone }) {
  const [name, setName] = useState("");
  const [hairStyle, setHairStyle] = useState(null);
  const [hairColor, setHairColor] = useState(null);
  const [skinTone, setSkinTone] = useState(null);
  const [outfit, setOutfit] = useState(null);
  const [body, setBody] = useState(null);
  const [burstKey, setBurstKey] = useState(0);

  const p = PR;

  const baseCost =
    (hairStyle?.cost || 0) +
    (hairColor?.cost || 0) +
    (skinTone?.cost || 0) +
    (outfit?.cost || 0) +
    (body?.cost || 0);

  const cfg = {
    name: name.trim(),
    hairStyle: hairStyle?.id || "",
    hairColor: hairColor?.id || "",
    skinTone: skinTone?.id || "",
    outfit: outfit?.id || "",
    body: body?.id || "",
  };

  const allFilled = name.trim() && hairStyle && hairColor && skinTone && outfit && body;

  useEffect(() => {
    onCostChange(baseCost);
  }, [baseCost]);

  const sparkleSelect = (setter) => (v) => {
    setter(v);
    playClick();
    setBurstKey((k) => k + 1);
  };

  const handleDone = () => {
    playSuccess();
    onDone({ name: name.trim(), hairStyle, hairColor, skinTone, outfit, body, baseCost });
  };

  return (
    <div className="slide">
      <div style={{ textAlign: "center", marginBottom: 6 }}>
        <span className="step-pill">✏️ Step 1 of 4</span>
      </div>
      <h1 className="big-title">Design Your Doll</h1>
      <p className="sub">Every pick changes the look — and the cost to build it</p>

      <div className="p1-layout">
        {/* Sticky preview sidebar */}
        <div className="p1-preview">
          <div
            className="card"
            style={{
              padding: "12px 8px",
              background: "var(--navy-pale)",
              border: "1.5px solid var(--navy)",
              position: "relative",
            }}
          >
            <div
              style={{
                fontFamily: "'Black Han Sans',cursive",
                fontSize: ".8rem",
                color: "var(--navy)",
                textAlign: "center",
                marginBottom: 6,
                letterSpacing: "1px",
              }}
            >
              LIVE PREVIEW
            </div>
            <div style={{ position: "relative" }}>
              <SparkleBurst trigger={burstKey} />
              <div className={burstKey ? "doll-burst" : ""} key={burstKey}>
                <DollPreview cfg={cfg} animated={true} size={130} />
              </div>
              {allFilled && <SparkleParticles />}
            </div>
            {baseCost > 0 && !cfg.name && (
              <div
                style={{
                  marginTop: 4,
                  fontFamily: "'Black Han Sans',cursive",
                  fontSize: ".85rem",
                  color: "var(--coral)",
                  textAlign: "center",
                }}
              >
                ${baseCost.toFixed(2)}
              </div>
            )}
            {!hairStyle && (
              <div style={{ fontSize: ".68rem", color: "var(--mid)", marginTop: 4, textAlign: "center" }}>
                Pick options →<br />to dress {p.obj}!
              </div>
            )}
          </div>
        </div>

        {/* Option cards */}
        <div className="p1-options">
          {/* Name */}
          <div className="card">
            <div className="card-title">🏷️ Give {p.obj} a name</div>
            <div className="fact">💡 Real toy companies test hundreds of names to find the one kids remember!</div>
            <input
              className="ninput"
              placeholder="DOLL NAME…"
              maxLength={12}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Hair Style */}
          <div className="card">
            <div className="card-title">💇 Hair Style</div>
            <div className="fact">💡 Each hairstyle needs different molds and materials — more detail costs more!</div>
            <OptionGrid list={HAIR_STYLES} val={hairStyle} set={sparkleSelect(setHairStyle)} />
          </div>

          {/* Hair Color — compact 4-button row */}
          <div className="card">
            <div className="card-title">🎨 Hair Color</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {HAIR_COLORS.map((c) => (
                <button
                  key={c.id}
                  className={`obtn${hairColor?.id === c.id ? " on" : ""}`}
                  style={{ flex: "1 1 0", minWidth: 60, padding: "8px 4px" }}
                  onClick={() => sparkleSelect(setHairColor)(c)}
                >
                  <span className="oe">{c.emoji}</span>
                  {c.id}
                  <span className="oc">+${c.cost.toFixed(2)}/doll</span>
                </button>
              ))}
            </div>
          </div>

          {/* Skin Tone — compact 3-button row */}
          <div className="card">
            <div className="card-title">🌟 Skin Tone</div>
            <div style={{ display: "flex", gap: 6 }}>
              {SKIN_TONES.map((s) => (
                <button
                  key={s.id}
                  className={`obtn${skinTone?.id === s.id ? " on" : ""}`}
                  style={{ flex: "1 1 0", padding: "8px 4px" }}
                  onClick={() => sparkleSelect(setSkinTone)(s)}
                >
                  <span className="oe">{s.emoji}</span>
                  {s.id}
                  <span style={{ display: "block", fontSize: ".7rem", color: skinTone?.id === s.id ? "rgba(255,255,255,.5)" : "var(--mid)", marginTop: 2 }}>
                    {s.desc}
                  </span>
                  <span className="oc">Free</span>
                </button>
              ))}
            </div>
          </div>

          {/* Outfit */}
          <div className="card">
            <div className="card-title">👗 Outfit</div>
            <div className="fact">💡 More sequins and layers = more fabric and more sewing time!</div>
            <OptionGrid list={OUTFITS} val={outfit} set={sparkleSelect(setOutfit)} />
          </div>

          {/* Body Material */}
          <div className="card">
            <div className="card-title">🧸 Body Material</div>
            <div className="fact">💡 Soft vinyl and plush feel better — but can also break or tear more easily!</div>
            <OptionGrid list={BODY_OPTS} val={body} set={sparkleSelect(setBody)} three={true} />
          </div>
        </div>
      </div>

      <button
        className={`gbtn${allFilled ? " pulse" : ""}`}
        disabled={!allFilled}
        onClick={handleDone}
      >
        Send {name.trim() || "Your Doll"} to the Factory →
      </button>
    </div>
  );
}
