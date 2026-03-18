import { useState, useRef, useCallback } from "react";
import { playDrag, playDrop, playBoxClose } from "../sound.js";
import DollSVG from "../components/DollSVG.jsx";

export default function PackagingWrap({ onComplete, dollCfg, boxType }) {
  const [phase, setPhase] = useState("drag"); // drag | closing | label | done
  const [dragging, setDragging] = useState(false);
  const [dollPos, setDollPos] = useState(null);
  const [hoverBox, setHoverBox] = useState(false);
  const startOff = useRef({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const boxColors = {
    "Plain Box": { bg: "#DDD5C8", lid: "#C4BAA8" },
    "Holo Box": { bg: "linear-gradient(135deg, #C3B1E1, #FFB5C8, #A8E6CF)", lid: "#D4C4F0" },
    "Window Box": { bg: "#FFEEDD", lid: "#E8D8C4" },
  };
  const colors = boxColors[boxType] || boxColors["Plain Box"];

  const onDown = useCallback((e) => {
    if (phase !== "drag") return;
    e.preventDefault();
    playDrag();
    const rect = e.currentTarget.getBoundingClientRect();
    setDollPos({ x: rect.left, y: rect.top });
    startOff.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [phase]);

  const onMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.clientX - startOff.current.x;
    const y = e.clientY - startOff.current.y;
    setDollPos({ x, y });

    if (boxRef.current) {
      const br = boxRef.current.getBoundingClientRect();
      const inside = e.clientX > br.left && e.clientX < br.right && e.clientY > br.top && e.clientY < br.bottom;
      setHoverBox(inside);
    }
  }, [dragging]);

  const onUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (hoverBox) {
      playDrop();
      setPhase("closing");
      setTimeout(() => {
        playBoxClose();
        setPhase("label");
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 800);
        }, 1000);
      }, 600);
    } else {
      setDollPos(null);
    }
    setHoverBox(false);
  }, [dragging, hoverBox, onComplete]);

  return (
    <div className="mini-game" onPointerMove={onMove} onPointerUp={onUp}
      style={{ minHeight: 300, userSelect: "none" }}>
      <div className="mini-game-instruction">Drag your doll into the {boxType || "box"}!</div>

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", minHeight: 220, position: "relative" }}>
        {/* Doll (draggable) */}
        {phase === "drag" && (
          <div
            onPointerDown={onDown}
            style={{
              position: dollPos ? "fixed" : "relative",
              left: dollPos ? dollPos.x : undefined,
              top: dollPos ? dollPos.y : undefined,
              zIndex: dragging ? 100 : 1,
              cursor: dragging ? "grabbing" : "grab",
              touchAction: "none",
              transform: dragging ? "scale(1.08)" : "scale(1)",
              transition: dragging ? "none" : "transform .15s",
            }}>
            <DollSVG cfg={dollCfg} size={100} />
          </div>
        )}

        {/* Box */}
        <div ref={boxRef} style={{ position: "relative", width: 140, height: 160 }}>
          {/* Box body */}
          <div style={{
            width: 140, height: 120, borderRadius: "0 0 8px 8px",
            background: colors.bg, border: "2px solid rgba(0,0,0,.15)",
            marginTop: 40, position: "relative",
            boxShadow: hoverBox ? "0 0 16px rgba(232,53,74,.3)" : "0 2px 8px rgba(0,0,0,.1)",
            transition: "box-shadow .2s",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {boxType === "Window Box" && (
              <div style={{
                width: 60, height: 70, borderRadius: 8,
                border: "2px solid rgba(0,0,0,.1)", background: "rgba(255,255,255,.6)",
              }} />
            )}
            {(phase === "closing" || phase === "label" || phase === "done") && (
              <div style={{ transform: "scale(0.5)", opacity: 0.8 }}>
                <DollSVG cfg={dollCfg} size={80} />
              </div>
            )}
          </div>

          {/* Box lid */}
          <div style={{
            position: "absolute", top: phase === "drag" ? 0 : 38, left: -2,
            width: 144, height: 24, borderRadius: "8px 8px 0 0",
            background: colors.lid, border: "2px solid rgba(0,0,0,.15)",
            transformOrigin: "bottom center",
            transform: phase === "drag" ? "rotateX(80deg)" : "rotateX(0deg)",
            transition: "transform .6s ease, top .6s ease",
          }} />

          {/* Shipping label */}
          {(phase === "label" || phase === "done") && (
            <div style={{
              position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
              background: "var(--white)", border: "1.5px solid var(--border)",
              borderRadius: 6, padding: "4px 10px", fontSize: 11,
              fontFamily: "'Black Han Sans',cursive", color: "var(--navy)",
              whiteSpace: "nowrap", animation: "sup .35s ease",
              boxShadow: "0 2px 6px rgba(0,0,0,.1)",
            }}>
              {"📦 Factory → 🇺🇸 USA"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
