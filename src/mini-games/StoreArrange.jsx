import { useState, useRef, useCallback } from "react";
import { playDrag, playDrop, playCashRegister } from "../sound.js";
import DollSVG from "../components/DollSVG.jsx";

export default function StoreArrange({ onComplete, dollCfg }) {
  const [shelves, setShelves] = useState([null, null, null]);
  const [dragging, setDragging] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [hoverSlot, setHoverSlot] = useState(-1);
  const [sold, setSold] = useState(false);
  const startOff = useRef({ x: 0, y: 0 });
  const slotRefs = useRef([]);

  const isPlaced = (idx) => shelves.includes(idx);

  const onDown = useCallback((e, idx) => {
    if (isPlaced(idx) || sold) return;
    e.preventDefault();
    playDrag();
    const rect = e.currentTarget.getBoundingClientRect();
    startOff.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(idx);
    setDragPos({ x: e.clientX - startOff.current.x, y: e.clientY - startOff.current.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [shelves, sold]);

  const onMove = useCallback((e) => {
    if (dragging === null) return;
    e.preventDefault();
    setDragPos({ x: e.clientX - startOff.current.x, y: e.clientY - startOff.current.y });
    let found = -1;
    slotRefs.current.forEach((el, i) => {
      if (!el || shelves[i] !== null) return;
      const r = el.getBoundingClientRect();
      if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) found = i;
    });
    setHoverSlot(found);
  }, [dragging, shelves]);

  const onUp = useCallback(() => {
    if (dragging === null) return;
    if (hoverSlot >= 0 && shelves[hoverSlot] === null) {
      playDrop();
      const next = [...shelves];
      next[hoverSlot] = dragging;
      setShelves(next);
      if (next.every((v) => v !== null)) {
        setTimeout(() => {
          setSold(true);
          playCashRegister();
          setTimeout(onComplete, 1500);
        }, 400);
      }
    }
    setDragging(null);
    setHoverSlot(-1);
  }, [dragging, hoverSlot, shelves, onComplete]);

  const dollColors = [
    { border: "var(--pink)" },
    { border: "var(--mint)" },
    { border: "var(--lavender, #C3B1E1)" },
  ];

  return (
    <div className="mini-game" onPointerMove={onMove} onPointerUp={onUp}
      style={{ minHeight: 340, userSelect: "none" }}>
      <div className="mini-game-instruction">Drag dolls onto the store shelves!</div>

      {/* Floating doll cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 20 }}>
        {[0, 1, 2].map((idx) => (
          <div key={idx}
            onPointerDown={(e) => onDown(e, idx)}
            style={{
              width: 90, padding: 8, borderRadius: 12, textAlign: "center",
              background: "var(--white)",
              border: `2px solid ${dollColors[idx].border}`,
              cursor: isPlaced(idx) ? "default" : "grab",
              opacity: isPlaced(idx) ? 0.3 : (dragging === idx ? 0 : 1),
              touchAction: "none", transition: "opacity .2s",
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            }}>
            <div style={{ transform: "scale(0.4)", transformOrigin: "top center", height: 70, overflow: "hidden" }}>
              <DollSVG cfg={dollCfg} size={60} />
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "var(--navy)", marginTop: -10 }}>Doll #{idx + 1}</div>
          </div>
        ))}
      </div>

      {/* Shelf slots */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 12,
        background: "linear-gradient(180deg, #D4956E 0%, #C4854E 100%)",
        borderRadius: 8, padding: "12px 16px",
        boxShadow: "inset 0 2px 4px rgba(0,0,0,.15)",
      }}>
        {[0, 1, 2].map((i) => (
          <div key={i}
            ref={(el) => (slotRefs.current[i] = el)}
            style={{
              width: 90, height: 90, borderRadius: 8,
              border: `2px dashed ${hoverSlot === i ? "var(--coral)" : "rgba(255,255,255,.4)"}`,
              background: shelves[i] !== null ? "rgba(255,255,255,.2)" : (hoverSlot === i ? "rgba(232,53,74,.15)" : "transparent"),
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s", position: "relative",
            }}>
            {shelves[i] !== null && (
              <div style={{ transform: "scale(0.35)", transformOrigin: "center" }}>
                <DollSVG cfg={dollCfg} size={60} />
              </div>
            )}
            {sold && i === 0 && (
              <div style={{
                position: "absolute", top: -6, right: -6,
                background: "var(--coral)", color: "var(--white)",
                padding: "2px 8px", borderRadius: 6,
                fontFamily: "'Black Han Sans',cursive", fontSize: 11,
                transform: "rotate(12deg)",
                animation: "sgo .28s ease",
              }}>
                SOLD!
              </div>
            )}
          </div>
        ))}
      </div>

      {sold && (
        <div style={{
          textAlign: "center", marginTop: 12,
          fontFamily: "'Black Han Sans',cursive", fontSize: 20,
          color: "var(--coral)", animation: "sup .35s ease",
        }}>
          🎉 Sold!
        </div>
      )}

      {/* Dragging ghost */}
      {dragging !== null && (
        <div style={{
          position: "fixed", left: dragPos.x, top: dragPos.y, zIndex: 100, pointerEvents: "none",
          width: 90, padding: 8, borderRadius: 12, textAlign: "center",
          background: "var(--white)", border: "2px solid var(--coral)",
          boxShadow: "0 8px 24px rgba(0,0,0,.18)", transform: "scale(1.08)",
        }}>
          <div style={{ transform: "scale(0.4)", transformOrigin: "top center", height: 70, overflow: "hidden" }}>
            <DollSVG cfg={dollCfg} size={60} />
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, color: "var(--navy)", marginTop: -10 }}>Doll #{dragging + 1}</div>
        </div>
      )}
    </div>
  );
}
