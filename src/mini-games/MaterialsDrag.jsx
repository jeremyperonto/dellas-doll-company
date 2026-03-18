import { useState, useRef, useCallback } from "react";
import { playDrag, playDrop, playConveyor, playSuccess } from "../sound.js";

const ITEMS = [
  { id: 0, emoji: "🛢️", label: "Plastic" },
  { id: 1, emoji: "🧶", label: "Hair fiber" },
  { id: 2, emoji: "🎨", label: "Dye" },
  { id: 3, emoji: "🪡", label: "Fabric" },
];

export default function MaterialsDrag({ onComplete }) {
  const [placed, setPlaced] = useState([null, null, null, null]);
  const [dragging, setDragging] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [hoverSlot, setHoverSlot] = useState(-1);
  const [beltMoving, setBeltMoving] = useState(false);
  const containerRef = useRef(null);
  const slotRefs = useRef([]);
  const startOff = useRef({ x: 0, y: 0 });

  const isPlaced = (id) => placed.includes(id);

  const onDown = useCallback((e, item) => {
    if (isPlaced(item.id) || beltMoving) return;
    e.preventDefault();
    playDrag();
    const rect = e.currentTarget.getBoundingClientRect();
    startOff.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(item);
    setDragPos({ x: e.clientX - startOff.current.x, y: e.clientY - startOff.current.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [placed, beltMoving]);

  const onMove = useCallback((e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.clientX - startOff.current.x;
    const y = e.clientY - startOff.current.y;
    setDragPos({ x, y });
    let found = -1;
    slotRefs.current.forEach((el, i) => {
      if (!el || placed[i] !== null) return;
      const r = el.getBoundingClientRect();
      if (e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom) found = i;
    });
    setHoverSlot(found);
  }, [dragging, placed]);

  const onUp = useCallback(() => {
    if (!dragging) return;
    if (hoverSlot >= 0 && placed[hoverSlot] === null) {
      playDrop();
      const next = [...placed];
      next[hoverSlot] = dragging.id;
      setPlaced(next);
      if (next.every((v) => v !== null)) {
        setBeltMoving(true);
        playConveyor();
        setTimeout(() => { playSuccess(); onComplete(); }, 1500);
      }
    }
    setDragging(null);
    setHoverSlot(-1);
  }, [dragging, hoverSlot, placed, onComplete]);

  const getItem = (id) => ITEMS.find((i) => i.id === id);

  return (
    <div className="mini-game" ref={containerRef} onPointerMove={onMove} onPointerUp={onUp}
      style={{ userSelect: "none" }}>
      <div className="mini-game-instruction">Drag each material onto the conveyor belt!</div>

      {/* Floating material cards */}
      <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {ITEMS.map((item) => (
          <div key={item.id}
            onPointerDown={(e) => onDown(e, item)}
            style={{
              width: 80, padding: "10px 6px", borderRadius: 12, textAlign: "center",
              background: isPlaced(item.id) ? "var(--border)" : "var(--white)",
              border: "2px solid var(--border)", cursor: isPlaced(item.id) ? "default" : "grab",
              opacity: isPlaced(item.id) ? 0.4 : (dragging?.id === item.id ? 0 : 1),
              touchAction: "none", transition: "opacity .2s",
              boxShadow: "0 2px 8px rgba(0,0,0,.08)",
            }}>
            <div style={{ fontSize: 28 }}>{item.emoji}</div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "var(--navy)", marginTop: 4 }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Conveyor belt */}
      <div style={{
        background: "#3a3a4a", borderRadius: 10, padding: "12px 8px", position: "relative",
        display: "flex", gap: 8, justifyContent: "center",
        boxShadow: "inset 0 2px 6px rgba(0,0,0,.3)",
      }}>
        {/* Belt lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={`line${i}`} style={{
            position: "absolute", top: 0, bottom: 0, left: `${12 + i * 18}%`,
            width: 2, background: "rgba(255,255,255,.08)",
          }} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <div key={i} ref={(el) => (slotRefs.current[i] = el)}
            style={{
              width: 80, height: 64, borderRadius: 8,
              border: `2px dashed ${hoverSlot === i ? "var(--coral)" : "rgba(255,255,255,.25)"}`,
              background: placed[i] !== null ? "rgba(255,255,255,.15)" : (hoverSlot === i ? "rgba(232,53,74,.15)" : "transparent"),
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .2s",
              transform: beltMoving ? "translateX(120px)" : "none",
              opacity: beltMoving ? 0 : 1,
              transitionDuration: beltMoving ? "1.2s" : ".2s",
            }}>
            {placed[i] !== null && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 22 }}>{getItem(placed[i]).emoji}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,.7)" }}>{getItem(placed[i]).label}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dragging ghost */}
      {dragging && (
        <div style={{
          position: "fixed", left: dragPos.x, top: dragPos.y, zIndex: 100, pointerEvents: "none",
          width: 80, padding: "10px 6px", borderRadius: 12, textAlign: "center",
          background: "var(--white)", border: "2px solid var(--coral)",
          boxShadow: "0 8px 24px rgba(0,0,0,.18)", transform: "scale(1.1)",
        }}>
          <div style={{ fontSize: 28 }}>{dragging.emoji}</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: "var(--navy)", marginTop: 4 }}>{dragging.label}</div>
        </div>
      )}
    </div>
  );
}
